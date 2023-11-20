import { Login } from '../../utils/interfaces/login.interface';
import { Page } from '../page';

class LoginPage extends Page {
  get usernameInput() {
    return super.getFormControl('username');
  }

  get passwordInput() {
    return super.getFormControl('password');
  }

  get loginButton() {
    return super.getDataCyElement('login-button');
  }

  get loginError() {
    return super.getDataCyElement('login-error-message');
  }

  login({ username, password }: Login) {
    this.usernameInput.type(username);
    this.passwordInput.type(password);

    this.loginButton.click();
  }

  override open = () => super.open('/auth/login');
}

export default new LoginPage();
