import { model, Schema } from 'mongoose';

const EmployeeSchema = new Schema({

    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    post: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    company: {
        type: Schema.Types.ObjectId,
        require: true
    }
}, {
    timestamps: true
})

const Employee = model('employee', EmployeeSchema)

export default Employee