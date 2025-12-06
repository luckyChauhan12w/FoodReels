import mongoose from 'mongoose';

const connectDB = () => {
  return mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('DataBase is connected Successfully!');
    })
    .catch((err) => {
      console.log(`DataBase is not able to connect: ${err}`);
      throw err;
    });
};

export default connectDB;
