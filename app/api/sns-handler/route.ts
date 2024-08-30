// File: app/api/sns-handler/route.ts
import { NextResponse } from "next/server";

// Temporary storage for metadata and checkoutUrl
let storedMetadata: any = null;
let storedCheckoutUrl: string | null = null;

export async function POST(request: Request) {
    console.log('📩 Received POST request:', request); // Logging the raw POST request

    try {
        const body = await request.json();
        console.log('📋 Parsed body: ', JSON.stringify(body));
        const type = body.Type;
        console.log('🔎 Received SNS message type:', type);

        if (type === "SubscriptionConfirmation") {
            const url = body.SubscribeURL;
            console.log('🛂 Subscription confirmation URL:', url); // Logging the subscription URL
            await fetch(url);
            console.log('☑️ Subscription confirmed successfully');
            return NextResponse.json({ message: "✅ Subscription confirmed" });
        } else if (type === "Notification") {
            try {
                const messageContent = JSON.parse(body.Message);
                console.log(`📥 Received Notification message: ${JSON.stringify(messageContent)}`);
                storedMetadata = messageContent.default.metadata;
                storedCheckoutUrl = messageContent.default.checkoutUrl;
                console.log('📦 Extracted metadata: ', storedMetadata); // Logging extracted metadata
                console.log('📋 Checkout URL: ', storedCheckoutUrl); // Logging checkout URL
                return NextResponse.json({ metadata: storedMetadata, checkoutUrl: storedCheckoutUrl });
            } catch (error) {
                console.error('❌ Error processing SNS message:', error); // Logging processing error
                return NextResponse.json({ error: "❌ Invalid SNS message" });
            }
        } else {
            console.warn('⚠️ Unhandled SNS message type:', type); // Logging unhandled message type
            return NextResponse.json({ message: "⚠️ Unhandled SNS message type" });
        }
    } catch (error) {
        console.error('❌ Error processing SNS message:', error); // Logging processing error
        return NextResponse.json({ error: "❌ Invalid SNS message" });
    }
}

export async function GET(request: Request) {
    try {
        if (storedMetadata && storedCheckoutUrl) {
            console.log('🔄 Returning stored metadata and checkout URL'); // Logging returning values
            return NextResponse.json({ metadata: storedMetadata, checkoutUrl: storedCheckoutUrl });
        } else {
            console.log('ℹ️ No metadata or checkout URL found in storage'); // Logging empty storage
            return NextResponse.json({ message: "⚠️ No metadata or checkout URL available" });
        }
    } catch (error) {
        console.error('❌ Error processing GET request:', error); // Logging processing error
        return NextResponse.json({ error: "❌ Invalid GET request" });
    }
}
