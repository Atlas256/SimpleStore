import mongoose from 'mongoose'


const Admin = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
})


export default mongoose.model('Admin', Admin)

/*
{
    "name": "Admin_1",
    "email": "test@gmail.com",
    "pass": "test123"
}
*/