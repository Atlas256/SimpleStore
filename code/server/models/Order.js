import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId;


const Order = new mongoose.Schema({
  prodItems: [{
    id: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  orderDate: { type: Date, required: true },
  deliveryAddress: { type: String, required: true },
  AdminEmail: { type: String, required: true },
  AdminName: { type: String, required: true },
  AdminPhone: { type: String, required: true },
  isPay: { type: Boolean, required: true },
  totalPrice: { type: Number, required: true }
})


export default mongoose.model('Order', Order)

/*
{
  "prodItems": [{
    "id": "1",
    "quantity": 2,
    "price": 200
  }],
  "orderDate": "25.01.22",
  "deliveryAddress": "st. Borova, 75b",
  "AdminEmail": "test@gmail.com",
  "AdminName": "Admin",
  "AdminPhone": "+380988757527",
  "isPay": true,
  "totalPrice": 200
}
*/