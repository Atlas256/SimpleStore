import { v4 as uuidv4 } from 'uuid';
import path from 'path'

export function uploadImage(req) {
  try {
    const { image } = req.files
    let fileName = uuidv4() + ".jpg"
    image.mv(path.resolve('./', 'static', fileName))

    return fileName
  } catch (error) {
    return error 
  }
}
