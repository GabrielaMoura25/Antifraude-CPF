import express from 'express';
import { ErrorHandler } from '../infrastructure/middlewares/Error';
import router from '../infrastructure/routes/UserRoutes';

const app = express();

app.use(express.json());
app.use('/', router);
app.use(ErrorHandler.execute);

export default app;

