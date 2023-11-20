import { Page } from '../page';

class RegisterCandidatePage extends Page {
  get nameInput() {
    return super.getFormControl('nombre');
  }

  get nameInputRequiredError() {
    return super.getDataCyElement('error-name-required');
  }

  get nameInputMinLengthError() {
    return super.getDataCyElement('error-name-min-length');
  }

  get birthdayInput() {
    return super.getFormControl('fecha_nacimiento');
  }

  get birthdayInputAgeError() {
    return super.getDataCyElement('error-birthday-min-age');
  }

  get birthdayInputAgeRequiredError() {
    return super.getDataCyElement('error-birthday-required');
  }

  get residenceCityInput() {
    return super.getFormControl('ciudad');
  }

  get residenceCityRequiredError() {
    return super.getDataCyElement('error-residence-city-required');
  }

  get phoneInput() {
    return super.getFormControl('telefono');
  }

  get phoneRequiredError() {
    return this.getDataCyElement('error-phone-required');
  }

  selectTodayDate() {
    this.birthdayInput.click();

    cy.get('.p-datepicker-calendar-container').click();
  }
}

export default new RegisterCandidatePage();
