#!/usr/bin/env node

const axios = require('axios');
const inquirer = require('inquirer');


let starShipResponse = [];
let starShipsAPI;


; (async () => {
  for (i = 1; i <= 4; i++) {


    starShipsAPI = await axios({

      url: `https://swapi.co/api/starships/?page=${i}`,
      method: 'get'

    });

    starShipResponse.push(...starShipsAPI.data.results);

  }

  // function arrayToObject(array, keyField) {
  //   let finalObj = {};



  //   array.forEach(element => {
  //     const newKey = element[keyField];

  //     finalObj = {
  //       ...finalObj,
  //       [newKey]: element
  //     };
  //   });

  //   return finalObj;

  // };

  //const ShipObj = arrayToObject(starShipResponse, "name");


  function getStarships() {
    let shipObj = [];
    for (i = 0; i < starShipResponse.length; i++) {


      shipObj.push({
        name: starShipResponse[i].name,
        value: {
          name: starShipResponse[i].name,
          url: starShipResponse[i].pilots
        }
      });

      // shipObj = {...shipObj,
      //   [newKey]: [
      //     name = starShipResponse[i].name,
      //     value = {
      //     url = gettingPilots
      //     }
      //   ]
      // }
    }

    //  console.log(shipObj);
    return shipObj;
  }


  let StarshipQ = [{
    type: 'list',
    name: 'Starships',
    message: 'Select a Starship',
    choices: getStarships()
  },
  {
    type: 'list',
    name: 'Pilots',
    message: 'Select Pilot',
    choices(answers) { return GetPilots(answers.Starships) }
  }];

  async function GetPilots(StarshipKey) {
    StarshipKey = StarshipKey.url;
 
    let array = [];

    if(StarshipKey.length === 0) {
      array.push('No Pilots pilot this Ship');
      return array;
    } 
    // else {
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
  //}
    //console.log(array);
    return array

  };



  inquirer.prompt(StarshipQ).then(answers => {
    console.info('Ship Selected:', answers.Starships.name);
    console.info('Pilot Selected:', answers.Pilots.name);
    console.info('Pilot Details', answers.Pilots);


  });


})()