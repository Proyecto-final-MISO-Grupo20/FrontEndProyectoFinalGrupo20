import { registerBusiness } from '../../utils/interfaces/register-business.interface';
import { Page } from '../page';

class RegisterBusinessePage extends Page {
  get nameInput() {
    return super.getFormControl('nombre');
  }

  get nameInputRequiredError() {
    return super.getDataCyElement('error-name-required');
  }

  get nameInputMinLengthError() {
    return super.getDataCyElement('error-name-min-length');
  }

  get typeDocumentSelect() {
    return super.getFormControl('tipo_documento');
  }

  get nitOption() {
    return super.get('[aria-label="NIT"]');
  }

  get documentInput() {
    return super.getFormControl('documento');
  }

  get documentRequiredError() {
    return super.getDataCyElement('error-document-required');
  }

  get addressInput() {
    return super.getFormControl('direccion');
  }

  get addressRequiredError() {
    return super.getDataCyElement('error-address-required');
  }

  get businessTypeSelect() {
    return super.getFormControl('tipoEmpresaId');
  }

  get firstTypeOption() {
    return super.get('[aria-label="PRIVADA"');
  }

  get businessSegmentsSelect() {
    return super.getFormControl('segmentoId');
  }

  get firstSegmentOption() {
    return super.get('[aria-label="SALUD"');
  }

  get nextButton() {
    return super.getDataCyElement('register-user-next-button');
  }

  completeFirstStep(data: registerBusiness) {
    this.nameInput.type(data.name);
    this.typeDocumentSelect.click();
    this.nitOption.click();
    this.documentInput.type(data.document);
    this.addressInput.type(data.address);

    this.businessTypeSelect.click();
    this.firstTypeOption.click();

    this.businessSegmentsSelect.click();
    this.firstSegmentOption.click();

    this.nextButton.click();
  }
}

export default new RegisterBusinessePage();
