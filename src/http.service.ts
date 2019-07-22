import axios from "axios";

export async function httpGet(url: string) {
    return await axios(url);
}

