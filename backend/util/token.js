import crypto from 'crypto';

/* eslint-disable arrow-body-style */
const token = (length) => {
  return crypto.randomBytes(length).toString('hex');
}
/* eslint-disable arrow-body-style */


export default token;
