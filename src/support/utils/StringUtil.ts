import randomString from "randomstring";
import format from "string-format";

export default class StringUtil {
  /**
   * This method will return the formatted String by replacing value in {\d}
   * @param str : String to be formatted
   * @param replaceValue : value to replaced in formatted string
   * @returns str
   */
  public static formatString(str: string, ...replaceValue: string[]): string {
    for (let i = 0; i < replaceValue.length; i++) {
      // eslint-disable-next-line no-param-reassign
      str = str.split(`{${i}}`).join(replaceValue[i]);
    }
    return str;
  }

  /**
   * This method will return the formatted String by replacing value in {key}
   * @param str : String to be formatted
   * @param replaceValue : value to replaced in formatted string
   * @returns str
   */
  public static formatStringValue(str: string, replaceValue: any): string {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(replaceValue)) {
      // eslint-disable-next-line no-param-reassign
      str = str.split(`{${key}}`).join(`${value}`);
    }
    return str;
  }

}
