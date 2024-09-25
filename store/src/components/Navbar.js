import {Button, Container, Navbar, Modal} from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { CartContext } from "../CartContext";
import CartProduct from './CartProduct';
import { loadAirwallex, redirectToCheckout } from 'airwallex-payment-elements'
import axios from 'axios';


function NavbarComponent() {
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //Initialize Airwallex
    useEffect(() => {
        loadAirwallex({
            env: 'demo', // Setup which Airwallex env('demo' | 'prod') to integrate with
            /*
            Set up your event target to receive the browser events message
            By setting origin: window.location.origin, you are dynamically setting the origin based on where your frontend is currently running. 
            This ensures that during development, the origin will be something like http://localhost:3000, and in production, 
            it will automatically adjust to your live domain (e.g., https://www.yourwebsite.com).
            */ 
            origin: window.location.origin,
        });
    }, []);


    //checkout function from Client
    const checkout = async () => {
        try {
            const response = await axios.post('http://localhost:3001/create-payment-intent', {
                amount: cart.getTotalCost(), // Convert to smallest currency unit (e.g., cents for USD)
                currency: 'USD',
                merchant_order_id: `order_${Date.now()}`,
                return_url: 'http://www.yourwebsite.com/payment-result',
                order: {
                    items: cart.items.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            });

            const { client_secret, id } = response.data;

            //Redirect to Airwallex hosted payment page
            redirectToCheckout({
                env: 'demo', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
                intent_id: id,
                client_secret: client_secret,
                currency: 'USD'
            });

        } catch (error) {
            console.error('Error creating PaymentIntent:', error);
        }
    };

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map( (currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                            <Button variant="success" onClick={checkout}>
                                Purchase items!
                            </Button>
                        </>
                    :
                        <h1>There are no items in your cart!</h1>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NavbarComponent;