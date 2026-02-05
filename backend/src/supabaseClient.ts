import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Debug: Print all available env keys (not values!)
console.log('Available environment variables:', Object.keys(process.env));

const supabaseUrl = process.env['SUPABASE_URL'];
const supabaseKey = process.env['SUPABASE_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('CRITICAL: Supabase variables are missing from process.env');
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseKey || ''
);
