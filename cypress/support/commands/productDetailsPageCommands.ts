import { ProductDetailsPage } from "../../pages/productDetailsPage"
import { NotificationBar } from "../../pages/common_components/notificationBar";

const notificationBar = new NotificationBar();

export class ProductDetailsPageCommands extends ProductDetailsPage {
  constructor(productName: string) {
    super(productName);
  }

  addProductToCart = (quantity: number) => {
    this.productQuantity().clear().type(quantity);
    this.addToCartButton().click();
    notificationBar.notificationBar().should('be.visible');
    notificationBar.closeButton().click();
    notificationBar.notificationBar().should('not.exist');
  };
};
