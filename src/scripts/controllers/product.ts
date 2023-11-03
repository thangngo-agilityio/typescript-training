import { TOGGLE_STATUS } from "@/constants/common";
import { handleToggleLoading } from "@/helpers/toggle";
import ProductModel from "@/models/product";
import { Product } from "@/types/product";
import ProductView from "@/views/product";

export default class ProductController {
  model: ProductModel
  view: ProductView
  constructor(model: ProductModel, view: ProductView) {
    this.model = model;
    this.view = view;
    this.init()
  }

  init = async (): Promise<void> => {
    await this.showProduct()
    this.view.bindAddProduct(this.addProduct)
    this.view.bindDelProduct(this.delProduct)
  }

  showProduct = async (query?: string): Promise<void> => {
    handleToggleLoading(TOGGLE_STATUS.isShown);
    const data = await this.model.getProduct(query);
    this.view.bindManageEvent()
    this.view.displayProduct(data);
    handleToggleLoading(TOGGLE_STATUS.isHidden);
  }

  addProduct = async (data: Product): Promise<void> => {
    handleToggleLoading(TOGGLE_STATUS.isShown);
    await this.model.handleAddProduct(data);
    this.showProduct()
    handleToggleLoading(TOGGLE_STATUS.isHidden);
  }

  delProduct = async (id: string): Promise<void> => {
    await this.model.handleDelProduct(id);
    this.showProduct()
  }
}
