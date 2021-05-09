import { model, Schema } from 'mongoose';

const UserSchema = new Schema({

    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const User = model('user', UserSchema)

export default User
