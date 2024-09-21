import { Schema, model, Types } from 'mongoose';
import Category from './Category';
import User from './User';

const ItemSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId): Promise<boolean> => {
        const category = await Category.findById(value);
        return Boolean(category);
      },
      message: 'Category does not exist!',
    },
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value: number): boolean => {
        return value >= 0;
      },
      message: 'The price can not be below zero!',
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId): Promise<boolean> => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
});

const Item = model('Item', ItemSchema);

export default Item;
