import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
});

export class StripeProvider {
    async createCheckoutSession(
        customerId: string,
        lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
        successUrl: string,
        cancelUrl: string,
        userId: string,
    ) {
        return stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: lineItems,
            customer: customerId,
            success_url: successUrl,
            cancel_url: cancelUrl,
            client_reference_id: userId,
        });
    }

    async createCustomer(email: string, name?: string | null, userId?: string) {
        return stripe.customers.create({
            email,
            name: name ?? undefined,
            metadata: userId ? { userId } : undefined,
        });
    }

    async createPortalSession(customerId: string, returnUrl: string) {
        return stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
        });
    }

    constructEvent(rawBody: string | Buffer, signature: string) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
        return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    }
}
