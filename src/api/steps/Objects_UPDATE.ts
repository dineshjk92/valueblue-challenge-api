import { Given, Then, When } from "@cucumber/cucumber";
import RequestHeader from "../../support/playwright/API/RequestHeader";
import RESTResponse from "../../support/playwright/API/RESTResponse";
import RESTRequest from "../../support/playwright/API/RESTRequest";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import Constants from "../constants/Constants";
import DateUtil from "../../support/utils/DateUtil";

function getHeader() {
    return new RequestHeader().set(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON)
        .set(Constants.ACCEPT, Constants.APPLICATION_JSON).get();
}

When(/^user makes a request to update an object with the details "([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"$/,
    async function (objectName: string, objectYear: number, objectPrice: number, objectCPUModel: string, objectHardDiskSize: string,) {
        const objectID = await this.response.getFirstNodeValueByJsonPath(Constants.ID_JSON_PATH);
        const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.OBJECTS_ID, objectID)}`;
        const requestData = {
            objectID: objectID,
            objectName: objectName + '(updated)',
            objectYear: objectYear,
            objectPrice: objectPrice,
            objectCPUModel: objectCPUModel,
            objectHardDiskSize: objectHardDiskSize
        }
        const request: RESTRequest = this.rest;
        const requestBody = await request.createRequestBody(Constants.OBJECT_JSON, requestData);
        this.response = await request.put(this.attach, endPoint, getHeader(), requestBody);
        this.objectID = objectID;
    });

Then(/^user should be able to retrieve the object that was updated with the details "([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"$/,
    async function (objectName: string, objectYear: number, objectPrice: number, objectCPUModel: string, objectHardDiskSize: string,) {
        const response: RESTResponse = this.response;
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.ID_JSON_PATH), this.objectID);
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.NAME_JSON_PATH), objectName + '(updated)');
        await Assert.assertEquals((await response.getFirstNodeValueByJsonPath(Constants.YEAR_JSON_PATH)).toString(), objectYear);
        await Assert.assertEquals((await response.getFirstNodeValueByJsonPath(Constants.PRICE_JSON_PATH)).toString(), objectPrice);
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.CPU_JSON_PATH), objectCPUModel);
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.DISK_JSON_PATH), objectHardDiskSize);
        await Assert.assertNotNull(await response.getFirstNodeValueByJsonPath(Constants.UPDATED_JSON_PATH));
    });

When('user makes a request to partially update an object',
    async function () {
        this.objectID = await this.response.getFirstNodeValueByJsonPath(Constants.ID_JSON_PATH)
        this.objectName = await this.response.getFirstNodeValueByJsonPath(Constants.NAME_JSON_PATH)
        const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.OBJECTS_ID, this.objectID)}`;
        const requestData = {
            objectName: this.objectName + '(Updated)',
        }
        const request: RESTRequest = this.rest;
        const requestBody = await request.createRequestBody(Constants.OBJECT_PATCH_JSON, requestData);
        this.response = await request.patch(this.attach, endPoint, getHeader(), requestBody);
        this.objectName = await this.response.getFirstNodeValueByJsonPath(Constants.NAME_JSON_PATH);
    });

Then('user should be able to retrieve the object that was partialy updated',
    async function () {
        const response: RESTResponse = this.response;
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.ID_JSON_PATH), this.objectID);
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.NAME_JSON_PATH), this.objectName);
        await Assert.assertNotNull(await response.getFirstNodeValueByJsonPath(Constants.UPDATED_JSON_PATH));
    });

Then('user should retrieve same values for all fields as retrieved except the updated field',
    async function () {
        const response: RESTResponse = this.response;
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.ID_JSON_PATH),
            await this.createResponse.getFirstNodeValueByJsonPath(Constants.ID_JSON_PATH));
        await Assert.assertNotEquals(await response.getFirstNodeValueByJsonPath(Constants.NAME_JSON_PATH),
            await this.createResponse.getFirstNodeValueByJsonPath(Constants.NAME_JSON_PATH));
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.YEAR_JSON_PATH),
            await this.createResponse.getFirstNodeValueByJsonPath(Constants.YEAR_JSON_PATH));
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.PRICE_JSON_PATH),
            await this.createResponse.getFirstNodeValueByJsonPath(Constants.PRICE_JSON_PATH));
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.CPU_JSON_PATH),
            await this.createResponse.getFirstNodeValueByJsonPath(Constants.CPU_JSON_PATH));
        await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.DISK_JSON_PATH),
            await this.createResponse.getFirstNodeValueByJsonPath(Constants.DISK_JSON_PATH));
    });