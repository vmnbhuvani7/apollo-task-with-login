import { config } from 'dotenv';

const { parsed } = config();
const PORT = parsed.PORT
const SECRET = parsed.SECRET
const DB = parsed.DB

export {
    PORT,
    DB,
    SECRET
}