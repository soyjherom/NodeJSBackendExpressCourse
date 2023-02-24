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

  async create (product) {
    return new Promise((resolve, reject) => {
      try{
        setTimeout(()=>{
          this.products.push(product);
          resolve(this.findOne(product.id));
        },1000);
      }catch(e){
        reject(e.message);
      }
    })
  }

  async find (size) {
    return new Promise((resolve, reject)=>{
      try{
        setTimeout(()=>{
          let counter = 0
          const limit = size ? parseInt(size) : 100
          const results = this.products.filter(p=>{
            if(counter < limit) {
              counter++;
              return p;
            }
          });
          resolve(results);
        },2000);
      }catch(e){
        reject(e.message)
      }
    });
  }

  async findOne (id) {
    return new Promise((resolve, reject)=>{
      try{
        const index = this.products.findIndex(p=>p.id===id);
        if(index<0) reject('Not Found');
        setTimeout(()=>{
          const result = this.products.filter(p => {
            if(id === p.id) return p;
          })
          resolve(result);
        },1000);
      }catch(e){
        reject(e.message);
      }
    })
  }

  async update (product) {
    return new Promise((resolve, reject)=>{
      try{
        const index = this.products.findIndex(p=>p.id===product.id);
        if(index < 0) reject('Not Found');
        setTimeout(()=>{
          this.products.map(p=>{
            if(p.id === product.id){
              p.name = product.name ? product.name : p.name;
              p.price = product.price ? product.price : p.price;
              p.image = product.image ? product.image : p.image;
            }
          })
          resolve(this.products.filter(p=>{
            if(p.id === product.id) return p;
          }));
        },1000);
      }catch(e){
        reject(e.message)
      }
    })
  }

  async delete (id) {
    return new Promise((resolve, reject)=>{
      try{
        const index = this.products.findIndex(p=>p.id===id);
        if(index < 0) reject('Not Found');
        setTimeout(()=>{
          this.products = this.products.splice(index, 1);
          resolve('Product deleted successfully');
        },1000);
      }catch(e){
        reject(e.message)
      }
    })
  }

}

module.exports = ProductServices;
