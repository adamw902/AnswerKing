
import * as Backbone from "backbone";
import * as Marionette from "backbone.marionette";
import * as Radio from "backbone.radio";
import TemplateLoader from "../../utilities/templateLoader";
import NotificationService from "../../services/notificationService";
import ProductService from "../../services/productService";
import CategoryService from "../../services/categoryService";
import {RouterService} from "../../services/routerService";
import {CategoryCollection, CategoryModel} from "../../models/categoryModel";
import {ProductCollection, ProductModel} from "../../models/productModel";
import {ConfirmDeleteView} from "../../components/confirmDeleteView";
import {LoadingView} from "../../components/loadingView";
import {ProductsGridView} from "../products/productsGridView";
import {EditProductItemView} from "../products/editProductItemView";
import {ProductCategoryItemView} from "../productCategories/productCategoryItemView";
import {ProductFormItemView} from "./productFormItemView";

export class ManageProductsLayoutView extends Marionette.LayoutView<Backbone.Model>{
    categories: CategoryCollection;
    products: ProductCollection;
    currentCategory: CategoryModel;
    product: ProductModel;

    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/products/manageProductsLayoutView");
        options.regions = {
            productsRegion: "#productsRegion",
            modalRegion: "#modalRegion"
        };

        options.events = {
            "click button.js-back": "backToCategories",
            "click button.js-add": "addProduct"
        };

        super(options);

        this.ui = {
            addProductButton: "#addProductButton",
            backButton: "#backButton",
            categoryLabel: "#categoryLabel"
        }

        this.handleNotifications();
    }

    onShow(){
        this.loadCategories();
    }

    handleNotifications(){
        this.listenTo(Radio.channel(NotificationService.channelNames.categories), NotificationService.actions.showCategories, this.loadCategories)
        this.listenTo(Radio.channel(NotificationService.channelNames.categories), NotificationService.actions.categoriesLoaded, this.showCategories);
        this.listenTo(Radio.channel(NotificationService.channelNames.categories), NotificationService.actions.categorySelected, this.loadProducts);
        this.listenTo(Radio.channel(NotificationService.channelNames.products), NotificationService.actions.productsLoaded, this.showProducts);
        this.listenTo(Radio.channel(NotificationService.channelNames.products), NotificationService.actions.editProduct, this.editProduct);
        this.listenTo(Radio.channel(NotificationService.channelNames.products), NotificationService.actions.productLoaded, this.showProductFormModal);
        this.listenTo(Radio.channel(NotificationService.channelNames.products), NotificationService.actions.closeModal, this.closeModal);
        this.listenTo(Radio.channel(NotificationService.channelNames.products), NotificationService.actions.productSaved, this.loadProducts);
        this.listenTo(Radio.channel(NotificationService.channelNames.products), NotificationService.actions.deleteModel, this.showConfirmDeleteModal);
        this.listenTo(Radio.channel(NotificationService.channelNames.products), NotificationService.actions.deleteConfirmed, this.deleteProduct);
        this.listenTo(Radio.channel(NotificationService.channelNames.products), NotificationService.actions.productDeleted, this.loadProducts);
    }

    showLoadingView(region: Marionette.Region){
        let loadingView = new LoadingView();
        region.show(loadingView);
    }

    backToCategories(){
        this.ui.addProductButton.toggleClass("hidden");
        this.ui.backButton.toggleClass("hidden");
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

    loadProducts(categoryId?: Number){
        this.showLoadingView(this.getRegion("productsRegion"));
        if (categoryId){
            this.currentCategory = this.categories.get(`${categoryId}`);
        }
        this.products = new ProductService().getAll(this.currentCategory.id);
    }

    showProducts(){
        let productsGridView = new ProductsGridView({
            collection: this.products,
            childView: EditProductItemView
        });
        if (this.ui.addProductButton.hasClass("hidden")){
            this.ui.addProductButton.toggleClass("hidden");
            this.ui.categoryLabel.prop("innerText", this.currentCategory.description);
        }
        if (this.ui.backButton.hasClass("hidden")){
            this.ui.backButton.toggleClass("hidden");
        }
        let region = this.getRegion("productsRegion");
        region.show(productsGridView);
    }

    addProduct(){
        this.product = new ProductModel({category: this.currentCategory});
        this.showProductFormModal();
    }

    editProduct(productId: Number){
        this.product = new ProductService().getOne(productId);
    }

    deleteProduct(productId: Number){
        new ProductService().delete(productId);
        this.closeModal();
    }

    showProductFormModal(){
        let productFormItemView = new ProductFormItemView({
            model: this.product
        });
        let region = this.getRegion("modalRegion");
        region.show(productFormItemView);
    }

    showConfirmDeleteModal(productId: Number){
        let deleteModel = new Backbone.Model(
            {
                id: productId, 
                modelType: this.currentCategory.description, 
                modelName: this.products.get(`${productId}`).name, 
                channel: NotificationService.channelNames.products
            });
        let confirmDeleteView = new ConfirmDeleteView({
            model: deleteModel
        });
        let region = this.getRegion("modalRegion");
        region.show(confirmDeleteView);
    }

    closeModal(){
        let region = this.getRegion("modalRegion");
        region.empty();
    }
}