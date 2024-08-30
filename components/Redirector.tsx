// File: components/Redirector.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Metadata } from '@/types/Metadata';

interface RedirectorProps {
    metadata: Metadata; // Replace YourMetadataType with the actual type of metadata
    checkoutUrl: string; // Assuming checkoutUrl is a string
    setMetadata: (metadata: Metadata, checkoutUrl: string) => void; // Define the function signature
}

const Redirector: React.FC<RedirectorProps> = ({ metadata, checkoutUrl, setMetadata }) => {
    const router = useRouter();

    useEffect(() => {
        const fetchSNSMessage = async () => {
            try {
                const response = await fetch('/api/sns-handler', { method: 'GET' }); // Change method to GET
                const { metadata, checkoutUrl } = await response.json();

                if (metadata && checkoutUrl) {
                    setMetadata(metadata, checkoutUrl);
                    // Perform any additional checks here if necessary
                    router.push(checkoutUrl);
                }
            } catch (error) {
                console.error('❌ Failed to handle SNS message:', error);
            }
        };

        fetchSNSMessage();
    }, [setMetadata, router]);

    return null;
}

export default Redirector;