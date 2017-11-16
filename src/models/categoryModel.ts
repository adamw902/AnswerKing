import * as Backbone from "backbone";

export class CategoryModel extends Backbone.Model{
    constructor(options?: any){
        options = options || {};
        super(options);
        this.urlRoot = "http://localhost:8888/category";
    }

    get id(){
        return this.get("id");
    }

    get description(){
        return this.get("description");
    }
}

export class CategoryCollection extends Backbone.Collection<CategoryModel>{
    constructor(options?: any){
        options = options || {};
        super(options);
        this.model = CategoryModel;
        this.url = "http://localhost:8888/category";
    }
}