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

  getFormControl(controlName: string) {
    return this.get(`[formcontrolname="${controlName}"]`);
  }

  getDataCyElement(name: string) {
    return this.get(`[data-cy="${name}"]`);
  }
}
