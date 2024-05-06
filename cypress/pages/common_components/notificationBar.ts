export class NotificationBar {
  notificationBar = () => cy.contains('div#bar-notification', 'The product has been added to your shopping cart');
  shoppingCartLink = () => cy.contains('p.content>a[href="/cart"]', 'shopping cart');
  closeButton = () => cy.get('span.close[title="Close"]');
};
