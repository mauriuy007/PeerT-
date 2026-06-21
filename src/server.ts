import 'dotenv/config';
import express from 'express';
import { authenticate } from './middlewares/authMiddleware';
import authRoutes from './routes/authRoutes';
import bookingRoutes from './routes/bookingRoutes';
import destinationRoutes from './routes/destinationRoutes';
import expenseRoutes from './routes/expenseRoutes';
import itineraryRoutes from './routes/itineraryRoutes';
import tripRoutes from './routes/tripRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(authenticate);

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/destinations', destinationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
