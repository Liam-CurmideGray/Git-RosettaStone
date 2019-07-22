import {httpGet} from "./http.service";
import {InquirerQ} from "./Inquirer";
import {ShipModule, Value} from "./StarwarsModel";

getStarships().then(response => InquirerQ(response));

async function getStarships(): Promise<ShipModule<Value>[]> {
  let StarshipUrl = `https://swapi.co/api/starships/`;
  let starShipResponse: ShipModule<Value>[] = [];

  while (StarshipUrl != null) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const starShipsApi = await httpGet(StarshipUrl);

    for (let i = 0; i < starShipsApi.data.results.length; i++) {

      let ShipName: string = starShipsApi.data.results[i].name;
      let PilotUrls: string[] = starShipsApi.data.results[i].pilots;

      starShipResponse.push({
        name: ShipName,
        value: {
          name: ShipName,
          url: PilotUrls
        }
      });
    }
    StarshipUrl = starShipsApi.data.next;
  }

  return starShipResponse;
}



