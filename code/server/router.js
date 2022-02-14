import Router from 'express'
import Admin from './controllers/Admin.js'
import Type from './controllers/Type.js'
import Tag from './controllers/Tag.js'
import Product from './controllers/Product.js'
import Sidebar from './controllers/Sidebar.js'
import Search from './controllers/Search.js'
import { body } from 'express-validator';


const router = new Router()


router.get('/sidebar/*', Sidebar.getSidebarData)
router.get('/search/*', Search.getProducts)

router.post('/users',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({
    min: 6
  }), 
  Admin.create)

router.get('/users', Admin.getAll)
router.get('/users/*', Admin.getFromParams)
router.get('/users/id/:id', Admin.getOne)
router.put('/users/id/:id', Admin.update)
router.delete('/users/id/:id', Admin.delete)

router.post('/types', Type.create)
router.get('/types', Type.getAll)
router.get('/types/*', Type.getFromParams)
router.get('/types/id/:id', Type.getOne)
router.put('/types/id/:id', Type.update)
router.delete('/types/id/:id', Type.delete)

router.post('/tags', Tag.create)
router.get('/tags', Tag.getAll)
router.get('/tags/*', Tag.getFromParams)
router.get('/tags/id/:id', Tag.getOne)
router.put('/tags/id/:id', Tag.update)
router.delete('/tags/id/:id', Tag.delete)


router.get('/products/slug/:id', Product.getOneFromSlug)
router.get('/products/id/:id', Product.getOne)
router.put('/products/id/:id', Product.update)
router.delete('/products/id/:id', Product.delete)
router.post('/products', Product.create)
router.get('/products', Product.getAll)
router.get('/products/*', Product.getFromParams)




export default router;