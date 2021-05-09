import { PubSub } from 'apollo-server'
const { EVENTS } = require('../subscriptions')
const pubsub = new PubSub()

export default {
    Query: {
        getAllEmployee: async (_, __, { Employee }) => {
            let result = await Employee.find({})
            return result
        },
        getEmployee: async (_, { id }, { Employee}) => {
            let result = await Employee.find({ "company": id })
            return result
        }
    },
    Mutation: {
        createNewEmployee: async (_, { newPost }, { Employee }) => {
            let result = await Employee.create(newPost)
            pubsub.publish(EVENTS.USER.EMPLOYEE_CREATED, {
                employeeChange: { keyType: 'EMPLOYEE_CREATED', data: result }
            })
            return result
        },
        deleteEmployee: async (_, { id }, { Employee }) => {
            let deleteEmployee = await Employee.findByIdAndDelete(id)
            pubsub.publish(EVENTS.USER.EMPLOYEE_DELETED, {
                employeeChange: { keyType: 'EMPLOYEE_DELETED', data: deleteEmployee }
            })
            return {
                success: true,
                id: deleteEmployee.id,
                message: 'Your post is deleted!.'
            }
        }
    },

    Subscription: {
        employeeChange: {
            subscribe: () => pubsub.asyncIterator([EVENTS.USER.EMPLOYEE_CREATED, EVENTS.USER.EMPLOYEE_DELETED]),
        },
    },
}