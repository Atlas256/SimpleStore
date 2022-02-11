import Product from '../models/Product.js';
import parseUrl from '../helpers/parserUrl.js';


class Controller {

  async getProducts(req, res) {
    try {
      const { text } = parseUrl(req);

      console.log(text);

      var regex = new RegExp(`${text}`.replace('_', ' '), 'i')

      const products = await Product.find({title: {$regex: regex}});

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}


export default new Controller()