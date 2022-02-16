import Model from '../models/Product.js'
import Tag from '../models/Tag.js'
import Type from '../models/Type.js'
import { titleToSlug } from '../helpers/titleToSlug.js'
import parserUrl from '../helpers/parserUrl.js'
import { uploadImage } from '../helpers/imageUploader.js'


const LIMIT = 4




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
      let { filters = {}, sort, page=1, text='' } = parserUrl(req)
/*
      if (!/^[а-я]/.test(text.toString(16))) {
        this.text = text.toString(16)
      } 
*/

      const regex = new RegExp(`${text}`.replace('_', ' '), 'i')

      //!-------------------

      const TYPES = await Type.find({ slug: { $in: Object.keys(filters).flat(1) } })
      const TAGS = await Tag.find({ slug: { $in: Object.values(filters).flat(1) } })

      const _ROOLES = TAGS.reduce((ROOLES, TAG) => {
        if (TYPES.some(type => String(type._id) === String(TAG['typeID']))) {
          const KEY = String(TAG['typeID'])
          ROOLES[KEY] = ROOLES[KEY] ? [...ROOLES[KEY], TAG['_id']] : [TAG['_id']]
        }
        return ROOLES
      }, {})

      const ROOLES = Object.values(_ROOLES).reduce((acc, item) => {
        acc = [...acc, { tagsID: { $in: item } }]
        return acc;
      }, [])
      
      //!-------------------

      const searchProducts = await Model.find({
        $and: text !== undefined
          ?
          [...ROOLES, { title: { $regex: regex } }]
          :
          ROOLES
      })

      const pagesCount = Math.ceil( searchProducts.length / LIMIT );

      const products = searchProducts.slice((page-1)*LIMIT, (page-1)*LIMIT+LIMIT)


      res.status(200).json({pagesCount, products})
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getAll(req, res) {
    try {

      const allProducts = await Model.find({}, {__v: false})
      const products = allProducts.slice(0, LIMIT)
      
      const pagesCount = Math.ceil( allProducts.length / LIMIT );

      console.log(pagesCount);
      
      res.status(200).json({pagesCount, products})
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getFromIDs(req, res) {
    try {

      if (req.query.ids) {
        const products = await Model.find({ _id: { $in: req.query.ids } }, { __v: false })
        res.status(200).json(products)
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