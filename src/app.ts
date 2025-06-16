import express, { Request, Response } from "express";
import productsRoutes from './products/products.routes';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8800;

app.get('/', (req:Request, res: Response) => {
    res.send('GCU MarketPlace is running')
});

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (process.env.NODE_ENV == 'development'){
    // add logger middleware
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode');
}

app.get('/', (req:Request, res: Response) => {
    res.send('<h1>Welcome to the GCU MarketPlace</h1>')
});

app.use('/', [productsRoutes]);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost: ${port}`)
});