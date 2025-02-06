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

let obstacle;
let gravity;
let quickIntervention;

document.getElementById("submitButton").addEventListener("click", function () {
  obstacle = document.getElementById("typeObstacle").value;
  gravity = document.getElementById("gravityLevel").value;
  quickIntervention = document.getElementById("quickIntervention").checked;

  getLocation((position) => {
    let occurrence = {
      obstacleType: obstacle,
      gravityLevel: gravity,
      quickInterventionNeeded: quickIntervention,
      coordLatitude: position.coords.latitude,
      coordLongitude: position.coords.longitude,
      coordinatesAccuracy: position.coords.accuracy,
    };
    let occurrenceJSON = JSON.stringify(occurrence);
    console.log(occurrenceJSON);
  });
});

// HOW TO SAVE THE OBJECT
