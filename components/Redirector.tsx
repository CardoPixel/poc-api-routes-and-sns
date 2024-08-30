// File: components/Redirector.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Metadata } from '@/types/Metadata';
import { useMetadataStore } from '@/store/usePoCStore';

interface RedirectorProps {
    setMetadata: (metadata: Metadata, checkoutUrl: string) => void;
}

const Redirector: React.FC<RedirectorProps> = ({ setMetadata }) => {
    const router = useRouter();

    useEffect(() => {
        const fetchSNSMessage = async () => {
            try {
                const response = await fetch('/api/sns-handler', { method: 'GET' });
                const { metadata, checkoutUrl } = await response.json();

                if (metadata && checkoutUrl) {
                    setMetadata(metadata, checkoutUrl);
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