const express = require('express');
const ProductsService = require('../services/products.services.js')

const productsRouter = express.Router();
const productsService = new ProductsService();

productsRouter.get('/',(req, res)=>{
  try{
    const { size } = req.query;
    const results = productsService.find(size);
    res.status(200).json({
      results
    });
  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
})

productsRouter.get('/:id',(req, res)=>{
  try{
    const { id } = req.params
    const result = productsService.findOne(id);
    res.status(200).json(result);
  }catch(e){
    const statusCode = e.message === 'Product not found' ? 404 : 500;
    res.status(statusCode).json({
      message: e.message
    })
  }
})

productsRouter.post('/',(req, res)=>{
  try{
    const body = req.body;
    const result = productsService.create(body);
    res.status(201).json(result);
  }catch(e){
    res.status(500).json({
      message: e.message
    })
  }
})

productsRouter.put('/:id', (req, res) => {
  update(req, res);
})

productsRouter.patch('/:id',(req, res)=>{
  update(req, res);
})

const update = (req, res) => {
  try{
    const { id } = req.params;
    const { name, price, image } = req.body;
    const toChange = {
      id: id,
      name: name,
      price: price,
      image: image
    };
    const result = productsService.update(toChange);
    res.status(202).json(result);
  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
}

productsRouter.delete('/:id',(req, res)=>{
  try{
    const { id } = req.params;
    const product = productsService.findOne(id);
    productsService.delete(product);
    res.status(200).json({
      message: "Product deleted successfully"
    })
  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
})

module.exports = productsRouter;
