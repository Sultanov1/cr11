
import express from 'express';
import Category from '../models/Category';
import mongoose, { mongo } from 'mongoose';
import Item from '../models/Item';

const categoriesRouter = express.Router();

categoriesRouter.post('/', async (req, res, next) => {
  try {
    const categoryData = {
      title: req.body.title,
      description: req.body.description,
    };

    const category = new Category(categoryData);

    await category.save();
    return res.send(category);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    if (e instanceof mongo.MongoServerError && e.code === 11000) {
      return res.status(422).send({ message: 'Title should be unique' });
    }

    return next(e);
  }
});

categoriesRouter.get('/', async (_req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.get('/:categoryId', async (req, res, next) => {
  try {
    const categories = await Item.find({
      category: req.params.categoryId,
    }).populate('owner', 'nickname, phone');
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

export default categoriesRouter;
