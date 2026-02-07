import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

import routes from './routes';

// Routes
app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: env.NODE_ENV });
});

// Global Error Handler (Placeholder)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
