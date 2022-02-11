import Router from 'express'
import Admin from './controllers/Admin.js'
import Type from './controllers/Type.js'
import Tag from './controllers/Tag.js'
import Product from './controllers/Product.js'
import Sidebar from './controllers/Sidebar.js'
import Search from './controllers/Search.js'

const router = new Router()


router.get('/sidebar/*', Sidebar.getSidebarData)
router.get('/search/*', Search.getProducts)

router.post('/users', Admin.create)
router.get('/users', Admin.getAll)
router.get('/users/*', Admin.getFromParams)
router.get('/users/:id', Admin.getOne)
router.put('/users/:id', Admin.update)
router.delete('/users/:id', Admin.delete)

router.post('/types', Type.create)
router.get('/types', Type.getAll)
router.get('/types/*', Type.getFromParams)
router.get('/types/:id', Type.getOne)
router.put('/types/:id', Type.update)
router.delete('/types/:id', Type.delete)

router.post('/tags', Tag.create)
router.get('/tags', Tag.getAll)
router.get('/tags/*', Tag.getFromParams)
router.get('/tags/:id', Tag.getOne)
router.put('/tags/:id', Tag.update)
router.delete('/tags/:id', Tag.delete)

router.post('/products', Product.create)
router.get('/products', Product.getAll)
router.get('/products/*', Product.getFromParams)
router.get('/products/slug/:id', Product.getOneFromSlug)
router.get('/products/:id', Product.getOne)
router.put('/products/:id', Product.update)
router.delete('/products/:id', Product.delete)



export default router;