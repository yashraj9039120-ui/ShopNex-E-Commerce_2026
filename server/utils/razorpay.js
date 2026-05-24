// Temporary Razorpay Fix for Development
let instance;

try {
    const Razorpay = (await import('razorpay')).default;

    instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy12345',
        key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy123456789secretkey'
    });

    console.log("✅ Razorpay initialized successfully with dummy keys");
} catch (error) {
    console.log("⚠️ Using dummy Razorpay instance (no real payments)");
    instance = {
        orders: {
            create: async (options) => ({
                id: "order_dummy_" + Date.now(),
                amount: options.amount,
                currency: options.currency
            })
        }
    };
}

export { instance };