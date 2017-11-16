import {ProductCollection, ProductModel} from "../models/productModel";
import NotificationService from "./notificationService";

export default class ProductService{
    getAll(categoryId: Number){
        let products = new ProductCollection();
        products.fetch({
            data: $.param({categoryId:categoryId}),
            success: function(result){
                new NotificationService().productsLoaded();
            }
        });
        return products;
    }

    getOne(productId: Number){
        let product = new ProductModel({
            id: productId
        });
        product.fetch({
            success: function(result){
                new NotificationService().productLoaded();
            }
        });
        return product;
    }

    save(product: ProductModel){
        product.save(product.attributes, {
            success: function(result){
                new NotificationService().productSaved();
            }
        });
        return product;
    }

    delete(productId: Number){
        let product = new ProductModel({
            id: productId
        });
        product.destroy({
            success: function(result){
                new NotificationService().productDeleted();
            }
        });
    }
}