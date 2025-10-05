import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './pageFixture';

setDefaultTimeout(60 * 1000); // 60 seconds timeout

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld, scenario) {
  await this.close(scenario);
});
