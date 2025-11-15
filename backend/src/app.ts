import cookieParser from 'cookie-parser';
import express from 'express';
import routes from './routes/index.js';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.listen(process.env.port ?? 3000, () => {
  console.log('Server is running on port 3000');
});
