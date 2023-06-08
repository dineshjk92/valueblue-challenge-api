import { Given, Then, When } from "@cucumber/cucumber";
import RequestHeader from "../../support/playwright/API/RequestHeader";
import RESTResponse from "../../support/playwright/API/RESTResponse";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import Constants from "../constants/Constants";
import { expect } from "@playwright/test";

function getHeader() {
    return new RequestHeader().set(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON)
        .set(Constants.ACCEPT, Constants.APPLICATION_JSON).get();
}

Given('user has access to Restful-API Dev', async function () {
    const endPoint = `${process.env.REST_API_BASE_URL}${Constants.OBJECTS}`;
    const response: RESTResponse = await this.rest.get(this.attach, endPoint, getHeader());
    await Assert.assertEquals(await response.getStatusCode(), 200);
});

When('user makes a request to retrieve all the objects', async function () {
    const endPoint = `${process.env.REST_API_BASE_URL}${Constants.OBJECTS}`;
    this.response = await this.rest.get(this.attach, endPoint, getHeader());
});

Then('user should get a status code {int}', async function (status: number) {
    const response: RESTResponse = this.response;
    await Assert.assertEquals(await response.getStatusCode(), status);
});

Then('user should get list of objects', async function () {
    const response: RESTResponse = this.response;
    await Assert.assertNotNull(await response.getBody());
});

When('user makes a request to retrieve the objects with IDs {string},{string},{string}', async function (id1, id2, id3) {
    const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.OBJECTS_IDS, id1, id2, id3)}`;
    this.response = await this.rest.get(this.attach, endPoint, getHeader());
});

Then('user should get list of objects with IDs {string},{string},{string}', async function (id1, id2, id3) {
    const response: RESTResponse = this.response;
    const expectedIds = [id1, id2, id3];
    Assert.assertEquals(await response.getNodeValuesByJsonPath(Constants.ID_JSON_PATH), expectedIds);
});

When('user makes a request to retrieve an object with ID {string}', async function (id) {
    const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.OBJECTS_ID, id)}`;
    this.response = await this.rest.get(this.attach, endPoint, getHeader());
});

Then('user should get the object with ID {string}', async function (id) {
    const response: RESTResponse = this.response;
    const expectedId = [id];
    Assert.assertEquals(await response.getNodeValuesByJsonPath(Constants.ID_JSON_PATH), expectedId);
    
    this.get_ObjectID = await response.getFirstNodeValueByJsonPath(Constants.ID_JSON_PATH);
    this.get_ObjectName = await response.getFirstNodeValueByJsonPath(Constants.NAME_JSON_PATH);
    this.get_ObjectYear = await response.getFirstNodeValueByJsonPath(Constants.YEAR_JSON_PATH);
    this.get_ObjectPrice = await response.getFirstNodeValueByJsonPath(Constants.PRICE_JSON_PATH);
    this.get_ObjectCPU = await response.getFirstNodeValueByJsonPath(Constants.CPU_JSON_PATH);
    this.get_ObjectDISK = await response.getFirstNodeValueByJsonPath(Constants.DISK_JSON_PATH);

});