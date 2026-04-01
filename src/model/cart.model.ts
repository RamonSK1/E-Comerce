import { Product } from "./product.model.js";

interface listProduct{
    product: Product,
    quantity: number
}

export class Cart{
    constructor(
        public cartItens: listProduct[]=[]
    ){}

    addItem(product:Product, quantity:number){
       const itemExiste  = this.cartItens.some(item => item.product.id === product.id)
       if (itemExiste){
        const newItem = this.cartItens.find(item => item.product.id === product.id)
        if (newItem){
            newItem.quantity += quantity
        }
        return newItem
       }else{
        const newItem = {
            product: product,
            quantity: quantity
        }
        this.cartItens.push(newItem)
       }
        
    }

    getTotalItens(){
        return this.cartItens.reduce((quantia, item)=>{
            return quantia + item.quantity
        }, 0)
    }

    getFinalPrice(){
        return this.cartItens.reduce((quantia, item)=>{
            return quantia + (item.product.price * item.quantity)
        }, 0)
    }
}