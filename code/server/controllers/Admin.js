import parserUrl from '../helpers/parserUrl.js';
import Admin from '../models/Admin.js'

const LIMIT = 8;

class Controller {
  async create(req, res) {
    try {
      const body = req.body
      const answer = await Admin.create(body)

      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getAll(req, res) {
    try {
      const answer = await Admin.find().limit(LIMIT)
      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getFromParams(req, res) {
    try {
      const params = parserUrl(req);
      const PAGE = params.page - 1;
      const answer = await Admin.find().skip(LIMIT * PAGE).limit(LIMIT).sort({ name: 1 })

      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getOne(req, res) {
    try {
      const answer = await Admin.findById(getID(req, res))

      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async update(req, res) {
    try {
      const { name, email, pass } = req.body
      const answer = await Admin.findByIdAndUpdate(
        getID(req, res),
        { name, email, pass },
        { new: true }
      )

      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async delete(req, res) {
    try {
      const answer = await Admin.findByIdAndDelete(getID(req, res))

      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

//-----------------------------------------------------------------------------

function getID(req, res) {
  const { id } = req.params

  if (!id) {
    res.status(400).json(error)
  }
  return id
}


export default new Controller()