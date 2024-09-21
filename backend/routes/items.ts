import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/Item';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res, next) => {
  try {
    const categoryFilter = req.query.category as string;

    if(!categoryFilter) {
      const item = await Item.find();
      return res.send(item);
    }

    const commodities = await Item.find({category: categoryFilter});

    return res.send(commodities);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.get('/:id', async (req, res, next) => {
  try {
    const post = await Item.findById(req.params.id).populate('user', 'username phone displayName');

    if (!post) {
      return res.sendStatus(404);
    }

    return res.send(post);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    try {
      const item = new Item({
        category: req.body.category,
        title: req.body.title,
        price: parseFloat(req.body.price),
        description: req.body.description,
        image: req.file ? req.file.filename : null,
        user: req.user?._id,
      });

      await item.save();
      res.send(item);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

export default itemsRouter;
