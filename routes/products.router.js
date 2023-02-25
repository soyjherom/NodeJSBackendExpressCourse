const express = require('express');
const ProductsService = require('../services/products.services.js');

const productsRouter = express.Router();
const productsService = new ProductsService();

productsRouter.get('/',async (req, res, next)=>{
  const { size } = req.query;
  await productsService.find(size)
  .then(results=>res.status(200).json(results))
  .catch(eMessage => {
    next(eMessage)
  });
})

productsRouter.get('/:id', async (req, res, next)=>{
  const { id } = req.params;
  await productsService.findOne(id)
  .then(result => res.status(200).json(result))
  .catch(eMessage => {
    next(eMessage)
  });
})

productsRouter.post('/', async (req, res, next)=>{
  const body = req.body;
  await productsService.create(body)
  .then(result=>res.status(201).json(result))
  .catch(eMessage => {
    next(eMessage)
  });
})

productsRouter.put('/:id', async (req, res, next) => {
  await update(req, res, next);
})

productsRouter.patch('/:id', async (req, res, next)=>{
  await update(req, res, next);
})

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  const toChange = {
    id: id,
    name: name,
    price: price,
    image: image
  };
  await productsService.update(toChange)
  .then(result=>res.status(202).json(result))
  .catch(eMessage => {
    next(eMessage)
  });
}

productsRouter.delete('/:id', async (req, res, next)=>{
  const { id } = req.params;
  await productsService.delete(id)
  .then(message=>res.status(200).json(message))
  .catch(eMessage => {
    next(eMessage)
  });
})

module.exports = productsRouter;
