'use client';

import { useEffect } from 'react';
import { useMetadataStore } from '@/store/usePoCStore';
import { useRouter } from 'next/navigation';

export default function Redirector() {
    const router = useRouter();
    const { metadata, setMetadata } = useMetadataStore();

    useEffect(() => {
        const fetchSNSMessage = async () => {
            try {
                const response = await fetch('/api/sns-handler', { method: 'POST' });
                const { metadata, checkoutUrl } = await response.json();

                if (metadata && checkoutUrl) {
                    setMetadata(metadata);
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
