export class ShoppingCartPage {
  path = '/cart';

  header = () => cy.contains('.page-title>h1', 'Shopping cart');
  product = (productName: string) =>  cy.contains('td.product', productName);
  unitPrice = () => cy.get('span.product-unit-price');
  quantity = () => cy.get('input.qty-input');
  totalPrice = () => cy.get('span.product-subtotal');
};
