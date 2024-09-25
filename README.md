# AirWallex with HPP (Hosted Payment Page)A

This is the integration of a simple ecommerce app (built in React) with Airwallex Hosted Payment Page

**How to run the app:**

1. Create a new Auth token
2. Update the `AIRWALLEX_BEARER_TOKEN` int `.env` file 
3. On the home directory: `npm start` --> this will run the backend
4. Open a second terminal go to /store and again `npm start` --> this will run the frontend
5. Open the http://localhost:3000/
6. Select any products and add them to the cart
7. Click on the `Purchase Items!` button
8. The user is redirected to Hosted Payment Page, hosted by Airwallex, where he can complete the payment


**Technical details of the integration**
1. Create the backend to hit the Airwallex API (https://api-demo.airwallex.com/api/v1/pa/payment_intents/create). This is needed for creating the the payment intent 
2. For this call we need: `request_id`, `amount`, `currency`, `merchant_order_id`, `return_url`
3. These fields need to be sent from the front end
4. In the front end, `NavBar.js`:
    - Initialise Airwallex
    - Getting amount, currency
    - Hit the backend and send amount, currency
    - from the response we extract client_secret, intent_id
    - with client_secret and intent_id we call the redirectToCheckout


