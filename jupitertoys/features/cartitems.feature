@cart
Feature: Validate contact submission
    Scenario Outline: Verify contact is submitted succeeefully
        Given Jupiter Toys page opened
        When ClickButton "Shop"
        And Add items to cart
           | items        | 
           | <items>      |
        Then Navigate To Cart
        And Read items data added in cart
        And Verify items added to cart
           | items        | 
           | <items>      |
        And Verify Subtotal of items added to cart
           | items        | 
           | <items>      |
        Examples:
                | items                                          | 
                | Funny Cow-2#Fluffy Bunny-1                     |
                | Stuffed Frog-2#Fluffy Bunny-5#Valentine Bear-3 |
    