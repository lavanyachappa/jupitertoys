const contact = {
    CONTACT_FORENAME: "#forename",
    CONTACT_EMAIL: "#email",
    CONTACT_MESSAGE: "#message",
    CONFIRMATION: ".alert.alert-success",
};
const shopitems = {
    PRODUCT: "//*[contains(@class,'product-title') and text()='VAR']/..//a",
    PRODUCT_PRICE: "//*[contains(@class,'product-title') and text()='VAR']/..//span",
    CART: "#nav-cart a",
    CART_COUNT: "#nav-cart a span",
};
const cart = {
    HEADERS: "table th",
    ITEM_NAME_PRICE_SUBTOTAL: "(//table/tbody/tr[VAR]/td[REPLACE])",
    ITEM_QUANTITY: "(//table/tbody/tr[VAR]/td[REPLACE])/input",
}


module.exports = {
    ...contact,
    ...shopitems,
    ...cart
};