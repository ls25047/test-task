import {Cities} from "./JS/cities";
import {Zones} from "./JS/zones";

export let cities
export let zones

(async () => {
    try {
        let data = await(await fetch('info.json')).json()
        cities = new Cities(data.cities)
        zones = new Zones(data.zones, data.images)
    }
    catch (e) {
        console.log(e)
    }
})()