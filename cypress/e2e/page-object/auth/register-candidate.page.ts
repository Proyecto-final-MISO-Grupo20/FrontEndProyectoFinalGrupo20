import { registerCandidate } from '../../utils/interfaces/register-candidate.interface';
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
    return super.getDataCyElement('error-phone-required');
  }

  get typeDocumentSelect() {
    return super.getFormControl('tipo_documento');
  }

  get ccOption() {
    return super.get('[aria-label="CC"]');
  }

  get documentInput() {
    return super.getFormControl('documento');
  }

  get documentRequiredError() {
    return super.getDataCyElement('error-document-required');
  }

  get nextButton() {
    return super.getDataCyElement('register-user-next-button');
  }

  selectTodayDate() {
    this.birthdayInput.click();

    cy.get('.p-datepicker-calendar-container').click();
  }

  selectValidDate() {
    // Click on the birthday input field to open the calendar
    this.birthdayInput.click();

    // Calculate the date 18 years ago
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    // Format the date to match the format expected by PrimeNG p-calendar
    const formattedDate = `${
      eighteenYearsAgo.getMonth() + 1
    }/${eighteenYearsAgo.getDate()}/${eighteenYearsAgo.getFullYear()}`;

    // Type the formatted date directly into the input field
    this.birthdayInput.type(formattedDate);

    cy.get('.p-datepicker-calendar-container').click();
  }

  completeFirsStep(data: registerCandidate) {
    this.nameInput.type(data.name);
    this.selectValidDate();
    this.residenceCityInput.type(data.city);
    this.phoneInput.type(data.phone);

    this.typeDocumentSelect.click();
    this.ccOption.click();

    this.documentInput.type(data.document);

    this.nextButton.click();
  }
}

export default new RegisterCandidatePage();
