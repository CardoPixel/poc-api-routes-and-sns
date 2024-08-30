import { create } from 'zustand';
import { Metadata } from '@/types/Metadata';

interface MetadataState {
    metadata: Metadata | null;
    setMetadata: (metadata: Metadata) => void;
}

export const useMetadataStore = create<MetadataState>((set) => ({
    metadata: null,
    setMetadata: (metadata) => set({ metadata }),
}));
