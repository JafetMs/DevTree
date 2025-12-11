import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import { router } from './router';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

connectDB();
export const app = express();

// CORS
app.use(cors(corsConfig))
app.use(express.json()); 

// Routing
app.use('/', router); 