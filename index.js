const zipAPIKEY =
  "duPFbzHQfFWaRSOJACn7sh9sx0GKQQGDamCtW9nylUU1m8YAdZKTHTjRRTS8syCt";

function watchZipForm() {
  $("form").submit((e) => {
    e.preventDefault();
    const zipCode = $("#zip-code").val();
    if (zipCode !== "") {
      const zipURL = `https://www.zipcodeapi.com/rest/${zipAPIKEY}/info.json/${zipCode}/degrees`;

      fetch(zipURL)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // res.lat, res.lng
          // https://api.ebird.org/v2/data/obs/geo/recent?lat={{lat}}&lng={{lng}}
          //var myHeaders = new Headers();
          //myHeaders.append("X-eBirdApiToken", birdAPIKey);
          // let options = {headers:myHeaders}
          // fetch(birdAPIURL,options).then(res=>res.json()).then(res=>{
          // now iterate and display
          //})
        })
        .catch((err) => console.error({ err }));
    }
  });
}

$(watchZipForm);
