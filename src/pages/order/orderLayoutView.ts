import * as Marionette from "backbone.marionette";
import * as Radio from "backbone.radio";
import TemplateLoader from "../../utilities/templateLoader";
import NotificationService from "../../services/notificationService";
import OrderService from "../../services/orderService";
import ProductService from "../../services/productService";
import CategoryService from "../../services/categoryService";
import {RouterService} from "../../services/routerService";
import {CategoryCollection, CategoryModel} from "../../models/categoryModel";
import {ProductCollection} from "../../models/productModel";
import {OrderModel} from "../../models/orderModel";
import {LoadingView} from "../../components/loadingView";
import {ProductsGridView} from "../products/productsGridView";
import {ProductItemView} from "../products/productItemView";
import {ProductCategoryItemView} from "../productCategories/productCategoryItemView";

export class OrderLayoutView extends Marionette.LayoutView<OrderModel>{
    reviewEnabled: boolean;
    order: OrderModel;
    categories: CategoryCollection;
    products: ProductCollection;

    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/order/orderLayoutView");
        options.className = "order-div";
        options.regions = {
            productsRegion: "#productsRegion"
        };

        options.events = {
            "click button.js-back": "backToCategories"
        };

        super(options);

        this.handleNotifications();
    }

    onShow(){
        this.checkOrderIsOpen();
    }

    handleNotifications(){
        this.listenTo(Radio.channel(NotificationService.channelNames.orders), NotificationService.actions.orderLoaded, this.loadCategoriesOrReview);
        this.listenTo(Radio.channel(NotificationService.channelNames.categories), NotificationService.actions.showCategories, this.loadCategories)
        this.listenTo(Radio.channel(NotificationService.channelNames.categories), NotificationService.actions.categoriesLoaded, this.showCategories);
        this.listenTo(Radio.channel(NotificationService.channelNames.categories), NotificationService.actions.categorySelected, this.loadProducts);
        this.listenTo(Radio.channel(NotificationService.channelNames.products), NotificationService.actions.productsLoaded, this.showProducts);
        this.listenTo(Radio.channel(NotificationService.channelNames.orders), NotificationService.actions.addItemToOrder, this.addItemToOrder);
    }

    showLoadingView(region: Marionette.Region){
        let loadingView = new LoadingView();
        region.show(loadingView);
    }

    checkOrderIsOpen(){
        this.order = new OrderService().getOne(this.model.id);
    }

    loadCategoriesOrReview(){
        if (!this.order.paid){
            this.loadCategories();
            if (this.order.orderItems.length > 0){
                this.$el.find("#reviewOrderButtonDiv").toggleClass("disabled");
                this.reviewEnabled = true;
            }
        }
        else {
            new RouterService().showOrderReview(this.model.id);
        }
    }

    backToCategories(){
        $("#backButton").toggleClass("hidden");
        this.loadCategories();
    }

    loadCategories(){
        this.showLoadingView(this.getRegion("productsRegion"));
        this.categories = new CategoryService().getAll();
    }

    showCategories(){
        let productsGridView = new ProductsGridView({
            collection: this.categories,
            childView: ProductCategoryItemView
        });
        let region = this.getRegion("productsRegion");
        region.show(productsGridView);
    }

    loadProducts(categoryId: Number){
        this.showLoadingView(this.getRegion("productsRegion"));
        this.products = new ProductService().getAll(categoryId);
    }

    showProducts(){
        let productsGridView = new ProductsGridView({
            collection: this.products,
            childView: ProductItemView
        });
        $("#backButton").toggleClass("hidden");
        let region = this.getRegion("productsRegion");
        region.show(productsGridView);
    }

    addItemToOrder(itemId: Number){
        new OrderService().addItem(this.model.id, itemId);
        if (!this.reviewEnabled){
            this.$el.find("#reviewOrderButtonDiv").toggleClass("disabled");
        }
    }
}