export default class CommonConstants {
  static readonly BLANK = '';
  static readonly DOWNLOAD_PATH = "./test-results/downloads/";
  static readonly REST_JSON_REQUEST_PATH = "src/resources/";
  static readonly TEST_FOLDER_PATH = "../../tests/";
  static readonly TEST_SUITE_FILE_FORMAT = ".test.ts";
  static readonly PARALLEL_MODE = "parallel";
  static readonly SERIAL_MODE = "serial";
  static readonly REPORT_TITLE = "Test Execution Report";
  static readonly RESULTS_PATH = "./test-results/results";
  static readonly JUNIT_RESULTS_PATH = `${CommonConstants.RESULTS_PATH}/results.xml`;
}
