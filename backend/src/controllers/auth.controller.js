import userModel from '../models/user.model.js';
import foodPartnersModel from '../models/foodPartner.model.js';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000,
};

//User
async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await userModel.findOne({ email }).lean();
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await userModel.create({
      fullName,
      email,
      password: passwordHash,
    });

    if (!user) {
      return res.status(500).json({
        message: 'Failed to register user',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie('token', token, cookieOptions);

    return res.status(201).json({
      message: 'User registered',
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: sanitizedUser,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function logoutUser(_, res) {
  try {
    res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'User Logout Successfully!',
    });
  } catch (error) {
    return res.json({
      message: 'Internal server error',
    });
  }
}

//food partners
async function registerFoodPartner(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await foodPartnersModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const foodPartner = await foodPartnersModel.create({
      name,
      email,
      password: hashPassword,
    });

    if (!foodPartner) {
      return res.status(400).json({
        message: 'user faild to create',
      });
    }

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

    res.cookie('token', token, cookieOptions);

    return res.json({ message: 'Food partner registered' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Required all fields',
      });
    }

    const foodPartner = await foodPartnersModel
      .findOne({ email })
      .select('+password');

    if (!foodPartner) {
      return res.status(400).json({
        message: 'Invalid Credential',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      foodPartner.password,
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid Credential',
      });
    }

    const sanitizedUser = foodPartner.toObject();
    delete sanitizedUser.password;

    const token = jwt.sign(
      {
        id: foodPartner._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: 'user login successfully',
      foodPartner: sanitizedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

async function logoutFoodPartner(req, res) {
  try {
    res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'FoodMan Logout Successfully!',
    });
  } catch (error) {
    return res.json({
      message: 'Internal server error',
    });
  }
}


async function getFoodPartnerByID(req, res) {
  try {
    const { id } = req.params;

    const partner = await foodPartnersModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "fooditems",
          localField: "_id",
          foreignField: "foodPartner",
          as: "foodItems"
        }
      },
      { $project: { password: 0 } }
    ]);


    res.json({
      message: "Profile fetched",
      partner
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}


export {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  getFoodPartnerByID
};
