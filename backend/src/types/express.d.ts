import { Request } from "express";

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            id: string; // UUID string from Supabase Auth
            username?: string;
            email?: string;
        };
    }
}
