import { setWorldConstructor, World, IWorldOptions, ITestCaseHookParameter } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async close(scenario: ITestCaseHookParameter){
    if (scenario.result?.status === 'FAILED') {
      const screenshot = await this.page.screenshot({ type: 'png', fullPage: true });
      this.attach(screenshot, 'image/png');
    }
    if (this.page && !this.page.isClosed()) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
