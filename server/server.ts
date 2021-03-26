import express from 'express';
import { connectDB } from './config/db';

const app = express();
const port = process.env.SERVER_PORT || 4201;

app.use(express.json());
connectDB();

app.get('/', (req, res) => {
  res.send({ hello: 'world' });
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
