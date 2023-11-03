import ProductModel from "@/models/product";
import ProductView from "@/views/product";

export default class ProductController {
  model: ProductModel
  view: ProductView
  constructor(model: ProductModel, view: ProductView) {
    this.model = model;
    this.view = view
  }
}
