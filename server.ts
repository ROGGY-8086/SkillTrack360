import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { apiRouter } from './src/server/api';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', apiRouter);

// Serve static frontend in production
app.use(express.static(path.resolve(__dirname, 'dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Gusto Server running on port ${port}`);
});
