import Router from 'express'
import Admin from './controllers/Admin.js'
import Type from './controllers/Type.js'
import Tag from './controllers/Tag.js'
import Product from './controllers/Product.js'
import Sidebar from './controllers/Sidebar.js'
import Search from './controllers/Search.js'
import { body } from 'express-validator';
import emailValidator from './validators/emailValidator.js'
import passwordValidator from './validators/passwordValidator.js'



const router = new Router()

//! OTHERS
router.get('/sidebar/*', Sidebar.getSidebarData)
router.get('/search/*', Search.getProducts)

//! USERS
router.post('/users',
  emailValidator,
  passwordValidator,
  Admin.create)
router.put('/users/id/:id',
  emailValidator,
  passwordValidator,
  Admin.update)
router.get('/users', Admin.getAll)
router.get('/users/*', Admin.getFromParams)
router.get('/users/id/:id', Admin.getOne)
router.delete('/users/id/:id', Admin.delete)

//! TYPES
router.post('/types', Type.create)
router.get('/types', Type.getAll)
router.get('/types/*', Type.getFromParams)
router.get('/types/id/:id', Type.getOne)
router.put('/types/id/:id', Type.update)
router.delete('/types/id/:id', Type.delete)

//! TAGS
router.post('/tags', Tag.create)
router.get('/tags', Tag.getAll)
router.get('/tags/*', Tag.getFromParams)
router.get('/tags/id/:id', Tag.getOne)
router.put('/tags/id/:id', Tag.update)
router.delete('/tags/id/:id', Tag.delete)

//! PRODUCTS
router.get('/products/slug/:id', Product.getOneFromSlug)
router.get('/products/id/:id', Product.getOne)
router.put('/products/id/:id', Product.update)
router.delete('/products/id/:id', Product.delete)
router.post('/products', Product.create)
router.get('/products', Product.getAll)
router.get('/products/*', Product.getFromParams)




export default router;