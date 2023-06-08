import jp from "jsonpath";
import Log from "../../logger/Log";

export default class RESTResponse {
    public constructor(private headers: any, private body: string, private status: number) { }

    /**
     * Get content of nodes in response body using JSON path
     * @param jsonPath 
     * @returns 
     */
    public async getNodeValuesByJsonPath(jsonPath: string): Promise<Array<string>> {
        Log.info(`Getting content of ${jsonPath}`);
        return jp.query(JSON.parse(this.body), jsonPath);
    }

    /**
     * Get content of a node in response body using JSON path
     * @param jsonPath 
     * @returns 
     */
    public async getFirstNodeValueByJsonPath(jsonPath: string): Promise<string> {
        Log.info(`Getting content of ${jsonPath}`);
        return jp.query(JSON.parse(this.body), jsonPath)[0];
    }

    /**
     * Get content of tag in response body using JSON path
     * @param jsonPath 
     * @returns 
     */
    public async getJsonArrayLength(jsonPath: string): Promise<number> {
        Log.info(`Getting content of ${jsonPath}`);
        return jp.query(JSON.parse(this.body), jsonPath).length;
    }

    /**
     * Get response status code
     * @returns 
     */
    public async getStatusCode(): Promise<number> {
        Log.info(`Getting status code`);
        return this.status;
    }

    /**
    * Get response body
    * @returns 
    */
    public async getBody(): Promise<string> {
        Log.info(`Getting response body`);
        return this.body;
    }
}
