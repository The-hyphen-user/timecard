import crypto from 'crypto';

const token = (length) => {
    return crypto.randomBytes(length).toString('hex');
}


export default token;