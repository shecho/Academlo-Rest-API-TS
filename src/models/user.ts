import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: [{
        name: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: false
        },
        imgURL: {
            type: String,
            required: false
        }
    }],
});

export default mongoose.model('users', userSchema);