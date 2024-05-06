import { SearchPage } from "../../pages/searchPage";

const searchPage = new SearchPage();

export const setAdvancedFilters = (category: string = 'All', manufacturer: string = 'All') => {
  searchPage.advancedSearchCheckbox().check();
  searchPage.categorySelect().select(category);
  searchPage.manufacturerSelect().select(manufacturer);
  return searchPage.saearchButton().click();
};

export const setResultsDisplayOptions = ({sortBy = 'Position', paginationSize = 6, viewMode = null}) => {
  cy.intercept('GET', '/product/search*').as('displayOptionsApply');

  searchPage.sortBySelect().select(sortBy);
  searchPage.paginationSelect().select(paginationSize.toString());
  if (viewMode) {
    searchPage[`${viewMode}ViewMode`]().click();
  };
  
  return cy.wait('@displayOptionsApply').its('response.statusCode').should('eq', 200);
};

export const checkReturnedResults = (expectedResults: string[]) => {
  searchPage.product().should('have.length', expectedResults.length);
  searchPage.productName().each((product, index) => {  
    expect(product.text()).eq(expectedResults[index]);
  });
};
