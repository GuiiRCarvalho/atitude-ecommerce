import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { PaymentService } from '../../../../src/application/services/PaymentService';
import { PrismaUserRepository } from '../../../../src/infrastructure/database/PrismaUserRepository';
import { StripeProvider } from '../../../../src/infrastructure/providers/StripeProvider';
import { jwtTokenGenerator } from '../../../../src/infrastructure/providers/TokenGenerator';

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Token not provided' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwtTokenGenerator.verify(token);
        if (!decoded || !decoded.id) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const userId = decoded.id;
        const { items } = await req.json();

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'items array is required and must not be empty' }, { status: 400 });
        }

        const userRepository = new PrismaUserRepository();
        const stripeProvider = new StripeProvider();
        const paymentService = new PaymentService(userRepository, stripeProvider);

        const session = await paymentService.createCheckoutSession(userId, items);

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
