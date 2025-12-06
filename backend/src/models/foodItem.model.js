import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    foodId: {
        type: String,
        required: true,
        unique: true
    },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodPartner',
    },
});

const foodItemModel = mongoose.model('foodItem', foodItemSchema);

export default foodItemModel;
