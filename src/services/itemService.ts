import {ProductCollection, ProductModel} from "../models/productModel";
import NotificationService from "./notificationService";

export default class ItemService{
    getAll(){
        var items = new ProductCollection();
        items.fetch({
            success: function(result){
                new NotificationService().productsLoaded(result);
            }
        });
    }
}