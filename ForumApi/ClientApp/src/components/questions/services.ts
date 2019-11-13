import { get } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";
import { API_CALLS } from "../../utils/api_calls";

export function getUser(id:string){
    let url = API_CALLS.users+id;
    return get(url);
}