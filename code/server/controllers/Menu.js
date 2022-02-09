import Type from '../models/Type.js'
import Tag from '../models/Tag.js'
import parserUrl from '../helpers/parserUrl.js'



class Controller {

  async getCategories(req, res) {
    try {
      const categoryID = await Type.find({ slug: 'category' }, { _id: true })
      const categories = await Tag.find({ typeID: categoryID }, { _id: true, title: true, slug: true })

      res.status(200).json({ categories })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getCategory(req, res) {
    try {
      const categoryName = parserUrl(req)['category']

      const typesID = (await Tag.findOne({ slug: categoryName }, { _id: false, typeArrayID: true }))['typeArrayID']
      const typesArray = await Type.find({ _id: { $in: typesID } }, { _id: true, title: true, slug: true, })

      const sidebarData = await typesArray.reduce(
        async (promiseAcc, type) => {
          const acc = await promiseAcc
          const tags = await Tag.find({ typeID: type['_id'] }, { typeArrayID: false })

          return [...acc, { 'type': type, 'tags': tags }]
        }, [])

      res.status(200).json(sidebarData)
    } catch (error) {
      res.status(500).json(error)
    }
  }

}


export default new Controller()