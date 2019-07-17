#!/usr/bin/env node

const axios = require('axios');
const inquirer = require('inquirer');


getAPI();



async function getAPI() {

  let StarshipUrl = `https://swapi.co/api/starships/`;  
  let starShipResponse = [];

  while (StarshipUrl != null) {

    const starShipsAPI = await axios.get(StarshipUrl);

    for (i = 0; i < starShipsAPI.data.results.length; i++) {
      let ShipName = starShipsAPI.data.results[i].name;
      let PilotUrls = starShipsAPI.data.results[i].pilots;

      starShipResponse.push({
        name: ShipName,
        value: {
          name: ShipName,
          url: PilotUrls
        }
      });

    }
    StarshipUrl = starShipsAPI.data.next;
    
  }
  InquirerQ(starShipResponse);
}


function Questions(starShipResponse) {
  return [{
    type: 'list',
    name: 'Starships',
    message: 'Select a Starship',
    choices: starShipResponse
  },
  {
    type: 'list',
    name: 'Pilots',
    message: 'Select Pilot',
    choices(answers) { return GetPilots(answers.Starships) }
  }];

}

async function GetPilots(StarshipKey) {
  StarshipKey = StarshipKey.url;

  let array = [];

  if (StarshipKey.length === 0) {
    array.push({
      name: "No Pilots",
      value: {
        name: "No Details found",
       
      }
    });
    return array;
  }

  for (i = 0; i < StarshipKey.length; i++) {
    let pilot = await axios({
      url: StarshipKey[i],
      method: 'get'
    });
    array.push({
      name: pilot.data.name,
      value: {
        name: pilot.data.name,
        height: pilot.data.height
      }
    });
  }

  return array

};

function InquirerQ(starShipResponse) {

  inquirer.prompt(Questions(starShipResponse)).then(answers => {
    console.info('Ship Selected:', answers.Starships.name);
    console.info('Pilot Selected:', answers.Pilots.name);
    console.info('Pilot Details', answers.Pilots);
  });
}
