import express, {Express, Request, Response, NextFunction, urlencoded} from 'express';
import cors from 'cors';
import quizRoutes from './routes/quizRoutes';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to infinite-scroll backend');
  });

app.use('/quiz', quizRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

export default app;