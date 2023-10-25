import {$authHost, $host} from "./index";

export const fetchDevices = async () => {
    const {data} = await $host.get('api/movie')
    return data
}