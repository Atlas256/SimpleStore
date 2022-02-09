import Model from '../models/Tag.js'
import parserUrl from '../helpers/parserUrl.js';

const LIMIT = 8;

class Controller {

  async create(req, res) {
    try {
      const body = req.body
      const typeID = body.typeID
      const slug = body.slug
      const item = await Model.findOne({ $or: [{ typeID, slug }] })

      if (item) {
        res.status(400).json({ message: "TypeID is alredy use!" })
      } else {
        const answer = await Model.create(body)
        res.status(200).json(answer)
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getAll(req, res) {
    try {
      const answer = await Model.find()

      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getFromParams(req, res) {
    try {
      const params = parserUrl(req);
      const PAGE = params.page - 1;
      const answer = await Model.find().skip(LIMIT * PAGE).limit(LIMIT).sort({ title: 1 })

      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }


  async getOne(req, res) {
    try {
      const answer = await Model.findById(getID(req, res))

      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async update(req, res) {
    try {
      const body = req.body
      const typeID = body.typeID
      const slug = body.slug
      const item = await Model.findOne({ $or: [{ typeID, slug }] })

      if (item) {
        res.status(400).json({ message: "TypeID is alredy use!" })
      } else {
        const answer = await Model.findByIdAndUpdate(getID(req, res), { ...body }, { new: true })
        res.status(200).json(answer)
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async delete(req, res) {
    try {
      const answer = await Model.findByIdAndDelete(getID(req, res))

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
    res.status(400).json({ message: "ID not specified!" })
  }
  return id
}



export default new Controller()