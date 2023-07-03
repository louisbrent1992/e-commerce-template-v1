import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;

const { JWT_SECRET } = process.env;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zip_code: { type: Number, default: 0 }
  },
  payment_info: {
    card_number: { type: String, default: '' }
  },
  isAdmin: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err: any) {
    return next(err);
  }
});

// Add a method to the user model to generate a JWT token
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET);
  return token;
};

export default mongoose.model('User', UserSchema);
