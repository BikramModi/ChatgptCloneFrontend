import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./Stripe.js";
import CheckoutForm from "./CheckoutForm";

import { useParams } from "react-router-dom";




const Checkout = () => {

    const { id, amount } = useParams();

    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        const createPaymentIntent = async () => {
            const res = await api.post("/payments/create-payment-intent", {
                orderId: id,
                amount: amount * 100,
            });

            setClientSecret(res.data.clientSecret);
        };

        createPaymentIntent();
    }, [id, amount]);

    if (!clientSecret) return <div>Loading payment...</div>;

    return (
        <div className="bg-indigo-300 min-h-screen flex items-center justify-center">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} />
            </Elements>
        </div>
    );
};

export default Checkout;
