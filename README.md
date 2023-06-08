# valueblue-playwright-bdd-ui

## **Overview:**

This is a BDD test automation framework developed using **Playwright** with **Cucumber**.

Restful-API test cases are created on [Restful-api.dev](https://restful-api.dev/) site.

## Features

- This framework is developed in BDD framework with playwright and cucumber using typescript
- Supports Restful API automation
- Supports running scenarios in parallel mode and falky scenarios can be re-executed until maximum number of attempts is reached via retry configuration option.
- Supports rerun of the failed scenarios.
- Scenarios execution with tags
- Generates Cucumber HTML Report & HTML Report with snapshots and video
- Test execution logs are captured in the log file.
- Env configurtions are controlled by env config file


#### Steps to use
##### 1. Dependency Installation

Clone the code from github [download](https://github.com/dineshjk92/valueblue-challenge-ui/archive/refs/heads/main.zip) OR [cloned](https://github.com/dineshjk92/valueblue-challenge-ui.git) using git command.

Installing the dependencies.
```sh
npm ci
```
##### 2. Test creation
- Test scenarios are written in feature files inside the 'features' folder
- Step definitions implements the steps to execute
- For API tests, payloads templates are placed inside 'resources' folder

##### 3. Execution
To run test scenarios use below command.
```sh
npm run test
```
To run specific scenario, use tags command. Below are few examples.
```sh
npm run test:tags "@smoke"
npm run test:tags "@smoke or @regression"
npm run test:tags "@smoke and @regression"
```
To dry run scenarios 
```sh
npm run dry:test
```
To rerun the failed scenarios 
```sh
npm run failed:test
```
Similar command can be used to update other environment configuration

To generate HTML and Cucumber report use below command
```sh
npm run report
```
##### 4. Report & Logs
Cucumber test report will be present inside
```sh
test-results/reports/cucumber.html
```
HTML report will be present inside
```sh
test-results/reports/html/index.html
```
