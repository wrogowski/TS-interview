Cypress.Commands.add('toCamelCase', (phrase: any) =>
  phrase.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
    index === 0 ? word.toLowerCase() : word.toUpperCase()
  ).replace(/\s+/g, '')
);

Cypress.Commands.add('convertToNaturalString', (phrase: any) =>
  phrase[0] + phrase.split(/(?=[A-Z])/).join(" ").substring(1).toLowerCase()
);

Cypress.Commands.add('forceType', {prevSubject: true}, (subject: Cypress.Chainable<JQuery<HTMLElement>>, text: string) => {
  return cy.wrap(subject).invoke('val', text);
});