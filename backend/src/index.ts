import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// ⚡ middleware CORS
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        const allowedOrigins = [
            'http://localhost:4200',
            'https://daniieldvir.github.io'
        ];
        console.log('Incoming origin:', origin);
        // Allow if no origin (like mobile apps/curl) or if it starts with one of our allowed domains
        if (!origin || allowedOrigins.some(domain => origin.startsWith(domain))) {
            callback(null, true);
        } else {
            console.error('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// ⚡ חשוב: להתמודד עם כל OPTIONS preflight
app.options(/.*/, cors(corsOptions));

// JSON body parser
app.use(express.json());

// Health check / Keep-alive route
app.get('/health', async (req, res) => {
    try {
        const { supabase } = await import('./supabaseClient');
        const { data, error } = await supabase.from('tasks').select('id').limit(1);
        if (error) throw error;
        res.json({ status: 'ok', message: 'Supabase is active', timestamp: new Date() });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
