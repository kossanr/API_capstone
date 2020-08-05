const zipAPIKEY =
  "duPFbzHQfFWaRSOJACn7sh9sx0GKQQGDamCtW9nylUU1m8YAdZKTHTjRRTS8syCt";

const birdAPIKey = "r0vtns5mffqv";

function watchZipForm() {
  //watch for submit of zip code
  $("form").submit((e) => {
    e.preventDefault();
    const zipCode = $("#zip-code").val();
    if (zipCode !== "") {
      //if the zipCode is not blank
      const zipURL = `https://www.zipcodeapi.com/rest/${zipAPIKEY}/info.json/${zipCode}/degrees`;
    //get URL that contains my API key and val of #zip-code
      fetch(zipURL)
        .then((res) => res.json()) //formats into json
        .then((res) => {
          console.log(res);
        }

          //gather lat and long from zip code data
          // res.lat and res.lng. Create variables or an object with these? 
          const zipLat = res.items.lat;

          //pass same lat and long data into ebird URL
          //fetch that specific URL, format into JSON data
          //iterate through data and display birds that match such lat & long onto DOM




function getBirds() {

          const birdURL = `https://api.ebird.org/v2/data/obs/geo/recent?lat={{lat}}&lng={{lng}}`;

          var myHeaders = new Headers();
          myHeaders.append("X-eBirdApiToken", birdAPIKey);

          let options = {headers:myHeaders}
          
          fetch(birdAPIURL,options).then(res=>res.json()).then(res=>{
          if (i = 0; i < res.data.length; i++) {
            //append to "results" in HTML 


          }
          //})
        })
        .catch((err) => console.error({ err }));
    }}
  });
}

$(watchZipForm);
