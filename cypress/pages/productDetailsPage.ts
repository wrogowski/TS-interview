export class ProductDetailsPage {
  path: string;
  header: any;
  addToCartButton: any;
  productPriceTag: any;
  productQuantity: any;
  

  constructor(productName: string) {
    this.path = `/${productName.toLowerCase().replace(/\s+/g, '-')}`;
    this.header = () => cy.contains('.product-name>h1', productName); 
    this.addToCartButton = () => cy.contains('button.add-to-cart-button', 'Add to cart');
    this.productPriceTag = () => cy.get('.product-price>span');
    this.productQuantity = () => cy.get('.add-to-cart-panel input.qty-input');
  };
};
