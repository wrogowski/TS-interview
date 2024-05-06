type NavbarLinks = 'register' | 'logIn' | 'logOut' | 'wishlist' | 'shoppingCart';

export class TopNavbar {
  currencySelector = () => cy.get('select#customerCurrency');
  registerLink = () => cy.contains('a.ico-register', 'Register');
  logInLink = () => cy.contains('a.ico-login', 'Log in');
  logOutLink = () => cy.contains('a.ico-logout', 'Log out');
  wishlistLink = () => cy.contains('a.ico-wishlist', 'Wishlist');
  shoppingCartLink = () => cy.contains('a.ico-cart', 'Shopping cart');
  wishlistLinkAmount = () => this.wishlistLink().find('span.wishlist-qty');
  shoppingCartLinkAmount = () => this.shoppingCartLink().find('span.cart-qty');

  navigateTo = (linkName: NavbarLinks) => 
    cy.toCamelCase(linkName + 'Link').then(selector => this[selector]().click());
};
