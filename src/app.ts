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

// Server Maintainer Wake-up & Health Check Routes
app.get(['/startserver', '/startServer', '/checkserver', '/checkServer'], (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({
      status: 'online',
      server: 'LinkNest API',
      message: 'Hey Developer! LinkNest Server is working fine, Go ahead!',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  }
  res.send('<h1>Hey Developer! LinkNest Server is working fine, Go aHead!</h1>');
});

// Global Error Handler (Placeholder)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
