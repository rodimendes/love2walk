let currentYear = document.querySelector(".currentYear");

let year = new Date();

currentYear.innerHTML = year.getFullYear();

let x = document.getElementById("demo");

const options = {
  enableHighAccuracy: true,
  maximumAge: 0, // Não usar cache
};

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
        console.log("Precisão (em metros):", position.coords.accuracy);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let accuracy = position.coords.accuracy;

        return { lat, lon, accuracy };
      },
      (error) => {
        console.error("Erro ao obter localização:", error.message);
      },
      options
    );
  }
}
// ###########

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  sendCoordinatesToServer(latitude, longitude);

  let coordinates = { latitude, longitude };

  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
  return coordinates;
}

function sendCoordinatesToServer(lat, lng) {
  console.log("Sending coordinates:", lat, lng);
}

document.getElementById("submitButton").addEventListener("click", function () {
  const obstacle = document.getElementById("typeObstacle").value;
  const gravity = document.getElementById("gravityLevel").value;
  const quickIntervention =
    document.getElementById("quickIntervention").checked;
  let coordinates = showPosition(position);

  console.log("Type of obstacle: ", obstacle);
  console.log("Gravity level: ", gravity);
  console.log("Quick intervention: ", quickIntervention);
  console.log("Coordinates: ", coordinates.latitude);
});
