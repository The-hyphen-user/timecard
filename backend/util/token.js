import crypto from 'crypto';

const token = (length) => {
    crypto.randomBytes(length).toString('hex');
}


export default token;