const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const common = require('../../../cucumberframework/utils/common.js');
const ObjRep = require('../../objects/jupitertoysOR');
const scope = require('../../../cucumberframework/utils/hooks.js');
let { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(common.OBJECT_TIMEOUT_MS);


Given('Read items data added in cart',async() =>  {
   global.itemsMap_ui = new Map();
   let headers = await page.$$eval(ObjRep.HEADERS, (elements) => elements.map((item) => item.textContent));
   let rows = await page.$$("table tbody tr");
   let item_index = await findHeaderIndex("Item", headers);
   let price_index = await findHeaderIndex("Price", headers);
   let quantity_index =  await findHeaderIndex("Quantity", headers);
   let subtotal_index = await findHeaderIndex("Subtotal", headers);
   for (let i=1;i<=rows.length;i++) {
      let item = (await page.innerText((common.getLocator(ObjRep.ITEM_NAME_PRICE_SUBTOTAL,i)).replace("REPLACE",item_index))).trim();
      let price = await page.innerText((common.getLocator(ObjRep.ITEM_NAME_PRICE_SUBTOTAL,i)).replace("REPLACE",price_index));
      let quantity = await page.$eval(((common.getLocator(ObjRep.ITEM_QUANTITY,i)).replace("REPLACE",quantity_index)), (e) => e.value);
      let subtotal = (await page.innerText((common.getLocator(ObjRep.ITEM_NAME_PRICE_SUBTOTAL,i)).replace("REPLACE",subtotal_index))).replace("$","");
      itemsMap_ui.set(item,quantity + "##" + price + "##" + subtotal);
   }
   console.log(itemsMap_ui);
   console.log("==============");
   console.log(itemsMap_testdata);

});
Then ('Verify items added to cart',async(data) => {
   var dataVals = data.hashes();
   let items_split = dataVals[0].items.split('#');
   for (each of items_split) {
         const productToadd =  each.split("-")[0];
         expect(itemsMap_ui.has(productToadd)).to.be.true;
      }

});
Then ('Verify Subtotal of items added to cart',async(data) => {
   var dataVals = data.hashes();
   let items_split = dataVals[0].items.split('#');
   for (each of items_split) {
         const productToadd =  each.split("-")[0];
         let quantity_expected = itemsMap_testdata.get(productToadd).split("##")[2];
         let quantity_actual = itemsMap_ui.get(productToadd).split("##")[2];
         expect(parseFloat(quantity_expected)).to.be.equal(parseFloat(quantity_actual));
         
      }
});
async function findHeaderIndex(header,headers) {
   for (each=0;each<headers.length;each++) {
      if (headers[each] == header) return (each+1);
   }
}