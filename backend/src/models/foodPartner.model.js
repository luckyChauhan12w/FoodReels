import mongoose from 'mongoose';

const foodPartnersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

const foodPartnersModel = mongoose.model('foodPartner', foodPartnersSchema);

export default foodPartnersModel;
