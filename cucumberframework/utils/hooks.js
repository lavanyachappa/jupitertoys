const { setDefaultTimeout, BeforeAll, Before, After, AfterAll } = require('@cucumber/cucumber');
const playwright = require('playwright');
const common = require('./common.js');


// Launch options.
const chromiumConfig = {
  headless: true,
  slowMo: 10,
  chromiumSandbox:false
};
const defaultConfig = {
  headless: true,
  slowMo: 3,
  chromiumSandbox:false
};

const debuggingMode = {
  headless: false,
  slowMo: 50,
};

function debugConfig() {
  return process.env.DEBUG === 'true' ? debuggingMode : {};
};
function playwrightConfig(browserType) {
  let config = Object.assign(defaultConfig, debugConfig());
  if (browserType === "chromium")
    config = Object.assign(chromiumConfig, debugConfig());
  return config;
};

Before({timeout: 60 * 1000} , async () => {
  setDefaultTimeout(60000);
  console.log("BROWSERTYPE::" + process.env.BROWSERTYPE);
  let browserType = process.env.BROWSERTYPE === '' || typeof process.env.BROWSERTYPE === 'undefined' ? 'chromium' : process.env.BROWSERTYPE;
  console.log('Running on browser type: '+browserType)
  browser = await playwright[browserType].launch(playwrightConfig(browserType));
  await common.launchBrowser(browser, process.env.URL);
});

Before({timeout: 60 * 1000} , async () => {
  //Write code for login
});

After(async function (scenario){
  if(scenario.result.status=== 'FAILED'){
      const screenShotFail= await page.screenshot();
      this.attach(screenShotFail, "image/png");
  }  
  await browser.close();
});
