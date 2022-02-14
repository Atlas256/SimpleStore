import { check } from 'express-validator';


export default check('password').isStrongPassword({
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1
})
.withMessage('minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbol: 1')