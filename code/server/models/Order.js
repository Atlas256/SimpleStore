import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId;


const Order = new mongoose.Schema({
  prodItems: [{
    tagsID: [ObjectId],
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, required: true },
    updatedDate: { type: Date, required: true },
  }],

  userDate: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
  },

  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  status: { type: String, required: true }
})


export default mongoose.model('Order', Order)