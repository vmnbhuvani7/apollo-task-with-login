import { PubSub } from 'apollo-server'
const { EVENTS } = require('../subscriptions')
const pubsub = new PubSub()

export default {
    Query: {
        getAllCompany: async (_, __, { Company }) => {
            let result = await Company.find({})
            return result
        },
        getCompanyById: async (_, __, { Company, me }) => {
            let result = await Company.find({ owner: me._id })
            return result
        },
        getSelectedCompany: async (_, { id }, { Company, me }) => {
            let result = await Company.findById(id)
            return result
        }
    },
    Mutation: {
        createNewCompany: async (_, { newPost }, { Company, me }) => {
            newPost.owner = me._id
            let result = await Company.create(newPost)
            pubsub.publish(EVENTS.USER.COMPANY_CREATED, {
                companyChange: { keyType: 'COMPANY_CREATED', data: result }
            })
            return result
        },
    },
    Subscription: {
        companyChange: {
            subscribe: () => pubsub.asyncIterator(EVENTS.USER.COMPANY_CREATED),
        },
    },
}