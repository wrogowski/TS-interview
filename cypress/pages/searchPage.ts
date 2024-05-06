import { resolve } from "cypress/types/bluebird";

export class SearchPage {
  path = '/search';
  header = () => cy.contains('.page-title', 'Search');

  searchKeyWordInput = () => cy.get('input#q');
  advancedSearchCheckbox = () => cy.get('input#advs');
  categorySelect = () => cy.get('select#cid');
  manufacturerSelect = () => cy.get('select#mid');
  saearchButton = () => cy.get('form>.buttons>button.search-button');

  product = () => cy.get('div.product-item');
  productName = () => cy.get('h2.product-title');
  productPrice = () => this.product().find('span.actual-price');
  addToCartButton = () => this.product().find('button.product-box-add-to-cart-button');

  sortBySelect = () => cy.get('select#products-orderby');
  paginationSelect = () => cy.get('select#products-pagesize');
  gridViewMode = () => cy.contains('a[title="Grid"]', 'Grid');
  listViewMode = () => cy.contains('a[title="List"]', 'List');
};
