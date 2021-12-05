const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const common = require('../../../cucumberframework/utils/common.js');
const ObjRep = require('../../objects/jupitertoysOR');
const scope = require('../../../cucumberframework/utils/hooks.js');
let { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(common.OBJECT_TIMEOUT_MS);
const setWaitForObject = 2 * 1000;

Then(
    'ClickButton {string}', async (buttonName) => {
      await page.click('text=' + buttonName);
    }
  );
 Given('Jupiter Toys page opened',async() => {
    let page_title = await page.title();
    expect(page_title).to.be.equal('Jupiter Toys');
    
 });
 When('Enter Contact Details',async(data) => {
    var dataVals = data.hashes();
    global.Fname = dataVals[0].Forename = + '_' + common.getRandom(5);;
    await page.waitForSelector(ObjRep.CONTACT_FORENAME, { state: 'visible' });
    await page.fill(ObjRep.CONTACT_FORENAME,Fname);
    await page.fill(ObjRep.CONTACT_EMAIL,dataVals[0].Email );
    await page.fill(ObjRep.CONTACT_MESSAGE,dataVals[0].Message );
    
 });
 Then('Contact Submitted Successfully',async() => {
    let confirm_message = await page.innerText(ObjRep.CONFIRMATION);
    expect(confirm_message).to.be.equal(`Thanks ${Fname}, we appreciate your feedback.`);
    
 });
