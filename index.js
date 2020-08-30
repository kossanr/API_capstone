const zipAPIKEY =
  "js-qSvR4eXAk9EwtmBg3atyhrcVCc0l282T7mFTuQjGGXnc0kf9SWanc7ndzgLVvXDk";

/* zipcodeapi.com app code - "VIwRHliTEf4e1Jys4hIIqlolFlOYeqf13UBd1oPcFtHvk2bKkqYO3P5O7wfqn5Xh"; */
const birdAPIKey = "r0vtns5mffqv";

function watchZipForm() {
  $("form").submit((e) => {
    e.preventDefault();
    const zipCode = $("#zip-code").val();
    if (zipCode !== "") {
      const zipURL = `https://www.zipcodeapi.com/rest/${zipAPIKEY}/info.json/${zipCode}/degrees`;
      fetch(zipURL)
        .then((res) => res.json())
        .then((res) => {
          getBirds(res);
        })
        .catch((err) => alert("Please try again later"));
    } else {
      alert("Please enter Zip Code");
    }
  });
}

function getBirds(res) {
  const birdAPIURL = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${res.lat}&lng=${res.lng}`;

  var myHeaders = new Headers();
  myHeaders.append("X-eBirdApiToken", birdAPIKey);

  let options = {
    headers: myHeaders,
  };

  fetch(birdAPIURL, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((responseJson) => displayResults(responseJson, res.city, res.state))
    .catch((err) => {
      $(".error-message").text(`Something went wrong: ${err}`);
    });
}

function displayResults(responseJson, city, state) {
  $(".results-list").html("");
  $(".num-of-results").text(responseJson.length);

  $(".results").removeClass("hidden");

  $(".results h2").text(`Results for ${city}, ${state}`);

  for (i = 0; i < responseJson.length; i++) {
    let html = `<li class="bird-sighting"><span class="name"><a href ="https://en.wikipedia.org/wiki/${
      responseJson[i].comName
    }">${responseJson[i].comName}</a></span><span class="obs-date">${
      responseJson[i].obsDt
    }</span><span class="location">${
      responseJson[i].locName.split("--")[0]
    }</span>`;

    if (responseJson[i].locName.split("--")[1] !== undefined) {
      html += `<span class="sub-location">${
        responseJson[i].locName.split("--")[1]
      }</span>`;
    }

    html += "</li>";
    $(".results-list").append(html);
  }
}

$(watchZipForm);
