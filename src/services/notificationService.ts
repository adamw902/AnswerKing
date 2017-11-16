import * as Radio from "backbone.radio";
import {CategoryModel} from "../models/categoryModel";

export default class NotificationService{
    static channelNames = {
        "orders": "notifications::orders",
        "products": "notifications::products",
        "categories": "notifications::categories"
    };

    static actions = {
        ordersLoaded: "orders:loaded",
        orderLoaded: "order:loaded",
        orderCreated: "order:created",
        orderUpdated: "order:updated",
        addItemToOrder: "order:item:add",
        itemAdded: "order:item:added",
        productsLoaded: "products:loaded",
        productLoaded: "product:loaded",
        productSaved: "product:saved",
        productDeleted: "product:deleted",
        showCategories: "categories:show",
        categorySelected: "category:selected",
        categoriesLoaded: "categories:loaded",
        addProduct: "product:add",
        editProduct: "product:edit",
        closeModal: "modal:close",
        deleteModel: "model:delete",
        deleteConfirmed: "delete:confirmed"
    };

    ordersLoaded(){
         Radio.channel(NotificationService.channelNames.orders).trigger(NotificationService.actions.ordersLoaded);
    }

    orderLoaded(){
        Radio.channel(NotificationService.channelNames.orders).trigger(NotificationService.actions.orderLoaded);
    }

    orderCreated(orderId: Number){
        Radio.channel(NotificationService.channelNames.orders).trigger(NotificationService.actions.orderCreated, orderId);
    }

    productsLoaded(){
        Radio.channel(NotificationService.channelNames.products).trigger(NotificationService.actions.productsLoaded);
    }

    productLoaded(){
        Radio.channel(NotificationService.channelNames.products).trigger(NotificationService.actions.productLoaded);
    }

    productSaved(){
        Radio.channel(NotificationService.channelNames.products).trigger(NotificationService.actions.productSaved);
    }

    productDeleted(){
        Radio.channel(NotificationService.channelNames.products).trigger(NotificationService.actions.productDeleted);
    }

    addItemToOrder(itemId: Number){
        Radio.channel(NotificationService.channelNames.orders).trigger(NotificationService.actions.addItemToOrder, itemId);
    }

    itemAdded(itemId: Number){
        Radio.channel(NotificationService.channelNames.orders).trigger(NotificationService.actions.itemAdded, itemId);
    }

    orderUpdated(){
        Radio.channel(NotificationService.channelNames.orders).trigger(NotificationService.actions.orderUpdated);
    }

    showCategories(){
        Radio.channel(NotificationService.channelNames.categories).trigger(NotificationService.actions.showCategories);
    }

    categorySelected(categoryId: Number){
        Radio.channel(NotificationService.channelNames.categories).trigger(NotificationService.actions.categorySelected, categoryId);
    }

    categoriesLoaded(){
        Radio.channel(NotificationService.channelNames.categories).trigger(NotificationService.actions.categoriesLoaded);
    }

    addProduct(categoryId: Number){
        Radio.channel(NotificationService.channelNames.products).trigger(NotificationService.actions.addProduct, categoryId);
    }

    editProduct(productId: Number){
        Radio.channel(NotificationService.channelNames.products).trigger(NotificationService.actions.editProduct, productId);
    }

    closeModal(channel: string){
        Radio.channel(channel).trigger(NotificationService.actions.closeModal);
    }

    deleteModel(channel: string, modelId: Number){
        Radio.channel(channel).trigger(NotificationService.actions.deleteModel, modelId);
    }

    deleteConfirmed(channel, modelId: Number){
        Radio.channel(channel).trigger(NotificationService.actions.deleteConfirmed, modelId);
    }
}