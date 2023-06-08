import { Given, Then, When } from "@cucumber/cucumber";
import RequestHeader from "../../support/playwright/API/RequestHeader";
import RESTRequest from "../../support/playwright/API/RESTRequest";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import Constants from "../constants/Constants";
import { expect } from "@playwright/test";

function getHeader() {
    return new RequestHeader().set(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON)
        .set(Constants.ACCEPT, Constants.APPLICATION_JSON).get();
}

When (/^user makes a request to add an object with the details "([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"$/,
    async function (objectName: string, objectYear: number, objectPrice: number, objectCPUModel: string, objectHardDiskSize: string,) {
        const endPoint = `${process.env.REST_API_BASE_URL}${Constants.OBJECTS}`;
        const requestData = {
            objectName: objectName,
            objectYear: objectYear,
            objectPrice: objectPrice,
            objectCPUModel: objectCPUModel,
            objectHardDiskSize: objectHardDiskSize
        }
        const request: RESTRequest = this.rest;
        const requestBody = await request.createRequestBody(Constants.OBJECT_CREATE_JSON, requestData);
        console.log(requestBody);
        this.response = await request.post(this.attach, endPoint, getHeader(), requestBody);
        this.objectID = await this.response.getFirstNodeValueByJsonPath(Constants.ID_JSON_PATH);
});

Then (/^user should be able to retrieve the object that was added with the details "([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"$/,
async function (objectName: string, objectYear: number, objectPrice: number, objectCPUModel: string, objectHardDiskSize: string,) {
    console.log("***")
    console.log(this.objectID);
    const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.OBJECTS_ID, this.objectID)}`;
    this.createResponse = await this.rest.get(this.attach, endPoint, getHeader());

    await Assert.assertEquals(await this.createResponse.getFirstNodeValueByJsonPath(Constants.ID_JSON_PATH), this.objectID);
    await Assert.assertEquals(await this.createResponse.getFirstNodeValueByJsonPath(Constants.NAME_JSON_PATH), objectName);
    await Assert.assertEquals((await this.createResponse.getFirstNodeValueByJsonPath(Constants.YEAR_JSON_PATH)).toString(), objectYear);
    await Assert.assertEquals((await this.createResponse.getFirstNodeValueByJsonPath(Constants.PRICE_JSON_PATH)).toString(), objectPrice);
    await Assert.assertEquals(await this.createResponse.getFirstNodeValueByJsonPath(Constants.CPU_JSON_PATH), objectCPUModel);    
    await Assert.assertEquals(await this.createResponse.getFirstNodeValueByJsonPath(Constants.DISK_JSON_PATH), objectHardDiskSize);
   
});