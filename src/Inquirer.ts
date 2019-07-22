import inquirer from "inquirer";
import { get } from "./http.service";
import {
  StarwarsModule,
  StarshipValue,
  PilotValue,
  StarshipAnswer,
  PilotAnswer
} from "./starwars.model";

export function InquirerQ(
  starshipsResponse: StarwarsModule<StarshipValue>[]): void {
  inquirer.prompt(Questions(starshipsResponse)).then(answers => {
    console.info("Ship Selected:", answers.starship.name);
    console.info("Pilot Selected:", answers.pilot.name);
    console.info("Pilot Details", answers.pilot);
  });
}

export function Questions(
  starshipsResponse: StarwarsModule<StarshipValue>[]
): inquirer.ListQuestion<StarshipAnswer & PilotAnswer>[] {
  let starshipQuestion: inquirer.Question<PilotAnswer> = {
    type: "list",
    name: "starship",
    message: "Select a Starship",
    choices: starshipsResponse
  };

  let pilotQuestion: inquirer.Question<StarshipAnswer> = {
    type: "list",
    name: "pilot",
    message: "Select Pilot",
    choices(answers) {
      return GetPilots(answers.starship.pilotUrls);
    }
  };
  return [starshipQuestion, pilotQuestion];
}

async function GetPilots(
  pilotUrls: string[]
): Promise<StarwarsModule<PilotValue>[]> {
  let pilotDetails: StarwarsModule<PilotValue>[] = [];

  if (pilotUrls.length === 0) {
    pilotDetails.push({
      name: "No Pilots",
      value: {
        name: "No Details found",
        height: 0
      }
    });
    return pilotDetails;
  }

  for (let i = 0; i < pilotUrls.length; i++) {
    const pilot = await get(pilotUrls[i]);

    pilotDetails.push({
      name: pilot.data.name,
      value: {
        name: pilot.data.name,
        height: pilot.data.height
      }
    });
  }
  return pilotDetails;
}
