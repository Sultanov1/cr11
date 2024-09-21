import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import Item from './models/Item';
import User from './models/User';
import crypto from 'crypto';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  const collections = ['categories', 'items', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [game, tv, room] = await Category.create(
    {
      title: 'Cars',
      description: 'BMW',
    },
    {
      title: 'Equipments',
      description: 'Gadgets',
    },
    {
      title: 'Hardware',
      description: 'Tape',
    },
  );

  const [user1, user2] = await User.create(
    {
      username: 'Vasya',
      password: '12345',
      nickname: 'Vasya',
      phone: '+996 705 334 433',
      token: crypto.randomUUID(),
    },
    {
      username: 'Alexander',
      password: '76543',
      nickname: 'Alex',
      phone: '+996 555 433 344',
      token: crypto.randomUUID(),
    },
  );

  await Item.create({
    title: 'Iphone16',
    image: 'fixtures/iphone16.jpeg',
    description: 'new model',
    category: game,
    owner: user2,
    price: 100000,
  });

  await Item.create({
    title: 'Iphone15',
    image: 'fixtures/iphone16.jpeg',
    description: 'last model',
    category: game,
    owner: user1,
    price: 85000,
  });
  await Item.create({
    title: 'Smart TV',
    image: 'fixtures/iphone16.jpeg',
    description: 'new version of TV',
    category: tv,
    owner: user2,
    price: 130000,
  });
  await Item.create({
    title: 'Desktop',
    image: 'fixtures/iphone16.jpeg',
    description: 'Ultra book',
    category: game,
    owner: user1,
    price: 60000,
  });
  await Item.create({
    title: 'sofa',
    image: 'fixtures/iphone16.jpeg',
    description: 'desc of sofa',
    category: room,
    owner: user2,
    price: 150000,
  });
  await Item.create({
    title: 'Xbox',
    image: 'fixtures/iphone16.jpeg',
    description: 'Xbox prototype version',
    category: game,
    owner: user2,
    price: 80000,
  });
  await Item.create({
    title: 'Tv samsung',
    image: 'fixtures/iphone16.jpeg',
    description: 'New model of this brand samsung!',
    category: tv,
    owner: user1,
    price: 120000,
  });

  await db.close();
};

void run();