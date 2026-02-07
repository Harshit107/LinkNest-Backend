import app from './app';
import { env } from './config/env';
import { connectDB } from './db';

const PORT = env.PORT;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${env.NODE_ENV} mode`);
  });
};

start();
