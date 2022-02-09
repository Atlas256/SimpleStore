
class Controller {

  async getOne(req, res) {
    try {
      
      
      res.status(200).json({ categories })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}


export default new Controller()