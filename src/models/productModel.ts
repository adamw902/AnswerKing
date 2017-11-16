import * as Backbone from "backbone";
import * as _ from "underscore";

export class ProductModel extends Backbone.Model{
    errors;

    constructor(options?: any){
        options = options || {};
        super(options);
        this.urlRoot = "http://localhost:8888/item";
    }

    validate(attributes, options){
        this.errors = {};

        if(!attributes.name){
            this.errors.name = "Product Name is required!";
        }
        if(!attributes.price){
            this.errors.price = "Price is required!";
        }
        else if(attributes.price === 0){
            this.errors.price = "Price must be greater than zero!";
        }
        if (!_.isEmpty(this.errors)){
            return this.errors;
        }
    }

    get id(){
        return this.get("id");
    }

    get name(){
        return this.get("name");
    }

    get price(){
        return this.get("price");
    }

    get categoryId(){
        return this.get("category").id;
    }

    get category(){
        return this.get("category");
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