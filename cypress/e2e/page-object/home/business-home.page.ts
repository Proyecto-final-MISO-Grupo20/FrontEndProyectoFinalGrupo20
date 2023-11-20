import { Page } from '../page';

class BusinessHome extends Page {
  get candidatesHeader() {
    return super.getDataCyElement('business-home-header');
  }

  get candidatesDataView() {
    return super.getDataCyElement('candidates-data-view');
  }

  get candidatesFilterInput() {
    return super.getDataCyElement('candidates-filter');
  }

  override open = () => super.open('home');
}

export default new BusinessHome();
