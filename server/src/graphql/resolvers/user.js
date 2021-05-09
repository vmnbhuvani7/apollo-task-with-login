import { ApolloError, UserInputError } from "apollo-server-errors"
import { hash, compare } from "bcryptjs"
import { issueToken, serializeUser } from '../../functions/userFunction'

export default {
    Query: {
        getAllUser: async (_, __, { User }) => {
            let result = await User.find({})
            return result
        },
        getUserById: async (_, { id }, { User }) => {
            let result = await User.findById(id)
            return [result]
        }
    },

    Mutation: {
        authenticateUser: async (_, { userName, password }, { User, req }) => {
            try {
                let user = await User.findOne({ userName })
                if (!user) {
                    throw new UserInputError('Username not found.')
                }
                let isMatch = await compare(password, user.password)
                if (!isMatch) {
                    throw new UserInputError('Invalid password.')
                }

                user = user.toObject();
                user.id = user._id
                user = serializeUser(user)

                let token = await issueToken(user)

                const cookie = req.res.cookie('token', token, { httpOnly: true })
                console.log("cookie", cookie);


                return {
                    token,
                    user
                }
            } catch (err) {
                throw new ApolloError(err.message, 403)
            }
        },
        registerUser: async (_, { newUser }, { User }) => {
            try {
                let { email, userName } = newUser;
                let user;
                user = await User.findOne({ userName })
                if (user) {
                    throw new UserInputError('Username is already taken.')
                }
                user = await User.findOne({ email })

                if (user) {
                    throw new UserInputError("Email is already register.")
                }

                user = User(newUser);
                user.password = await hash(newUser.password, 10)
                let result = await user.save();

                result = result.toObject();
                result.id = result._id
                result = serializeUser(result)
                // let token = await issueToken(result)

                return {
                    // token,
                    user: result
                }
            } catch (err) {
                throw new ApolloError(err.message, 400)
            }
        }
    }
}