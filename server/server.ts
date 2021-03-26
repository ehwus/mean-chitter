import express from 'express';

const app = express();
const port = process.env.SERVER_PORT || 4201;

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ hello: 'world' });
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
