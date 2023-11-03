import HttpsService from "@/service/httpsService";
import { Product } from "@/types/product";

/**
 * @class UserModel
 * Manages the products data
 */
export default class ProductModel {
  private productService: HttpsService<Product>;
  private productList: Product[];
  constructor() {
    this.productService = new HttpsService<Product>('products')
    this.productList = [];
  }

  /**
   * @description get all product from server
   * @return list product return after make a GET request to server
   * @param products Products[]
   */
  async getProduct(query?: string): Promise<Product[]> {
    const data = await this.productService.get(query);
    if (data.length) {
      this.productList = data.map((item) => ({
        ...item
      }))
    }
    return this.productList.reverse();
  }

  /**
   * @description get id product from server
   * @return list product return after make a GET request to server
   * @param id id product
   */
  async getProductById(id: string): Promise<Product> {
    return await this.productService.getById(id);
  }

  /**
   * @description create new product item and save response to mock api
   * return product item
   * @return product
   */
  handleAddProduct = async (data: Product): Promise<Product[]> => {
    const addProduct = await this.productService.post(data);

    if (addProduct) {
      this.productList.push({
        ...addProduct
      });
    }
    return this.productList;
  };

  /**
   * @description Delete product by id
   * return data product remove
   * @param id
   */
  handleDelProduct = async (id: string): Promise<Product[]> => {
    const delProduct = await this.productService.delete(id);
    const getData = await this.getProduct()

    if (delProduct.id == id) {
      this.productList = getData
    }
    return this.productList
  };

  /**
   * @description Edit product item by id and save response to json server
   * return product item
   */
  handleEditProduct = async (data: Product, id: string): Promise<Product[]> => {
    const updateProduct = await this.productService.put(data, id);

    if (updateProduct !== undefined) {
      const updateProductList = [...this.productList]
      const updateProductIndex = updateProductList.findIndex(product => product.id === id)

      updateProductList[updateProductIndex].id = updateProduct.id
      updateProductList[updateProductIndex].name = updateProduct.name
      updateProductList[updateProductIndex].price = updateProduct.price
      updateProductList[updateProductIndex].image = updateProduct.image
      updateProductList[updateProductIndex].quantity = updateProduct.quantity
    }
    return this.productList
  };
}
