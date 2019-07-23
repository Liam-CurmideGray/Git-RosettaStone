import inquirer from "inquirer";
import { get as Get } from "./http.service";
import clear = require("clear");
import { StartAnimation, StopAnimation } from "./loaderAnimation";
import {
  StarwarsModule,
  StarshipValue,
  PilotValue,
  StarshipAnswer,
  PilotAnswer
} from "./starwars.model";
import { Spinner } from "clui";

export function InquirerQ(
  starshipsResponse: StarwarsModule<StarshipValue>[],
  buffer: Spinner
): void {
  inquirer
    .prompt(StarwarsQuestions(starshipsResponse, buffer))
    .then(answers => {
      console.info("Ship Selected:", answers.starship.name);
      console.info("Pilot Selected:", answers.pilot.name);
      console.info("Pilot Details", answers.pilot);

      inquirer.prompt(ClearQuestion()).then(answer => {
        if (answer.clearAns == "Yes") {
          clear();
        }
      });
    });
}

export function StarwarsQuestions(
  starshipsResponse: StarwarsModule<StarshipValue>[],
  buffer: Spinner
): inquirer.ListQuestion<StarshipAnswer & PilotAnswer>[] {
  StopAnimation(buffer);

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
      buffer = StartAnimation();
      return GetPilots(answers.starship.pilotUrls, buffer);
    }
  };
  return [starshipQuestion, pilotQuestion];
}

export function ClearQuestion(): inquirer.ListQuestion<Record<string, any>> {
  let clearQ: inquirer.Question<Record<string, any>> = {
    type: "list",
    name: "clearAns",
    message: "Clear Terminal?",
    choices: [`Yes`, `No`]
  };

  return clearQ;
}

async function GetPilots(
  pilotUrls: string[],
  buffer: Spinner
): Promise<StarwarsModule<PilotValue>[]> {
  let pilotDetails: StarwarsModule<PilotValue>[] = [];
  
  if (pilotUrls.length === 0) {
    StopAnimation(buffer);
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
    const pilot = await Get(pilotUrls[i]);

    pilotDetails.push({
      name: pilot.data.name,
      value: {
        name: pilot.data.name,
        height: pilot.data.height
      }
    });
  }
  StopAnimation(buffer);
  return pilotDetails;
}
