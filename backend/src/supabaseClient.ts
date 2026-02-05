import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env['SUPABASE_URL'];
const supabaseKey = process.env['SUPABASE_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables!');
    console.error('SUPABASE_URL:', supabaseUrl ? 'Found' : 'Missing');
    console.error('SUPABASE_KEY:', supabaseKey ? 'Found' : 'Missing');
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseKey || ''
);
