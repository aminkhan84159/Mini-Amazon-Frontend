export interface IProduct {
    productId : number;
    title : string;
    brand : string;
    category : string;
    price : number;
    rating : number;

    images : Blob[];
}