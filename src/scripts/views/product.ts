import { createElement, querySelector, querySelectorAll } from "@/helpers/doms";
import { Popup } from "@/templates/popup";
import { productTemplate } from "@/templates/productCard";
import { Product } from "@/types/product";

/**
 * @class ProductView
 *
 * Manages view data user
 */
export default class ProductView {
  private listProduct: HTMLDivElement;
  private addProduct: HTMLDivElement;
  private modalMain: HTMLDivElement;
  private modalForm: HTMLFormElement;
  private modalTitle: HTMLTitleElement;
  private modalDel: HTMLDivElement;
  private btnAdd: HTMLButtonElement;
  private btnClose: HTMLButtonElement;
  private confirmCancel: HTMLButtonElement;
  private nameElement: HTMLInputElement;
  private priceElement: HTMLInputElement;
  private imageElement: HTMLInputElement
  private quantityElement: HTMLInputElement;
  private inputAll: NodeListOf<HTMLInputElement>;
  private popup: Popup = new Popup()
  constructor() {
    this.listProduct = querySelector<HTMLDivElement>('#manage-list')
    this.addProduct = querySelector<HTMLDivElement>('#add-card');
    this.modalMain = querySelector<HTMLDivElement>('#modal-overlay');
    this.modalForm = querySelector<HTMLFormElement>('#modal-form');
    this.modalTitle = querySelector<HTMLTitleElement>('#modal-title');
    this.modalDel = querySelector<HTMLDivElement>('#modal-del');
    this.btnAdd = querySelector<HTMLButtonElement>('#btn-add');
    this.btnClose = querySelector<HTMLButtonElement>('#close-btn');
    this.confirmCancel = querySelector<HTMLButtonElement>('#btn-cancel');
    this.nameElement = querySelector<HTMLInputElement>('#name');
    this.priceElement = querySelector<HTMLInputElement>('#price');
    this.imageElement = querySelector<HTMLInputElement>('#image');
    this.quantityElement = querySelector<HTMLInputElement>('#quantity');
    this.inputAll = querySelectorAll('.form-input');
  }

  displayProduct(data: Product[]): void {
    if (this.listProduct && this.listProduct.lastElementChild !== null) {
      while (this.listProduct.lastElementChild.id !== 'add-card') {
        this.listProduct.removeChild(this.listProduct.lastElementChild);
      }
    }

    if (data.length > 0) {
      data.forEach((product) => {
        const divProduct = createElement('div');
        divProduct.setAttribute('class', 'product-card');
        divProduct.innerHTML = productTemplate(product);
        this.listProduct.append(divProduct);
      });
    } else {
      const emptyMessage = createElement('p');
      emptyMessage.setAttribute('class', 'empty-message')
      emptyMessage.innerHTML = `No food items available!!`
      this.listProduct.append(emptyMessage)
    }
  }
}
