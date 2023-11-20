import { Page } from '../page';

class RegisterPage extends Page {
  get typeUserDropdown() {
    return super.get('[formcontrolname="user"]');
  }

  get candidateOption() {
    return super.get('[aria-label="candidate"]');
  }

  get businessOption() {
    return super.get('[aria-label="business"]');
  }

  get nextRegisterButton() {
    return super.get('[data-cy="next-register-button"]');
  }

  goToCandidateRegister() {
    this.typeUserDropdown.click();
    this.candidateOption.click();
    this.nextRegisterButton.click();
  }

  goToBusinessRegister() {
    this.typeUserDropdown.click();
    this.businessOption.click();
    this.nextRegisterButton.click();
  }

  override open = () => super.open('/auth/register');
}

export default new RegisterPage();
