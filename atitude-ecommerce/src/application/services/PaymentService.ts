import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { StripeProvider } from '../../infrastructure/providers/StripeProvider';

export class PaymentService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly stripeProvider: StripeProvider,
    ) { }

    async createCheckoutSession(userId: string, items: { title: string, price: string, quantity: number, imageUrl?: string }[]) {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('User not found');

        let customerId = user.stripeCustomerId;

        if (!customerId) {
            const customer = await this.stripeProvider.createCustomer(
                user.email,
                user.name,
                user.id,
            );
            customerId = customer.id;
            user.setStripeCustomerId(customerId as string);
            await this.userRepository.save(user);
        }

        const parsePrice = (priceStr: string) => {
            return Math.round(parseFloat(priceStr.replace('R$', '').replace('.', '').replace(',', '.').trim()) * 100);
        };

        const lineItems = items.map(item => {
            return {
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: item.title,
                        images: item.imageUrl ? [item.imageUrl] : [],
                    },
                    unit_amount: parsePrice(item.price),
                },
                quantity: item.quantity,
            };
        });

        const session = await this.stripeProvider.createCheckoutSession(
            customerId,
            lineItems,
            `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            `${process.env.FRONTEND_URL}/cancel`,
            userId,
        );

        return session;
    }

    async createPortalSession(userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user?.stripeCustomerId) throw new Error('No Stripe customer found for this user');

        return this.stripeProvider.createPortalSession(
            user.stripeCustomerId,
            `${process.env.FRONTEND_URL}/dashboard`,
        );
    }

    async handleWebhook(rawBody: Buffer, signature: string) {
        let event: ReturnType<typeof this.stripeProvider.constructEvent>;
        try {
            event = this.stripeProvider.constructEvent(rawBody, signature);
        } catch (err: any) {
            throw new Error(`Webhook signature verification failed: ${err.message}`);
        }

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as any;
                const userId = session.client_reference_id as string;
                if (userId && session.customer) {
                    const user = await this.userRepository.findById(userId);
                    if (user) {
                        user.setStripeCustomerId(session.customer as string);
                        await this.userRepository.save(user);
                    }
                }
                console.log('Checkout completed for user:', userId);
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as any;
                console.log('Subscription updated:', subscription.id, '| Status:', subscription.status);
                // TODO: Update subscriptionStatus field in user model
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as any;
                console.log('Subscription deleted:', subscription.id);
                // TODO: Mark user as unsubscribed in DB
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as any;
                console.log('Payment failed for invoice:', invoice.id);
                // TODO: Notify user via email
                break;
            }

            default:
                console.log('Unhandled Stripe event:', event.type);
        }

        return { received: true };
    }
}
