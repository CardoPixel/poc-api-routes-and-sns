// File: app/api/sns-handler/route.ts
import { NextResponse } from "next/server";

// Temporary storage for metadata and checkoutUrl
let storedMetadata: any = null;
let storedCheckoutUrl: string | null = null;

export async function POST(request: Request) {
    console.log('📩 Received POST request:', request);

    try {
        const body = await request.json();
        console.log('📋 Parsed body: ', JSON.stringify(body));
        const type = body.Type;
        console.log('🔎 Received SNS message type:', type);

        if (type === "SubscriptionConfirmation") {
            const url = body.SubscribeURL;
            console.log('🛂 Subscription confirmation URL:', url);
            await fetch(url);
            console.log('☑️ Subscription confirmed successfully');
            return NextResponse.json({ message: "✅ Subscription confirmed" });
        } else if (type === "Notification") {
            try {
                const messageContent = JSON.parse(JSON.parse(body.Message).default);
                console.log(`📥 Received Notification message: ${JSON.stringify(messageContent)}`);
                storedMetadata = messageContent.metadata;
                storedCheckoutUrl = messageContent.checkoutUrl;
                console.log('📦 Extracted metadata: ', storedMetadata);
                console.log('📋 Checkout URL: ', storedCheckoutUrl);
                return NextResponse.json({ metadata: storedMetadata, checkoutUrl: storedCheckoutUrl });
            } catch (error) {
                console.error('❌ Error processing SNS message:', error);
                return NextResponse.json({ error: "❌ Invalid SNS message" });
            }
        } else {
            console.warn('⚠️ Unhandled SNS message type:', type);
            return NextResponse.json({ message: "⚠️ Unhandled SNS message type" });
        }
    } catch (error) {
        console.error('❌ Error processing SNS message:', error);
        return NextResponse.json({ error: "❌ Invalid SNS message" });
    }
}

export async function GET(request: Request) {
    try {
        if (storedMetadata && storedCheckoutUrl) {
            console.log('🔄 Returning stored metadata and checkout URL');
            return NextResponse.json({ metadata: storedMetadata, checkoutUrl: storedCheckoutUrl });
        } else {
            console.log('ℹ️ No metadata or checkout URL found in storage');
            return NextResponse.json({ message: "⚠️ No metadata or checkout URL available" });
        }
    } catch (error) {
        console.error('❌ Error processing GET request:', error);
        return NextResponse.json({ error: "❌ Invalid GET request" });
    }
}