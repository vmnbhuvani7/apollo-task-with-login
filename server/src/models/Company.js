import { model, Schema } from 'mongoose';

const CompanySchema = new Schema({

    companyName: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const Company = model('company', CompanySchema)

export default Company