import { ConferencePanelPage } from './app.po';

describe('conference-panel App', () => {
  let page: ConferencePanelPage;

  beforeEach(() => {
    page = new ConferencePanelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
