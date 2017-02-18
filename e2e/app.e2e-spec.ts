import { ThoibiPage } from './app.po';

describe('thoibi App', function() {
  let page: ThoibiPage;

  beforeEach(() => {
    page = new ThoibiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
