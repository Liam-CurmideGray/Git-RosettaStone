const axios = require('axios');


; (async () => {
let count = 0;
 for (i = 1; i <= 4; i++) {
   count++;
   console.log(count);
   let starShips = await axios({
     
     url: `https://swapi.co/api/starships/?page=${i}`,
     method: 'get'

   }); 
   

   let startShipResponse = starShips.data.results;
   
   for (k = 0; k < startShipResponse.length; k++) {

     console.log("name", startShipResponse[k].name);

     for (j = 0; j < startShipResponse[k].pilots.length; j++) {

       let pilotUrl = startShipResponse[k].pilots[j];

       let pilot = await axios({
         url: pilotUrl,
         method: 'get'

       });

       console.log(pilot.data.name);

     }

     console.log("");
   }
 }
})()