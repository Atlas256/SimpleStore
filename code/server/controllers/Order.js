import Order from '../models/Order.js'

class Controller {
  async create(req, res) {
    try {
      const order = req.body;
      order.orderDate = Date.now();
      const answer = await Order.create(order)
      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new Controller();