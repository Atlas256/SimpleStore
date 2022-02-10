import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId;


const Product = new mongoose.Schema({
  tagsID: [ObjectId],
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  image: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  createdDate: { type: Date, required: true },
  updatedDate: { type: Date, required: true },
})


export default mongoose.model('Product', Product)


