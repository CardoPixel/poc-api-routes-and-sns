import { create } from 'zustand';
import { Metadata } from '@/types/Metadata';

interface MetadataState {
    metadata: Metadata | null;
    checkoutUrl: string | null; // Add checkoutUrl field
    setMetadata: (metadata: Metadata, checkoutUrl?: string) => void; // Update setMetadata function signature
}

export const useMetadataStore = create<MetadataState>((set) => ({
    metadata: null,
    checkoutUrl: null, // Initialize checkoutUrl to null
    setMetadata: (metadata, checkoutUrl) => set({ metadata, checkoutUrl }), // Update setMetadata function to accept checkoutUrl
}));