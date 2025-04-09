import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './modules/Bicycle/Bicycle.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { UserRoutes } from './modules/User/user.route';
import { OrderRoutes } from './modules/Order/order.route';
import { AuthRoute } from './modules/Auth/auth.route';
const app: Application = express();
app.use(express.json());
app.use(cors({ origin: 'https://cycle-mart-chi.vercel.app', credentials: true }));

app.use('/api/auth', AuthRoute);
app.use('/api/bicycles', BicycleRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/users', UserRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Hello from Cycle Mart!');
};

app.get('/', getController);
app.use(globalErrorHandler);
app.use(notFound);
export default app;
