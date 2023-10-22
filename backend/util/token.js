//random token generator import


// const crypto = require('crypto');
import crypto from 'crypto';

// function token(length) {
//   return crypto.randomBytes(length).toString('hex');
// }
const token = (length) => {
    return crypto.randomBytes(length).toString('hex');
}

// module.exports = token;

// const token = () => {
//     //random token generator here
//     const ran = 512314123
//     return ran
// }

export default token;