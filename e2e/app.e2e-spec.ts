import { PiXiPage } from './app.po';

describe('pi-xi App', () => {
  let page: PiXiPage;

  beforeEach(() => {
    page = new PiXiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
