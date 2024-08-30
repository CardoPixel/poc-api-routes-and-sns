// File: app/api/sns-handler/route.ts
import { NextResponse } from "next/server";

const clients: Array<{ id: number; res: any }> = [];

export async function POST(request: Request) {
    console.log('📩 Recieved POST request:', request); // Logging the raw POST request

    try {
        const body = await request.json();
        console.log('📋 Parsed body: ', JSON.stringify(body));
        const type = body.Type;
        console.log('🔎 Received SNS message type:', type);

        if (type === "SubscriptionConfirmation") {
            const url = body.SubscribeURL;
            console.log('🛂 Subscription confirmation URL:', url); // Logging the subscription URL
            // Perform the subscription confirmation if required
            await fetch(url);
            console.log('☑️ Subscription confirmed successfully');
            return NextResponse.json({ message: "✅ Subscription confirmed" });
        } else if (type === "Notification") {
            try {
                const messageContent = JSON.parse(JSON.parse(body.Message).default);
                console.log(`📥 Received Notification message: ${JSON.stringify(messageContent)}`);
                const metadata = messageContent.metadata;
                const checkoutUrl = messageContent.checkoutUrl;
                console.log('📦 Extracted metadata: ', metadata); // Logging extracted metadata
                console.log('📋 Checkout URL: ', checkoutUrl); // Logging checkout URL
                return NextResponse.json({ metadata, checkoutUrl });
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
