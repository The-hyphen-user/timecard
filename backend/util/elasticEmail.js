import axios from 'axios'
import dotenv from 'dotenv'
import Email from '../models/email.js'


dotenv.config({ path: '../.env' });

const sendEmail = async ({ recipientEmail, content }) => {
    const { EMAIL_ENDPOINT, ELASTIC_EMAIL_API_KEY } = process.env
    const emailApiEndpoint = 'https://api.elasticemail.com/v4/emails';

    // const headerParamName = 'X-ElasticEmail-ApiKey'
    const from = 'daniel@danielwamsher.com'

    const requestBody = {
        Recipients: [
            {
                Email: recipientEmail,
            },
        ],
        Content: {
            Body: [
                {
                    ContentType: 'HTML',
                    Content: `<p>${content}</p>`,
                    Charset: 'UTF-8',
                },
            ],
            Subject: 'no reply',
            From: from,
        },
        Options: {
            TimeOffset: null,
            PoolName: 'My Custom Pool',
            ChannelName: 'Channel01',
            Encoding: 'UserProvided',
            TrackOpens: 'true',
            TrackClicks: 'true',
        },
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-ElasticEmail-ApiKey': ELASTIC_EMAIL_API_KEY,
        },
    };

    try {
        const response = await axios.post(emailApiEndpoint, requestBody, config);
        const email = new Email({
            address: recipientEmail,
            content,
            from,
            TransactionID: response.TransactionID,
            MessageID: response.MessageID,
        })
        await email.save()
    } catch (error) {
        console.error('Error sending email:', error.message);
        console.error('Detailed error:', error.response.data);
    }
}

export default sendEmail