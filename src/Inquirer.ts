import inquirer from "inquirer";
import clear = require("clear");
import { Spinner } from "clui";

import { get } from "./http.service";
import { startAnimation, stopAnimation } from "./loader.animation";
import {
  StarwarsModule,
  StarshipValue,
  PilotValue,
  StarshipAnswer,
  PilotAnswer
} from "./starwars.model";

export function inquirerQ(
  starshipsResponse: StarwarsModule<StarshipValue>[],
  buffer: Spinner
): void {
  inquirer
    .prompt(starwarsQuestions(starshipsResponse, buffer))
    .then(answers => {
      console.info("Ship Selected:", answers.starship.name);
      console.info("Pilot Selected:", answers.pilot.name);
      console.info("Pilot Details", answers.pilot);

      inquirer.prompt(clearQuestion()).then(answer => {
        if (answer.clearAns == "Yes") {
          clear();
        }
      });
    });
}

export function starwarsQuestions(
  starshipsResponse: StarwarsModule<StarshipValue>[],
  buffer: Spinner
): inquirer.ListQuestion<StarshipAnswer & PilotAnswer>[] {
  stopAnimation(buffer);

  const starshipQuestion: inquirer.Question<PilotAnswer> = {
    type: "list",
    name: "starship",
    message: "Select a Starship",
    choices: starshipsResponse
  };

  const pilotQuestion: inquirer.Question<StarshipAnswer> = {
    type: "list",
    name: "pilot",
    message: "Select Pilot",
    choices(answers) {
      buffer = startAnimation();
      return getPilots(answers.starship.pilotUrls, buffer);
    }
  };
  return [starshipQuestion, pilotQuestion];
}

export function clearQuestion(): inquirer.ListQuestion<Record<string, any>> {
  let clearQ: inquirer.Question<Record<string, any>> = {
    type: "list",
    name: "clearAns",
    message: "Clear Terminal?",
    choices: [`Yes`, `No`]
  };

  return clearQ;
}

async function getPilots(
  pilotUrls: string[],
  buffer: Spinner
): Promise<StarwarsModule<PilotValue>[]> {
  let pilotDetails: StarwarsModule<PilotValue>[] = [];

  if (pilotUrls.length === 0) {
    stopAnimation(buffer);
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
  stopAnimation(buffer);
  return pilotDetails;
}
