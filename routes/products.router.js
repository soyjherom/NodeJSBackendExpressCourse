const express = require('express');
const ProductsService = require('../services/products.services.js')

const productsRouter = express.Router();
const productsService = new ProductsService();

productsRouter.get('/',async (req, res)=>{
  const { size } = req.query;
  await productsService.find(size)
  .then(results=>res.status(200).json(results))
  .catch(errorMessage => {
    const statusCode = errorMessage === 'Not Found' ? 404 : 500;
    res.status(statusCode).json({
      message: errorMessage
    });
  });
})

productsRouter.get('/:id', async (req, res)=>{
  const { id } = req.params;
  await productsService.findOne(id)
  .then(result => res.status(200).json(result))
  .catch(eMessage => {
    const statusCode = eMessage === 'Not Found' ? 404 : 500;
    res.status(statusCode).json({
      message: eMessage
    })
  });
})

productsRouter.post('/', async (req, res)=>{
  const body = req.body;
  await productsService.create(body)
  .then(result=>res.status(201).json(result))
  .catch(eMessage=>{
    res.status(500).json({
      message: eMessage
    });
  });
})

productsRouter.put('/:id', async (req, res) => {
  await update(req, res);
})

productsRouter.patch('/:id', async (req, res)=>{
  await update(req, res);
})

const update = async (req, res) => {
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
  .catch(eMessage=>{
    const statusCode = eMessage === 'Not Found' ? 404 : 500;
    res.status(statusCode).json({
      message: eMessage
    })
  });
}

productsRouter.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  await productsService.delete(id)
  .then(message=>res.status(200).json(message))
  .catch(eMessage=>{
    const statusCode = eMessage === 'Not Found' ? 404 : 500;
    res.status(statusCode).json({
      message: eMessage
    })
  });
})

module.exports = productsRouter;
