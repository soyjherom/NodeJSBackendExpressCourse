const fakerJs = require('@faker-js/faker');
const express = require('express');

const productsRouter = express.Router();

productsRouter.get('/',(req, res)=>{
  const { size } = req.query;
  const limit = size ? parseInt(size) : 100
  const products = [];
  for(let i = 0; i < parseInt(limit); i++){
    products.push({
      name: fakerJs.faker.commerce.product(),
      price: parseInt(fakerJs.faker.commerce.price(), 10),
      image: fakerJs.faker.image.imageUrl(),
    });
  }
  res.send(products)
})

productsRouter.get('/filter',(req, res)=>{
  res.send('A filter route')
})

productsRouter.get('/:id',(req, res)=>{
  const { id } = req.params
  const products = [
    {id:'0001', name:'Product 1', price: 1000},
    {id:'0002', name:'Product 2', price: 2000},
    {id:'0003', name:'Product 3', price: 3000},
  ];
  const product = products.filter(p => {
    if(id === p.id) return p
  })
  res.json(product)
})

productsRouter.post('/',(req, res)=>{
  const body = req.body;
  res.json({
    message: 'created',
    data: body
  });
})

productsRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const products = [
    {id:'0001', name:'Product 1', price: 1000},
    {id:'0002', name:'Product 2', price: 2000},
    {id:'0003', name:'Product 3', price: 3000},
  ];
  products.forEach(p => {
    if(p.id === id){
      p.name = name,
      p.price = price
    }
  })
  const product = products.filter(p => {
    if(id === p.id) return p;
  })
  res.json(product)
})

productsRouter.patch('/:id',(req, res)=>{
  const { id } = req.params;
  const { name, price } = req.body;
  const products = [
    {id:'0001', name:'Product 1', price: 1000},
    {id:'0002', name:'Product 2', price: 2000},
    {id:'0003', name:'Product 3', price: 3000},
  ];
  products.forEach(p => {
    if(p.id === id){
      p.name = name ? name : p.name,
      p.price = price ? price : p.price
    }
  })
  const product = products.filter(p => {
    if(id === p.id) return p;
  })
  res.json(product)
})

productsRouter.delete('/:id',(req, res)=>{
  const { id } = req.params
  const products = [
    {id:'0001', name:'Product 1', price: 1000},
    {id:'0002', name:'Product 2', price: 2000},
    {id:'0003', name:'Product 3', price: 3000},
  ];
  const isFound = products.findIndex(p=>{
    if(p.id===id)return true
  }) >= 0;
  if(!isFound){
   res.status(404).json({
    message: "Product not found"
   })
   res.end()
  }
  const filteredProducts = products
    .filter(p => {
      if(id !== p.id) return p
    })
  res.status(200).json(filteredProducts)
})

module.exports = productsRouter;
