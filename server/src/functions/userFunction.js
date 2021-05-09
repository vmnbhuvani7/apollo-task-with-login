import { sign } from "jsonwebtoken";
import { pick } from "lodash";
import { SECRET } from '../config';

const issueToken = async (user) => {
    let token = sign(user, SECRET, { expiresIn: 60 * 60 * 24 })
    return `Bearer ${token}`
}
const serializeUser = (user) => pick(user, ['id', 'userName', 'email', 'firstName', 'lastName'])

export { issueToken, serializeUser }
