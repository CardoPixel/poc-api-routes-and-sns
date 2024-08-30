// File: app/page.tsx
"use client";
import React from "react";
import { useMetadataStore } from "@/store/usePoCStore";
import Redirector from "@/components/Redirector";

export default function HomePage() {
  const { metadata, checkoutUrl, setMetadata } = useMetadataStore();

  return (
    <main>
      <h1>Welcome to the Checkout System</h1>

      <div>
        <h2>Metadata:</h2>
        <p>{metadata ? JSON.stringify(metadata) : "No metadata available"}</p>
        <p>{checkoutUrl ? JSON.stringify(checkoutUrl) : "No checkoutUrl available"}</p>
      </div>
      <Redirector setMetadata={setMetadata} />
    </main>
  );
}