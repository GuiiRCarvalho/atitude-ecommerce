import Stripe from 'stripe';

export class StripeProvider {
    private get stripe() {
        const key = process.env.STRIPE_SECRET_KEY;
        if (!key || key === 'sk_test_your_stripe_secret_key' || key === 'sk_test_mock_for_build') {
            throw new Error(`A chave secreta do Stripe (STRIPE_SECRET_KEY) não foi configurada corretamente nas Environment Variables da Vercel. Atual: ${key}`);
        }
        return new Stripe(key, {
            apiVersion: '2024-04-10' as any, // Using as any since runtime stripe allows multiple versions but the types are rigid for the latest.
            httpClient: Stripe.createFetchHttpClient(), // Force fetch API instead of legacy Node http module to fix Vercel timeouts
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
