import AuthenController from "@/controllers/authen"
import AuthenModel from "@/models/authen"
import AuthenView from "@/views/authen"


const app = () => {
  new AuthenController(new AuthenModel(), new AuthenView());
}

app();
