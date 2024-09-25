const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');


// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


// Middleware to parse JSON bodies
app.use(express.json());


// Middleware to enable CORS
app.use(cors());


// Endpoint to create PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency, merchant_order_id, return_url, order } = req.body;

    try {
        const response = await axios.post('https://api-demo.airwallex.com/api/v1/pa/payment_intents/create', {
            request_id: `${Date.now()}`, // Unique ID for the request
            amount: amount,
            currency: currency,
            merchant_order_id: merchant_order_id,
            return_url: return_url,
            order: order
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AIRWALLEX_BEARER_TOKEN}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        res.status(500).json({ error: 'Failed to create PaymentIntent' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
