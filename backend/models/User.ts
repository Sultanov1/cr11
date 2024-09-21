import mongoose, { HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { UserFields, UserMethods, UserModel } from '../types';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema<UserFields, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: any, username: string): Promise<boolean> {
        if (!this.isModified('username')) return true;
        const user = await mongoose.models.User.findOne({ username });
        return !user;
      },
      message: 'This username is already taken!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
});

userSchema.methods.checkPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFields, UserModel>('User', userSchema);
export default User;
