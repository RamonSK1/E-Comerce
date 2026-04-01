import type { Category } from "./category.model.js";

export class Product{
    constructor(public id:number, public name:string, public price:number, public img: string, public category:Category){

    }
}