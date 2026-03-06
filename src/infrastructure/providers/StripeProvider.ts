import Stripe from 'stripe';

export class StripeProvider {
    private get stripe() {
        return new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_for_build', {
            apiVersion: '2024-04-10' as any, // Using as any since runtime stripe allows multiple versions but the types are rigid for the latest.
        });
    }

    async createCheckoutSession(
        customerId: string,
        lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
        successUrl: string,
        cancelUrl: string,
        userId: string,
    ) {
        return this.stripe.checkout.sessions.create({
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
        return this.stripe.customers.create({
            email,
            name: name ?? undefined,
            metadata: userId ? { userId } : undefined,
        });
    }

    async createPortalSession(customerId: string, returnUrl: string) {
        return this.stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
        });
    }

    constructEvent(rawBody: string | Buffer, signature: string) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
        return this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    }
}
