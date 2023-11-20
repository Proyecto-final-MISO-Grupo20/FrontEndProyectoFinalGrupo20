import { registerUser } from '../../../e2e/utils/interfaces/register-user.interface';
import { Page } from '../page';

class RegisterUserPage extends Page {
  get usernameInput() {
    return super.getFormControl('username');
  }

  get usernameRequiredError() {
    return super.getDataCyElement('username-required-error');
  }

  get usernameMinLengthError() {
    return super.getDataCyElement('username-min-length-error');
  }

  get emailInput() {
    return super.getFormControl('email');
  }

  get emailRequiredError() {
    return super.getDataCyElement('email-required-error');
  }

  get emailInvalidError() {
    return super.getDataCyElement('email-invalid-error');
  }

  get passwordInput() {
    return super.getFormControl('password');
  }

  get passwordRequiredError() {
    return super.getDataCyElement('password-required-error');
  }

  get passwordMinLengthError() {
    return super.getDataCyElement('password-min-length-error');
  }

  get passwordConfirmInput() {
    return super.getFormControl('passwordConfirm');
  }

  get passwordMisMatchError() {
    return super.getDataCyElement('password-mismatch-error');
  }

  get nextButton() {
    return super.getDataCyElement('register-user-next-button');
  }

  get registerUserError() {
    return super.getDataCyElement('register-user-error');
  }

  completeUserRegister(data: registerUser) {
    this.usernameInput.type(data.username);
    this.emailInput.type(data.email);
    this.passwordInput.type(data.password);
    this.passwordConfirmInput.type(data.password);

    this.nextButton.click();
  }
}

export default new RegisterUserPage();
