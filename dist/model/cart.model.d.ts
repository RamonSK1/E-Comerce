import { Product } from "./product.model.js";
interface listProduct {
    product: Product;
    quantity: number;
}
export declare class Cart {
    cartItens: listProduct[];
    constructor(cartItens?: listProduct[]);
    addItem(product: Product, quantity: number): listProduct | undefined;
    getTotalItens(): number;
    getFinalPrice(): number;
}
export {};
//# sourceMappingURL=cart.model.d.ts.map