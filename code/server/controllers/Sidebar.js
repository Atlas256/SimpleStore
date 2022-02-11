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

      
      //console.log(usedTags);
      //console.log(usedTypes);

      const filtersData = usedTags.reduce((acc, tag) => {
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
      }, {})

      //console.log(filtersData);

      res.status(200).json(Object.values(filtersData))
    } catch (error) {
      res.status(500).json(error)
    }
  }
}


export default new Controller()