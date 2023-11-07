import { PRODUCT_MESSAGE } from "@/constants/message";
import { createElement, querySelector } from "@/helpers/doms";
import { getFormValues } from "@/helpers/formValue";
import { clearError, removeErrorMessage, showError } from "@/helpers/validators/formError";
import { validateForm } from "@/helpers/validators/validateForm";
import { Popup } from "@/templates/popup";
import { productTemplate } from "@/templates/productCard";
import { AddProduct, Product } from "@/types/product";
import { UpdateProduct } from '../types/product';
import { PopupStatus } from "@/types/popupStatus";
import { handleToggleLoading } from "@/helpers/toggle";
import { TOGGLE_STATUS } from "@/constants/common";
import { OrderByArray } from "@/helpers/sortValue";

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
  private popup: Popup = new Popup();
  updateProduct: UpdateProduct;
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
    this.updateProduct = null;
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
   * @description render product detail for edit card.
   */
  renderProductDetail(data: Product): void {
    this.modalMain.classList.remove('hidden');
    this.modalTitle.textContent = 'Edit';
    this.btnAdd.classList.add('hidden');
    const formBtn = querySelector<HTMLFormElement>('.form-btn');
    const btnEdit = createElement<HTMLButtonElement>('button');
    btnEdit.setAttribute('type', 'button');
    btnEdit.setAttribute('class', 'btn btn-edit-product');
    btnEdit.textContent = 'Save';

    formBtn.appendChild(btnEdit);

    this.nameElement.value = data.name || '';
    this.priceElement.value = data.price || '';
    this.imageElement.value = data.image || '';
    this.quantityElement.value = data.quantity || '';

    btnEdit.addEventListener('click', () => {
      if (data.name != this.nameElement.value || data.price != this.priceElement.value || data.image != this.imageElement.value || data.quantity != this.quantityElement.value) {
        removeErrorMessage();
        this.handleUpdateProduct(data.id);
      } else {
        btnEdit.setAttribute('disabled', '')
        this.modalMain.classList.add('hidden');
        this.modalForm.reset();
        btnEdit.remove();
        this.popup.error({message: PRODUCT_MESSAGE.EDIT_FAILED})
      }
    });
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

  handleDelProduct(handler: (id: string) => void): void {
    if (this.listProduct) {
      this.listProduct.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as Element;
        const btnDel = target.closest<HTMLButtonElement>('.btn-del');

        if (btnDel) {
          const productId = btnDel.dataset.id as string;
          this.modalDel.style.display = 'flex';
          const confirmBtn = querySelector<HTMLButtonElement>('.confirm-btn');
          const confirmYes = createElement<HTMLButtonElement>('button');
          confirmYes.setAttribute('class', 'btn btn-yes');
          confirmYes.textContent = 'Yes';
          confirmBtn.appendChild(confirmYes);

          confirmYes.addEventListener('click', () => {
            if (confirmYes) {
              handler(productId);
              this.modalDel.style.display = 'none';
              confirmYes.remove();
              this.popup.success({
                message: PRODUCT_MESSAGE.REMOVE_SUCCESS,
              });
            }
          });
        }
      });
    }
  }

  handleDetailProduct = (handler: (id: string) => void): void => {
    if (this.listProduct) {
      this.listProduct.addEventListener('click', async (e: MouseEvent) => {
        const target = e.target as Element;
        const btnEdit = target.closest<HTMLButtonElement>('.btn-edit');

        if (btnEdit) {
          const idProduct = btnEdit.dataset.id;
          idProduct && handler(idProduct);
        }
      });
    }
  }

  handleUpdateProduct = async (id: string): Promise<void> => {
    const formValues = getFormValues<Product>(this.modalForm);

    const errorMessage = validateForm(formValues);
    const btnEdit = querySelector<HTMLButtonElement>('.btn-edit-product');

    if (Object.keys(errorMessage).length !== 0) {
      showError(errorMessage);
    } else {
      try {
        this.updateProduct && await this.updateProduct({
          ...formValues,
          id,
        });
        btnEdit.remove();
        this.modalMain.classList.add('hidden');
        this.modalForm.reset();
        this.popup.success({
          message: PRODUCT_MESSAGE.EDIT_SUCCESS,
        });
      } catch (error) {
        this.popup.createPopup(PopupStatus.Error, error as string)
      }
    }
  }

  /**
   * @description handler search product
   */
  handleSearchProduct = (data: Product[]): void => {
    const searchProduct = querySelector<HTMLInputElement>('.input-search');

    if (searchProduct) {
      searchProduct.addEventListener('input', (e: Event) => {
        handleToggleLoading(TOGGLE_STATUS.isShown)
        const value = (e.target as HTMLInputElement).value.toLowerCase();
        setTimeout(() => {
          const searchValue = data.filter(i => i.name.toLowerCase().includes(value))
          this.displayProduct(searchValue);
          handleToggleLoading(TOGGLE_STATUS.isHidden)
        }, 1000);
      });
    }
  };

  /**
   * @description handler sort product
   */
  handleSortProduct = (data: Product[]): void => {
    const sortSelect = querySelector<HTMLSelectElement>('.sort-dropdown');

    if (sortSelect) {
      sortSelect.addEventListener('change', async (e: Event) => {
        e.preventDefault();
        const target = (e.target as HTMLSelectElement).value
        handleToggleLoading(TOGGLE_STATUS.isShown);

        setTimeout(() => {
          switch (target) {
            case 'name-asc':
              OrderByArray(data, 'name')
              break;
            case 'name-dec':
              OrderByArray(data, 'name').reverse()
              break;
            case 'price-asc':
              OrderByArray(data, 'price')
              break;
            case 'price-dec':
              OrderByArray(data, 'price').reverse()
              break;
            default:
              break;
          }
          this.displayProduct(data);
          handleToggleLoading(TOGGLE_STATUS.isHidden);
        }, 500);
      });
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

  bindDelProduct = (handler: (id: string) => void): void => {
    this.handleDelProduct(handler);
  };

  bindDetailProduct = (handler: (id: string) => void): void => {
    this.handleDetailProduct(handler);
  };

  bindSearchProduct = (data: Product[]): void => {
    this.handleSearchProduct(data);
  };

  bindSortProduct = (data: Product[]): void => {
    this.handleSortProduct(data);
  };

  bindButtonLogout = () => {
    const btnAccount = querySelector<HTMLButtonElement>('.nav-login');
    const isAuth = localStorage?.getItem('LOGIN');
    if (isAuth) {
      btnAccount.innerHTML = `<img class='btn-logout' src="/svgs/icon_logout.svg" alt="logout" />`;
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
