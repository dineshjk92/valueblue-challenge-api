import { Given, Then, When } from "@cucumber/cucumber";
import RequestHeader from "../../support/playwright/API/RequestHeader";
import RESTResponse from "../../support/playwright/API/RESTResponse";
import RESTRequest from "../../support/playwright/API/RESTRequest";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import Constants from "../constants/Constants";
import { expect } from "@playwright/test";

function getHeader() {
    return new RequestHeader().set(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON)
        .set(Constants.ACCEPT, Constants.APPLICATION_JSON).get();
}

Then('user makes a request to delete the object that was just added',
    async function () {
        const response: RESTResponse = this.response;
        this.objectID = await response.getFirstNodeValueByJsonPath(Constants.ID_JSON_PATH);
        const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.OBJECTS_ID, this.objectID)}`;
        this.response = await this.rest.delete(this.attach, endPoint, getHeader());
});

When('user should receive a message that object has been deleted', async function () {
    const response: RESTResponse = this.response;
    const deleteMessage = StringUtil.formatString("Object with id = {0} has been deleted.", this.objectID);
    await Assert.assertEquals(await response.getFirstNodeValueByJsonPath(Constants.DELETEMESSAGE_JSON_PATH), deleteMessage);
});