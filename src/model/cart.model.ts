import { Product } from "./product.model.js";

export interface listProduct{
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

    removeItem(product: Product){
        this.cartItens = this.cartItens.filter(
            item => item.product.id !== product.id
        )
    }

    decrementItem(product: Product){
        const item = this.cartItens.find(
            item => item.product.id === product.id
        )
        if(!item) return
        if (item.quantity > 1){
            item.quantity--
        } else {
            this.removeItem(product)
        }
    }

    getTotalItems(){
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