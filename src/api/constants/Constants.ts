export default class Constants{
    // REST Endpoints 
    static readonly OBJECTS = "/objects";
    static readonly OBJECTS_ID = "/objects/{0}"
    static readonly OBJECTS_IDS = "/objects?id={0}&id={1}&id={2}"

    // REST JSON path
    static readonly ID_JSON_PATH = "$..id";
    static readonly NAME_JSON_PATH = "$..name";
    static readonly YEAR_JSON_PATH = "$..data.year";
    static readonly PRICE_JSON_PATH = "$..data.price";
    static readonly CPU_JSON_PATH = "$..['CPU model']";
    static readonly DISK_JSON_PATH = "$..['Hard disk size']";
    static readonly UPDATED_JSON_PATH = "$..updatedAt";
    static readonly DELETEMESSAGE_JSON_PATH = "$..message";

    // Payload file paths
    static readonly OBJECT_JSON = "object.json";
    static readonly OBJECT_CREATE_JSON = "object_create.json";
    static readonly OBJECT_PATCH_JSON = "object_patch.json";

    // REST Headers
    static readonly CONTENT_TYPE = "content-type";
    static readonly APPLICATION_JSON = "application/json";
    static readonly ACCEPT = "accept";
}