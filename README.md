# AirWallex with HPP (Hosted Payment Page)

Steps for the Integration

1. Create the backend to hit the Airwallex API (https://api-demo.airwallex.com/api/v1/pa/payment_intents/create) and create the payment intent 
2. For this call we need: request_id, amount, currency, merchant_order_id, return_url and order object
3. These fields need to be sent from the front end
4. In front end NavBar.js)
    - Initialise Airwallex
    - Getting amount, currency
    - Hit the backend and send amount, currency
    - from the response we extract client_secret, intent_id
    - with client_secret and intent_id we call the redirectToCheckout

How to run the app:
1. Create a new Auh token
2. Update the .env file AIRWALLEX_BEARER_TOKEN
3. On the home directory: `npm start` --> this will run the backend
4. Open a second terminal go to /store and again `npm start` --> this will run the frontend
