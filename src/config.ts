
export const config = {
    port: process.env.PORT || 3333,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    stripePriceId: process.env.STRIPE_PRICE_ID,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};
