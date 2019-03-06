export class Product{
    public id: number;
    public name: string;
    public price: number;
    public size: any;
    public qty: number;
    public getQty: number;
    public totalItemPrice: number;
    public totalPrice: number;
    public imagePath: string;
    public getUpdatedTotalPrice: number;
    public getProductList: number;


constructor(
    id: number,name: string,getUpdatedTotalPrice:number,price: number,getProductList:any,size: any,qty: number, getQty: number,totalItemPrice: number,totalPrice: number,imagePath: string
    )
    {
        this.id = id;
        this.name = name;
        this.price = price;
        this.size = size;
        this.qty = qty;
        this.getQty = getQty;
        this.totalItemPrice = totalItemPrice;
        this.getUpdatedTotalPrice = getUpdatedTotalPrice;
        this.totalPrice = totalPrice;
        this.imagePath = imagePath;
        this.getProductList = getProductList;
    }
}