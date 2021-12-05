 **Automation Setup** 
===============
Cucumber + Playwright with chai framework

**Prereq**
======
Install Node froom - https://nodejs.org/en/download/

**Steps to Execute Tests Locally**
=============================
 1. From command line Clone the repo
 2. run "npm install"
 3. To run a feature, run below command,default runs on chrome.Once tests are run, results are stored in 
     folder e2etestresults

      make debug-browser-test-class AGAINST=http://jupiter.cloud.planittesting.com TAG=@cart

 4. For generating html report,after test execution completed run command "node reporter.js" from project directory

 5. To view the report open index.html from folder e2etestresults.For failed scenarios exception and screenshot will be logged in the report.

**Integration with CI/CD**
======================
Bitbucket Repo link - https://bitbucket.org/lavanyachappa/jupitertoys
I added the project to bitbucket and setup a basic pipeline to execute tests.

**Note -** 

A basic pipeline is setup and tests are run on headless mode.To run in headless off mode we have to setup runners in bitbucket. We can also configure  yml to run tests only on PRs.
Results are downloaded to bitbucket artifacts.

