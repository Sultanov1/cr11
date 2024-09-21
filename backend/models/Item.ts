import { Schema, model, Types } from 'mongoose';
import Category from './Category';
import User from './User';

const ItemSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
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
      validator: async (value: number) => {
        if (value < 0) {
          return false;
        }
      },
      message: 'The price can not be below zero!',
    },
  },
  description: String,
  image: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
});

const Item = model('Product', ItemSchema);

export default Item;
