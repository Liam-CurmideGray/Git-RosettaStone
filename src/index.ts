import { get } from "./http.service";
import { InquirerQ } from "./inquirer";
import { StarwarsModule, StarshipValue } from "./starwars.model";
import { titleScreen } from "./titleScreen";
import { startAnimation } from "./loader.animation";
import { Spinner } from "clui";

titleScreen();
const buffer: Spinner = startAnimation();
getStarships().then(starshipsResponse => InquirerQ(starshipsResponse, buffer));

async function getStarships(): Promise<StarwarsModule<StarshipValue>[]> {
  let starshipUrl = `https://swapi.co/api/starships/`;
  let starshipDetails: StarwarsModule<StarshipValue>[] = [];

  while (starshipUrl != null) {
    const starshipsApi = await get(starshipUrl);

    for (let i = 0; i < starshipsApi.data.results.length; i++) {
      let name: string = starshipsApi.data.results[i].name;
      let pilotUrls: string[] = starshipsApi.data.results[i].pilots;

      starshipDetails.push({
        name,
        value: {
          name,
          pilotUrls
        }
      });
    }
    starshipUrl = starshipsApi.data.next;
  }

  return starshipDetails;
}
