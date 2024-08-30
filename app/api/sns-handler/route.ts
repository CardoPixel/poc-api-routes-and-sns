// File: app/api/sns-handler/route.ts
import { NextResponse } from "next/server";

const clients: Array<{ id: number; res: any }> = [];

export async function POST(request: Request) {
    const logToClients = (log: string) => {
        clients.forEach((client) => client.res.write(`data: ${log}\n\n`));
    };

    logToClients("📩 Received POST request: " + JSON.stringify(request));

    try {
        const body = await request.json();
        logToClients("📋 Parsed body: " + JSON.stringify(body));

        const type = body.Type;
        logToClients("🔎 Received SNS message type: " + type);

        if (type === "SubscriptionConfirmation") {
            const url = body.SubscribeURL;
            logToClients("🛂 Subscription confirmation URL: " + url);
            await fetch(url);
            logToClients("☑️ Subscription confirmed successfully");
            return NextResponse.json({ message: "✅ Subscription confirmed" });
        } else if (type === "Notification") {
            const messageContent = JSON.parse(body.Message);
            logToClients(`📥 Received Notification message: ${JSON.stringify(messageContent)}`);
            const metadata = messageContent.metadata;
            const checkoutUrl = messageContent.checkoutUrl;
            logToClients("📦 Extracted metadata: " + metadata);
            logToClients("📋 Checkout URL: " + checkoutUrl);
            return NextResponse.json({ metadata, checkoutUrl });
        } else {
            logToClients("⚠️ Unhandled SNS message type: " + type);
            return NextResponse.json({ message: "⚠️ Unhandled SNS message type" });
        }
    } catch (error) {
        logToClients("❌ Error processing SNS message: " + (error as Error).toString());
        return NextResponse.json({ error: "❌ Invalid SNS message" });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = Date.now();

    const headers = new Headers();
    headers.append("Content-Type", "text/event-stream");
    headers.append("Cache-Control", "no-cache");
    headers.append("Connection", "keep-alive");

    const res = new Response(
        new ReadableStream({
            start(controller) {
                clients.push({ id, res: controller });
                req.signal.addEventListener("abort", () => {
                    clients.splice(clients.indexOf({ id, res: controller }), 1);
                    controller.close();
                });
            },
        }),
        { headers }
    );

    return res;
}
