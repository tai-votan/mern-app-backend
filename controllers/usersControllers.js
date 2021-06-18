import get from 'lodash/get.js';
import UserModel from '../models/userModel.js';
import { generateToken, verifyToken } from '../services/TokenAuth.js';

export const getCurrentUser = async (req, res) => {
  try {
    const token = (req.headers['authorization'] || '').split(' ')[1];
    const {
      avatar,
      _id,
      userName,
      phone,
      gender,
      email,
      firstName,
      lastName,
      birthday,
    } = await verifyToken(token);

    res.status(200).json({
      data: {
        avatar,
        _id,
        userName,
        phone,
        gender,
        email,
        firstName,
        lastName,
        birthday,
      },
      status: 200,
      message: 'Success',
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    // const createUser = new UserModel({
    //     userName: "tai.votan",
    //     email: "tai@admin.com",
    //     firstName: "Tài",
    //     lastName: "Võ Tấn",
    //     birthday: "2021-06-09T21:43:10+07:00",
    //     gender: "0",
    //     phone: "0000000000",
    //     password: "admin",
    //     roles: "admin",
    //     avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    //     isActive: true,
    // });
    // createUser.save();
    // const user = await UserModel.find();
    // res.status(200).json({ user });
  } catch (err) {
    console.log('err', err);
  }
};

export const deleteUser = (req, res) => {
  res.send({ SUCCESS: true });
};

export const userLogin = async (req, res) => {
  try {
    const {
      body: { userName, password },
    } = req;

    const user = await UserModel.find({ userName });
    const userDB = get(user, '[0].userName');
    const pwdDB = get(user, '[0].password');

    if (userDB === userName && pwdDB === password) {
      const userPlainObject = JSON.parse(JSON.stringify(user[0]));
      const accessToken = generateToken(userPlainObject);

      res.json({
        message: 'Success',
        data: {
          accessToken,
          roles: user[0].roles,
        },
        status: 200,
      });
    }

    res.status(400).json({
      status: 400,
      message: 'ERROR',
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err,
    });
  }
};
