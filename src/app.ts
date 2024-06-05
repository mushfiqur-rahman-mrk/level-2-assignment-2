import express, { Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/student/product.route';
import { OrderRoutes } from './app/modules/orders/order.route';

const app = express()
const port = 3000

app.use(express.json());
app.use(cors())
app.use('/api/products', ProductRoutes);
app.use('/api', OrderRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app;