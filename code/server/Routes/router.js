import Router from 'express'
import Admin from '../controllers/Admin.js'
import Type from '../controllers/Type.js'
import Tag from '../controllers/Tag.js'
import Product from '../controllers/Product.js'
import Sidebar from '../controllers/Sidebar.js'

import emailValidator from '../validators/emailValidator.js'
import passwordValidator from '../validators/passwordValidator.js'
import errorMiddlevare from '../validators/errorMiddlevare.js'


//TODO   PATH VALIDATION MIDDLEVARE ERROR CONTROLLER
//?      const A = undefined.field;



const router = new Router()

//! OTHERS
router.get('/sidebar/*', Sidebar.getSidebarData)

//! USERS
router.post('/users',
  emailValidator,
  passwordValidator,
  errorMiddlevare,
  Admin.create)
router.put('/users/id/:id',
  emailValidator,
  passwordValidator,
  errorMiddlevare,
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
router.get('/tags/id/:id', Tag.getOne)
router.put('/tags/id/:id', Tag.update)
router.delete('/tags/id/:id', Tag.delete)
router.post('/tags', Tag.create)
router.get('/tags', Tag.getAll)
router.get('/tags/*', Tag.getFromParams)

//! PRODUCTS
router.get('/products/slug/:id', Product.getOneFromSlug)
router.get('/products/id/:id', Product.getOne)
router.put('/products/id/:id', Product.update)
router.delete('/products/id/:id', Product.delete)
router.post('/products', Product.create)
router.get('/products', Product.getAll)
router.get('/products/*', Product.getFromParams)




export default router;