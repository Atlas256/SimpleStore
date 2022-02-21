import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);



const storeItems = new Map([
  [1, { priceInCents: 1000, name: 'Name_1'}],
  [2, { priceInCents: 2500, name: 'Name_2'}]
])


class Controller {

  async checkout(req, res) {
      try {
    
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: req.body.items.map(item => {
            const storeItem = storeItems.get(item.id)
            return {
              price_data: {
                currence: 'usd',
                product_data: {
                  name: storeItem.name
                },
                unit_amount: storeItem.priceInCents
              },
              quantity: item.quantity
            }
          }),
          success_url: process.env.CLIENT_URL,
          cancel_url: process.env.CLIENT_URL
        })
    
        res.json({url: session.url})
      } catch (error) {
        res.statusCode(500).json({error: error.message})
      }
    }
}


export default new Controller()