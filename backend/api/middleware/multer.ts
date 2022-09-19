import multer from 'multer'

const storageVar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    const fileName = `${req.user.sub.replace('|', '-')}-${req.body.typeOfFile}.jpeg}`
    cb(null, fileName)
  },
})
const upload = multer({ storage: storageVar })

export default upload
