// File: app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useMetadataStore } from "@/store/usePoCStore"; // Import the zustand store
import Redirector from "@/components/Redirector";

export default function HomePage() {
  const { metadata, checkoutUrl } = useMetadataStore(); // Access the metadata state from the zustand store

  return (
    <main>
      <h1>Welcome to the Checkout System</h1>

      <div>
        <h2>Metadata:</h2>
        <p>{metadata ? JSON.stringify(metadata) : "No metadata available"}</p>
        <p>{checkoutUrl ? JSON.stringify(checkoutUrl) : "No checkoutUrl available"}</p>
      </div>
      <Redirector />
    </main>
  );
}