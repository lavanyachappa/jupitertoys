const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const common = require('../../../cucumberframework/utils/common.js');
const ObjRep = require('../../objects/jupitertoysOR');
const scope = require('../../../cucumberframework/utils/hooks.js');
let { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(common.OBJECT_TIMEOUT_MS);
const setWaitForObject = 2 * 1000;

 Given('Add items to cart',async(data) => {
    var dataVals = data.hashes();
    let items_split = dataVals[0].items.split('#');
    let cartcount= 0;
    global.itemsMap_testdata = new Map();
    await page.waitForTimeout(3 * 1000); 
    for (each of items_split) {
      const productToadd =  each.split("-")[0];
      const quanToAdd =  each.split("-")[1];
      let productprice = await page.innerText(common.getLocator(ObjRep.PRODUCT_PRICE,productToadd));
      let subtotal = parseFloat(productprice.replace("$","")) * quanToAdd;
       for (let quan=1; quan<=quanToAdd; quan ++) {
            ++cartcount;
            await page.click(common.getLocator(ObjRep.PRODUCT, productToadd));
            itemsMap_testdata.set(productToadd,quanToAdd + "##" + productprice + "##" + subtotal);
       }
    }
    let cartcount_ui = await page.innerText(ObjRep.CART_COUNT);
    expect(cartcount).to.be.equal(parseInt(cartcount_ui));
    
    
 });

 Then('Navigate To Cart',async() =>  {
   await page.click(ObjRep.CART);
   await page.waitForSelector("table tr", { state: 'visible' });
});

