import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        lowercase: true
    },
    price: {
        type: Number,
        lowercase: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean
    }
}, {timestamps: true}
);

export default mongoose.model('Products', productSchema);