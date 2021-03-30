import { connectDB } from './config/db';
import { server } from './server';

const port = process.env.SERVER_PORT || 4201;
connectDB();

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
