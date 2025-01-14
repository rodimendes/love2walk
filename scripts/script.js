let currentYear = document.querySelector(".currentYear");

let year = new Date();

currentYear.innerHTML = year.getFullYear();

let x = document.getElementById("demo");

const options = {
  enableHighAccuracy: true,
  maximumAge: 0, // Não usar cache
};

function getLocation(callback) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // let lat = position.coords.latitude;
        // let lon = position.coords.longitude;
        // let accuracy = position.coords.accuracy;

        // console.log("Latitude:", lat);
        // console.log("Longitude:", lon);
        // console.log("Precisão (em metros):", accuracy);

        if (callback) {
          callback(position); // Pass position to callback
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error.message);
      },
      options
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  sendCoordinatesToServer(latitude, longitude);

  let coordinates = { latitude, longitude };

  // x.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
  return coordinates;
}

function sendCoordinatesToServer(lat, lng) {
  // console.log("Sending coordinates:", lat, lng);
}

// HOW THE FOLLOWING FUNCTION WORKS?

document.getElementById("submitButton").addEventListener("click", function () {
  const obstacle = document.getElementById("typeObstacle").value;
  const gravity = document.getElementById("gravityLevel").value;
  const quickIntervention =
    document.getElementById("quickIntervention").checked;

  getLocation((position) => {
    let coordinates = showPosition(position); // Pass position to showPosition

    console.log("Type of obstacle: ", obstacle);
    console.log("Gravity level: ", gravity);
    console.log("Quick intervention: ", quickIntervention);
    console.log("Coordinates: ", coordinates.latitude, coordinates.longitude);
  });
});

// TODO: storing data as JSON format
