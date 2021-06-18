import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    birthday: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    roles: {
      type: String,
      require: true,
      default: 'admin',
    },
    avatar: {
      type: String,
      default:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    isActive: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('Users', schema);

export default UserModel;
