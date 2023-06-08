import { test, expect } from "@playwright/test";
import Log from "../../logger/Log";

export default class Assert {

    /**
   * To verify that actual contains expected ignoring case
   * @param actual - string input
   * @param expected - string input
   * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
   */
    public static async assertEqualsIgnoreCase(actual: string, expected: string,
        softAssert = false) {
        Log.info(`Verifying that ${actual} has text ${expected}`);
        try {
            expect(actual.toLowerCase(), `Expected '${expected}' should be EQUAL to Actual '${actual}'`)
                .toEqual(expected.toLowerCase());
        } catch (error) {
            if (!softAssert) {
                throw new Error(error);
            }
        }
    }

    /**
     * To verify actual equals expected
     * @param value1 any object
     * @param value2 any object to compare
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertEquals(actual: any, expected: any, softAssert = false) {
        Log.info(`Verifying that ${actual} has text '${expected}'`);
        try {
            expect(actual, `Expected '${expected}' should be EQUAL to Actual '${actual}'`).toEqual(expected);
        } catch (error) {
            if (!softAssert) {
                throw new Error(error);
            }
        }
    }

    /**
     * To verify actual not equals to expected
     * @param actual any object
     * @param expected any object to compare
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertNotEquals(actual: any, expected: any, softAssert = false) {
        Log.info(`Verifying that ${actual} is not equals to ${expected}`);
        try {
            expect(actual, `Expected '${expected}' should NOT be EQUAL to Actual '${actual}'`).not.toEqual(expected);
        } catch (error) {
            if (!softAssert) {
                throw new Error(error);
            }
        }
    }

    /**
     * To verify value not equals to null
     * @param value any value
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertNotNull(value: any, softAssert = false) {
        Log.info(`Verifying that ${value} is not null`);
        try {
            expect(value, `Expected is 'NOT null' & Actual is '${value}'`).not.toEqual(null);
        } catch (error) {
            if (!softAssert) {
                throw new Error(error);
            }
        }
    }

}
