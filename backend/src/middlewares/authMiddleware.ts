import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../supabaseClient';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // 1. Try to verify with local JWT secret (for traditional login)
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; email: string };
            req.user = decoded;
            return next();
        } catch (localJwtError) {
            // Local JWT verification failed, continue to check Supabase
        }

        // 2. Try to verify with Supabase (for OAuth login or Supabase sessions)
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = {
            id: user.id,
            email: user.email || ''
        };
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ message: 'Authentication failed' });
    }
};