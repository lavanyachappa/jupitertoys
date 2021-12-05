@contact
Feature: Validate contact submission
    Scenario Outline: Verify contact is submitted succeeefully
        Given Jupiter Toys page opened
        When ClickButton "Contact"
        And Enter Contact Details
           | Forename        | Email            |  Message           |
           | <Forename>      | <Email>          |  <Message>           |
        And ClickButton "Submit" 
        Then Contact Submitted Successfully
        Examples:
                | Forename      | Email          |  Message           |
                | Lavanya       |ls_ec@yahoo.com |Enter feedback here |
    