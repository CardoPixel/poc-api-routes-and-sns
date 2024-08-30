// File: app/checkout/page.tsx
"use client"
import React, { useEffect } from 'react';
import { useMetadataStore } from '@/store/usePoCStore'; // Import the zustand store

const CheckoutPage: React.FC = () => {
    const { setMetadata } = useMetadataStore(); // Destructure the setMetadata function from the zustand store

    useEffect(() => {
        // Clear the metadata and checkoutUrl values when the component mounts
        setMetadata({ orderId: '', userId: '', amount: 0 }, ''); // Example values, replace with actual data
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    return (
        <div>
            <h2>Mock Checkout Page</h2>
            <p>This is a mock checkout page for testing purposes. The PoC works!! 🎉</p>
            {/* Add checkout form or any other checkout-related content here */}
        </div>
    );
};

export default CheckoutPage;