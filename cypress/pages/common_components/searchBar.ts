export class SearchBar {
  searchInput = () => cy.get('input#small-searchterms');
  searchButton = () => cy.contains('button.search-box-button', 'Search');
  logo = () => cy.get('.header-logo>a[href="/"]');

  searchFor = (query: string) => {
    this.searchInput().clear().type(query);
    return this.searchButton().click();
  };
};
