import express from 'express';
import { apiRouter } from '../server/api.ts';

const app = express();

app.use(express.json({ limit: '10mb' }));

// Mount API routes to handle both direct and rewritten requests seamlessly
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
