const fakerJs = require('@faker-js/faker');
const { v4 } = require('uuid');
const uuidv4 = v4;

class ProductServices {

  constructor() {
    this.products = this.generate(100)
  }

  generate (size) {
    const limit = size ? size : 100
    const fakedProducts = [];
    for(let i = 0; i < parseInt(limit); i++){
      fakedProducts.push({
        id: uuidv4(),
        name: fakerJs.faker.commerce.product(),
        price: parseInt(fakerJs.faker.commerce.price(), 10),
        image: fakerJs.faker.image.imageUrl(),
      });
    }
    return fakedProducts;
  }

  create (product) {
    this.products.push(product);
    return this.findOne(product.id);
  }

  find (size) {
    let counter = 0
    const limit = size ? parseInt(size) : 100
    return this.products.filter(p=>{
      if(counter < limit) {
        counter++;
        return p;
      }
    });
  }

  findOne (id) {
    const index = this.products.findIndex(p=>p.id===id);
    if(index<0) throw new Error('Product not found');
    return this.products.filter(p => {
      if(id === p.id) return p;
    })
  }

  update (product) {
    this.products.map(p=>{
      if(p.id === product.id){
        p.name = product.name ? product.name : p.name;
        p.price = product.price ? product.price : p.price;
        p.image = product.image ? product.image : p.image;
      }
    })
    return this.products.filter(p=>{
      if(p.id === product.id) return p;
    })
  }

  delete (product) {
    const productIndex = this.products.findIndex(p=>p.id===product.id);
    this.products = this.products.splice(productIndex, 1);
  }
}

module.exports = ProductServices;
