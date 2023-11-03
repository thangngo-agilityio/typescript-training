import ProductController from "@/controllers/product"
import ProductModel from "@/models/product"
import ProductView from "@/views/product"

const app = () => {
  new ProductController(new ProductModel(), new ProductView());
}

app()
