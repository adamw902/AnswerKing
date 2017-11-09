import * as Backbone from "backbone";

export class ProductModel extends Backbone.Model{
    constructor(options?: any){
        options = options || {};
        super(options);
        this.urlRoot = "http://localhost:8888/item";
    }
}

export class ProductCollection extends Backbone.Collection<ProductModel>{
    constructor(options?: any){
        options = options || {};
        super(options);
        this.model = ProductModel;
        this.url = "http://localhost:8888/item"
    }
}