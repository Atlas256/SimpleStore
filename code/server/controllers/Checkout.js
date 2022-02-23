import Stripe from 'stripe';



class Controller {

  async payment(req, res) {
    try {
      const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

      const items = req.body.items;


      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
              },
              unit_amount: item.price * 100,
            },
            quantity: 1
          }
        }),
        success_url: process.env.CLIENT_URL + '/success',
        cancel_url: process.env.CLIENT_URL + '/cancel'
      })

      res.status(200).json({ url: session.url })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}


export default new Controller()