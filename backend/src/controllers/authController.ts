import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient";


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Use Supabase Auth to sign in
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError || !authData.user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Create JWT so frontend can authenticate subsequent requests
        // Use auth.users.id (uuid) instead of public.users.id (bigint)
        const token = jwt.sign(
            { id: authData.user.id, email: authData.user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        res.json({
            user: { id: authData.user.id, email: authData.user.email },
            token
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Logout error:', error);
            return res.status(500).json({ message: "Failed to logout from Supabase" });
        }
        res.json({ message: "Logged out successfully" });
    } catch (error: any) {
        console.error('Unexpected logout error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};
