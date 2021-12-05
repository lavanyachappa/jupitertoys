module.exports = {
   OBJECT_TIMEOUT: 60,
   OBJECT_TIMEOUT_MS: 30000,
    
    launchBrowser: async function (browser, url) {
        context = await browser.newContext({
                viewport: {
                    width: 1300,
                    height: 800
                }
            }); 
        
        global.page = await context.newPage();
        page.setDefaultNavigationTimeout(60000)
        page.setDefaultTimeout(60000);
        console.log('Loading URL::' + url);
        await page.goto(url);
        return page;
    },
    /**
     * Replace a variable with name "VAR"  in a selector
     * @param {String} selector element selector on which the variable to be replaced
     * @param {String} valueToReplace value to replace in the selector
     */
    getLocator: function (selector, valueToReplace) {
        return selector.replace('VAR', valueToReplace);
    },
    /**
     * Create a uniq string
     * @param {number} length specify the length of uniq strign to generate
     */
    getRandom: function (length) {
        var chars = '0123456789';
        var randomstring = '';
        for (var i = 0; i < length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    },
    wait: async function (seconds) {
        await page.waitForTimeout(seconds * 1000 || 1000);
    },
}
