import { HomePage } from "../../pages/homePage";
import { LoginPage } from "../../pages/loginPage";
import { RegisterPage } from "../../pages/registerPage";
import { RegisterResultPage } from "../../pages/registerResultPage";
import { ShoppingCartPage } from "../../pages/shoppingCartPage";
import { SearchPage } from "../../pages/searchPage";
import { TopNavbar } from "../../pages/common_components/topNavbar";
import { SearchBar } from "../../pages/common_components/searchBar";
import { loginWithRegularUserCredentials } from "../../support/commands/loginPageCommands";
import { fillRequiredFields } from "../../support/commands/registerPageCommands";
import { setAdvancedFilters, setResultsDisplayOptions, checkReturnedResults } from "../../support/commands/searchPageCommands";
import { ProductDetailsPageCommands } from "../../support/commands/productDetailsPageCommands";

const homePage = new HomePage();
const loginPage = new LoginPage();
const registerResultPage = new RegisterResultPage();
const registerPage = new RegisterPage();
const searchPage = new SearchPage();
const shoppingCartPage = new ShoppingCartPage();
const navbar = new TopNavbar();
const searchBar = new SearchBar();

describe('Account creation, login, product search and cart review - user story', () => {
  beforeEach('Open the Home Page', () => cy.visit(homePage.path));

  it('Create regular user account and login', () => {
    navbar.navigateTo('register');
    registerPage.header().should('be.visible');

    fillRequiredFields();
    registerPage.registerButton().click().then(() => {
      cy.location('pathname').should('eq', registerResultPage.path);
      registerResultPage.header().should('be.visible');
    }).then(() => {
      //user is automatically logged in after creation
      navbar.navigateTo('logOut')
      cy.location('pathname').should('eq', homePage.path);
    }).then(() => {
      navbar.navigateTo('logIn');
      loginPage.header().should('be.visible');
      loginWithRegularUserCredentials();
      navbar.logOutLink().should('be.visible');
      cy.location('pathname').should('eq', homePage.path);
    });
  });

  context(`Created user is able to search and filter the products,
          review their details and them to cart`, () => {

    beforeEach('Login as created user', () => {
      navbar.navigateTo('logIn');
      loginWithRegularUserCredentials();
    });

    const expectedProducts = [
      'Nikon D5500 DSLR',
      'Leica T Mirrorless Digital Camera',
      'Apple iCam',
      'adidas Consortium Campus 80s Running Shoes'
    ];

    it('Search for a products and filter the results', () => {
      searchBar.searchFor('cam').then(() => {
        searchPage.searchKeyWordInput().should('have.value', 'cam');
        checkReturnedResults(expectedProducts);
      }).then(() => {
        setAdvancedFilters('Electronics >> Camera & photo');
        setResultsDisplayOptions({ sortBy: 'Name: Z to A' }).then(() => {
          expectedProducts.pop();

        });
      }).then(() => {
        setAdvancedFilters('Electronics >> Camera & photo', 'Apple');
        checkReturnedResults([expectedProducts[2]]);
      });
    });

    it('Review product details and add it to the cart', () => {
      searchBar.searchFor(expectedProducts[1]).then(() => {
        checkReturnedResults([expectedProducts[1]]);
        searchPage.product().first().click();
      }).then(() => {
        const productDetailsPage = new ProductDetailsPageCommands(expectedProducts[1]);

        cy.location('pathname').should('eq', productDetailsPage.path);
        productDetailsPage.header().should('be.visible');
        productDetailsPage.productPriceTag().should('include.text', '$530.00');

        productDetailsPage.addProductToCart(2);
        navbar.shoppingCartLinkAmount().should('have.text', '(2)');
        navbar.navigateTo('shoppingCart');
      }).then(() => {
        cy.location('pathname').should('eq', shoppingCartPage.path);
        shoppingCartPage.header().should('be.visible');

        shoppingCartPage.product(expectedProducts[1]).should('be.visible').parent().within(() => {
          shoppingCartPage.unitPrice().should('have.text', '$530.00');
          shoppingCartPage.quantity().should('have.value', '2');
          shoppingCartPage.totalPrice().should('have.text', '$1,060.00');
        });
      });
    });
  });
});
