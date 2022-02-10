import Type from '../models/Type.js'
import Tag from '../models/Tag.js'
import Product from '../models/Product.js'
import parserUrl from '../helpers/parserUrl.js'



class Controller {

  async getSidebarData(req, res) {
    try {
      const parsedData = parserUrl(req)['filters']

      const searchSlugs = Object.values(parsedData).flat(1)

      const tagIDs = await Tag.find({ slug: searchSlugs }, { _id: true })

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

      console.log(allTagIDs);

      let filtersData = []

      for (let idx = 0; idx < allTagIDs.length; idx++) {
        
        const tag = {...await Tag.find({_id: allTagIDs[idx]}, {__v: false})}[0]

        const type = {...await Type.find({_id: tag.typeID}, {__v: false})}[0]

        console.log({type, tag});
        
        
      }



      res.status(200).json({ 123: 123 })
    } catch (error) {
      res.status(500).json(error)
    }
  }

}


export default new Controller()