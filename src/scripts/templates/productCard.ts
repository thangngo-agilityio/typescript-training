import { Product } from "@/types/product"

export const productTemplate = (data: Product) => {
  return `<button class="btn-del" data-id=${data.id}><img src="/svgs/icon_del.svg" alt="Cross Icon" class="icon-del"/></button>
  <div class="product-wrapper">
    <div class="product-img">
      <img src="${data.image}" alt="${data.name}" class="img-item" />
    </div>
    <div class="product-content">
      <p class="product-name">${data.name}</p>
      <div class="product-detail">
        $ ${data.price}
        <div class="separate"></div>
        ${data.quantity} Bowls
      </div>
    </div>
  </div>

  <button class="btn-edit" data-id="${data.id}">
    <p class="edit-text" data-id="${data.id}">Edit dish</p>
  </button>`
}
