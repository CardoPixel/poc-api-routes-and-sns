// File: store/usePoCStore.ts
import { create } from 'zustand'; // Updated import statement

interface Metadata {
    // Define the structure of your metadata here
}

interface MetadataState {
    metadata: Metadata | null;
    checkoutUrl: string | null;
    setMetadata: (metadata: Metadata, checkoutUrl: string) => void;
}

export const useMetadataStore = create<MetadataState>((set) => ({
    metadata: null,
    checkoutUrl: null,
    setMetadata: (metadata, checkoutUrl) => set({ metadata, checkoutUrl }),
}));