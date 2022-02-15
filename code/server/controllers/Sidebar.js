import Type from '../models/Type.js'
import Tag from '../models/Tag.js'
import Product from '../models/Product.js'
import parserUrl from '../helpers/parserUrl.js'


class Controller {

  async getSidebarData(req, res) {
    try {
      const { filters, text = '' } = parserUrl(req)

      const regex = new RegExp(`${text}`.replace('_', ' '), 'i')

      const searchSlugTypes = filters && Object.keys(filters).flat(1)
      const searchSlugTags = filters && Object.values(filters).flat(1)

      //todo---1---

      const TYPES = await Type.find((!searchSlugTypes) ? {} : { slug: searchSlugTypes })
      const TAGS = await Tag.find((!searchSlugTags) ? {} : { slug: searchSlugTags })

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

      const productTagIDs = filters
        ?
        await Product.find(
          {
            $and: text !== undefined
              ?
              [...ROOLES, { title: { $regex: regex } }]
              :
              ROOLES
          }, { _id: false, tagsID: true })
        :
        await Product.find(
          text !== undefined ? { title: { $regex: regex } } : {}, { _id: false, tagsID: true })

      //todo---2---

      const usedTagIDs =
        Object.values(
          productTagIDs.flat(1)
            .reduce((acc, item) => {
              acc = [...acc, ...item['tagsID']]
              return acc
            }, [])
            .reduce((acc, id) => {
              acc[id] = id
              return acc
            }, {})
        )

      const usedTags = await Tag.find({ _id: usedTagIDs }, { __v: false });

      const usedTypesID =
        Object.values(
          usedTags
            .reduce((acc, item) => {
              acc = [...acc, item.typeID]
              return acc
            }, [])
            .reduce((acc, id) => {
              acc[id] = id
              return acc
            }, {}));

      const usedTypes = await Type.find({ _id: usedTypesID }, { __v: false });


      const filtersData = Object.values(usedTags
        .reduce((acc, tag) => {
          acc[tag.typeID] = {
            ...acc[tag.typeID],
            type: usedTypes.filter((type) => {
              if (String(type._id) === String(tag.typeID)) {
                return type
              }
            })[0],
            tags: acc[tag.typeID] ? [...acc[tag.typeID]['tags'], tag] : [tag]
          }
          return acc
        }, {}))
        .reduce((acc, item) => {
          if (item['type']['slug'] !== 'category') {
            acc = [...acc, item]
          } else {
            acc = [item, ...acc]
          }
          return acc
        }, [])



      res.status(200).json(filtersData)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}


export default new Controller()