import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import sectorRoutes from './routes/sectorRoutes.js';

const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.json({ message: 'API Burger2Nuit OK' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sectors', sectorRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Burger2Nuit API running on http://localhost:${port}`));
