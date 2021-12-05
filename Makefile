##Commands for test execution
test-cleanup:
	@echo "Cleaning screenshots"
	@rm -rf e2etestresults
	
debug-browser-test-class: test-cleanup
	URL=${AGAINST} BROWSERTYPE=${BROWSER} DEBUG=true npm run playwright:each -t "${TAG}"
