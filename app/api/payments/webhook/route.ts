import { NextResponse } from 'next/server';
import { PaymentService } from '../../../../src/application/services/PaymentService';
import { PrismaUserRepository } from '../../../../src/infrastructure/database/PrismaUserRepository';
import { StripeProvider } from '../../../../src/infrastructure/providers/StripeProvider';

export async function POST(req: Request) {
    try {
        const signature = req.headers.get('stripe-signature');
        if (!signature) {
            return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
        }

        // Stripe requires the raw buffer to verify the webhook signature
        const arrayBuffer = await req.arrayBuffer();
        const rawBody = Buffer.from(arrayBuffer);

        const userRepository = new PrismaUserRepository();
        const stripeProvider = new StripeProvider();
        const paymentService = new PaymentService(userRepository, stripeProvider);

        const result = await paymentService.handleWebhook(rawBody, signature);

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
