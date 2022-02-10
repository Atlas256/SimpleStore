import Type from '../models/Type.js'
import Tag from '../models/Tag.js'
import Product from '../models/Product.js'
import parserUrl from '../helpers/parserUrl.js'


class Controller {

  async getSidebarData(req, res) {
    try {
      const parsedData = parserUrl(req)['filters']

      const searchSlugs = parsedData && Object.values(parsedData).flat(1)

      const tagIDs = await Tag.find((!searchSlugs) ? {} : { slug: searchSlugs }, { _id: true })

      const allTags = await Product.find({ tagsID: { $in: tagIDs } }, { _id: false, tagsID: true })


      const allTagIDs =
        Object.values(
          allTags.flat(1)
            .reduce((acc, item) => {
              acc = [...acc, ...item['tagsID']]
              return acc
            }, [])
            .reduce((acc, id) => {
              acc[id] = id
              return acc
            }, {})
        )

      console.log(2);

      //----

      let filtersData = {}

      for (let idx = 0; idx < allTagIDs.length; idx++) {

        const [tag] = await Tag.find({ _id: allTagIDs[idx] }, { __v: false })

        const [type] = await Type.find({ _id: tag.typeID }, { __v: false })

        filtersData[type._id] = {
          ...filtersData[type._id],
          type: type,
          tags: filtersData[type._id] ? [...filtersData[type._id]['tags'], tag] : [tag]
        }
      }

      console.log(3);
      console.log('-----------');


      res.status(200).json(Object.values(filtersData))
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getSidebarData2(req, res) {
    try {
      const parsedData = parserUrl(req)['filters']

      const searchSlugs = parsedData && Object.values(parsedData).flat(1)

      const tagIDs = await Tag.find((!searchSlugs) ? {} : { slug: searchSlugs }, { _id: true })

      const productTagIDs = await Product.find({ tagsID: { $in: tagIDs } }, { _id: false, tagsID: true })

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

      const usedTags = await Tag.find({ _id: usedTagIDs }, { __v: false })

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
            }, {}))

      const usedTypes = await Type.find({ _id: usedTypesID }, { __v: false })

      
      console.log(usedTags);
      console.log(usedTypes);

      usedTypes.reduce((acc, type) => {
        acc[type['_id']] = 

        //return acc
      }, {})

      res.status(200).json(Object.values(filtersData))
    } catch (error) {
      res.status(500).json(error)
    }
  }
}


export default new Controller()