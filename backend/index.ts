import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routes/users';
import categoriesRouter from './routes/category';
import itemsRouter from './routes/items';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/users', usersRouter)
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  })
};

run().catch(console.error);

