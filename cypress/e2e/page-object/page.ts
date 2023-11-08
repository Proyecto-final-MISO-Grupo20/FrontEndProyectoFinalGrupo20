export class Page {
  open(path: string) {
    cy.visit(path);
  }

  get(element: string) {
    return cy.get(element);
  }

  select(element: string, option: string) {
    this.get(element).select(option);
  }
}
