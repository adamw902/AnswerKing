import * as Backbone from "backbone";
import NotificationService from "./notificationService";
import {CategoryModel, CategoryCollection} from "../models/categoryModel";

export default class CategoryService{
    getAll(){
        let categories = new CategoryCollection();
        categories.fetch({
            success: function(response){
                new NotificationService().categoriesLoaded();
            }
        });
        return categories;
    }
}