import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// ⚡ middleware CORS
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        const allowedOrigins = ['http://localhost:4200'];
        console.log('Incoming origin:', origin);
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
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

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
