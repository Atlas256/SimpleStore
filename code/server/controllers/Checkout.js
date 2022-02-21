import Stripe from 'stripe';



class Controller {

  async secret(req, res) {
    try {
      const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
      });

      const intent = paymentIntent;
      res.json({ privateKey: intent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async payment(req, res) {
    try {
      const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Test product'
            },
            unit_amount: 7777
          },
          quantity: 1
        }],
        success_url: process.env.CLIENT_URL + '/ok',
        cancel_url: process.env.CLIENT_URL + '/newok'
      })

      res.status(200).json({ url: session.url })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}


export default new Controller()