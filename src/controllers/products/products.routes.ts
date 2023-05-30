import express from 'express';
const productRouter = express.Router();
import path from 'path';

const { 
    addProduct, 
    getProducts, 
    deleteProduct, 
    updateProduct, 
    multer
} = require('./products');

const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
      cb(null, 'uploads')
    },
    filename: function (req:any, file:any, cb:any) {
      cb(null,Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

productRouter.post('/api/product', upload.single('image'), addProduct);
productRouter.get('/api/products', getProducts);
productRouter.delete('/api/product/:id', deleteProduct);
productRouter.put('/api/product/:id', updateProduct);


export default productRouter;