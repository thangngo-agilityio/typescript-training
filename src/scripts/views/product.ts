import { PRODUCT_MESSAGE } from "@/constants/message";
import { createElement, querySelector, querySelectorAll } from "@/helpers/doms";
import { getFormValues } from "@/helpers/formValue";
import { clearError, removeErrorMessage, showError } from "@/helpers/validators/formError";
import { validateForm } from "@/helpers/validators/validateForm";
import { Popup } from "@/templates/popup";
import { productTemplate } from "@/templates/productCard";
import { AddProduct, Product } from "@/types/product";

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

  /**
   * @description handler add product
   */
  handleAddProduct = async (handler: AddProduct) => {
    const formValues = getFormValues<Product>(this.modalForm);

    const errorMessage = validateForm(formValues);

    if (Object.keys(errorMessage).length !== 0) {
      showError(errorMessage);
      this.popup.error({
        message: PRODUCT_MESSAGE.ADD_FAILED,
      });
    } else {
      try {
        await handler(formValues);
        this.modalForm.reset();
        this.btnAdd.classList.add('hidden');
        this.modalMain.classList.add('hidden');
        this.popup.success({
          message: PRODUCT_MESSAGE.ADD_SUCCESS,
        });
      } catch (error) {
        return error;
      }
    }
  };

  bindAddProduct = (handler: AddProduct): void => {
    if (this.btnAdd) {
      this.btnAdd.addEventListener('click', (e) => {
        e.preventDefault();
        removeErrorMessage();
        this.handleAddProduct(handler);
      });
    }
  };

  bindManageEvent() {
    if (this.addProduct) {
      this.addProduct.addEventListener('click', () => {
        this.modalTitle.textContent = 'Create a new food';
        this.btnAdd.classList.remove('hidden');
        this.modalMain.classList.remove('hidden');
      });
    }

    if (this.confirmCancel) {
      this.confirmCancel.addEventListener('click', () => {
        this.modalDel.style.display = 'none';
        querySelector<HTMLButtonElement>('.btn-yes').remove();
      });
    }

    if (this.btnClose) {
      this.btnClose.addEventListener('click', () => {
        this.modalForm.reset();
        clearError();
        this.modalMain.classList.add('hidden');
        const btnEdit = querySelector<HTMLButtonElement>('.btn-edit-product');
        if (btnEdit) {
          btnEdit.remove();
        }
      });
    }
  }
}
