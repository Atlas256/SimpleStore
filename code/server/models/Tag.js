import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId;


const Tag = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  typeID: { type: ObjectId, required: true }
})


export default mongoose.model('Tag', Tag)