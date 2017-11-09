import * as Backbone from "backbone";

export class ReceiptModel extends Backbone.Model{
    constructor(options?: any){
        options = options || {};
        super(options);
    }
}