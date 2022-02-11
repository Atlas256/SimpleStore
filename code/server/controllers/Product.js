import Model from '../models/Product.js'
import Tag from '../models/Tag.js'
import Type from '../models/Type.js'
import { titleToSlug } from '../helpers/titleToSlug.js'
import parserUrl from '../helpers/parserUrl.js'
import { uploadImage } from '../helpers/imageUploader.js'


class Controller {
  async create(req, res) {
    try {
      const body = req.body
      body.slug = titleToSlug(body.title)
      body.createdDate = Date.now()
      body.updatedDate = Date.now()
      body.image = uploadImage(req)

      const answer = await Model.create(body)
      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getFromParams(req, res) {
    try {
      const { filters = {}, sort, page, text } = parserUrl(req)

      const regex = new RegExp(`${text}`.replace('_', ' '), 'i')


      const roolesSearchIDs = [
        ...await Object.keys(filters).reduce(async (promiseAcc, typeSlug) => {
          const typeID = await Type.findOne({ slug: typeSlug }, { _id: true })
          const tagsID = await Tag.find({ typeID: typeID, slug: filters[typeSlug] }, { _id: true })
          const searchIDs = await promiseAcc
          return [...searchIDs, { tagsID: { $in: tagsID } }]
        }, [])
      ]

      const searchProducts = await Model.find({
        $and: text
          ?
          [...roolesSearchIDs, { title: { $regex: regex } }]
          :
          roolesSearchIDs
      })

      res.status(200).json(searchProducts)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getAll(req, res) {
    try {

      if (req.query.ids) {
        const cartProducts = await Model.find({ _id: { $in: req.query.ids } }, { __v: false })
        res.status(200).json(cartProducts)
      } else {
        const cartProducts = await Model.find()
        res.status(200).json(cartProducts)
      }

    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getOne(req, res) {
    try {
      const id = getID(req, res)
      const answer = await Model.findById(id)

      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getOneFromSlug(req, res) {
    try {
      const answer = await Model.findOne({ slug: req.params.id })

      res.status(200).json(answer)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async update(req, res) {
    try {
      const body = req.body

      if (body.title) {
        body.slug = titleToSlug(body.title)
      }

      if (req.files && req.files.image) {
        body.image = uploadImage(req)
      }

      const answer = await Model.findByIdAndUpdate(getID(req, res), { ...body }, { new: true })

      res.status(200).json(answer)
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

/*
        case 'cheap': res[key] = value; break;
        case 'expensive': res[key] = value; break;
        case 'popularity': res[key] = values; break;
        case 'action': res[key] = values; break;
        case 'rank':
*/