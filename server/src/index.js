import { success, error } from 'consola';
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import AppModels from './models';
import {
    DB,
    PORT,
    SECRET
} from './config';
import { resolvers, typeDefs } from './graphql';
import { schemaDirectives } from './graphql/directives';
import cors from 'cors';
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extends: true }))

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

const getMe = async (req) => {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
        try {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1]
            const me = await jwt.verify(bearerToken, SECRET)
            return await AppModels.User.findById(me.id)
        } catch (e) {
            throw new AuthenticationError('Session Invalid or expired.')
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context: async ({ req, connection }) => {
        if (connection) {
            return {
                ...AppModels
            }
        }
        if (req) {
            const me = await getMe(req)
            return {
                me,
                secret: SECRET,
                req,
                ...AppModels,
            }
        }
    },
})

// server.applyMiddleware({ app, path: '/graphql' });

server.applyMiddleware({
    app, path: '/graphql', cors: {
        origin: "http://localhost:3000", //clientside url
        credentials: true
    }
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const startApp = async () => {
    try {
        await mongoose.connect(DB, options)
        success({
            badge: true,
            message: `Successfully connected with the database`
        })
        httpServer.listen(PORT, () => success({
            badge: true,
            message: `Server Started on PORT ${PORT}`
        }))
    } catch (err) {
        error({
            badge: true,
            message: err.message
        })
    }
}

startApp();