import { Product } from "./model/product.model.js";
import { Category } from "./model/category.model.js";
import { Cart } from "./model/cart.model.js";

const category = new Category(1,"Instrumento")
const product = new Product(1, 'Guitarra', 3, 'asdjaskdj', category)
const product2 = new Product(2, 'Violao', 2, 'asdjaskdj', category)
const cart = new Cart()

cart.addItem(product, 3)
cart.addItem(product2, 2)
console.log(cart.cartItens)
console.log(cart.getTotalItems())
console.log(cart.getFinalPrice())
