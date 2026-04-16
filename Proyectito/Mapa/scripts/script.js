// 1) Choose a default center (Monterrey example). Change to your location.
const center = [25.50124, -103.55115];
const zoom = 16;

const dialog = document.querySelector(".popup");
const buttonCancel = document.querySelector(".button-cancel");
const buttonSave = document.querySelector(".button-save");
const inputlatitude = document.querySelector(".input-latitude");
const inputlongitude = document.querySelector(".input-longitude");
const placeName = document.querySelector(".place-name");
const betweenStreets = document.querySelector(".between-streets");
const customIcon = L.icon({
  iconUrl: "./images/estrellita.ico",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const supaBaseUrl = "https://cvceeezemclvemnivtzo.supabase.co";
const supaBaseKey = "sb_publishable_OCFbuBpYOzWvDlC9Jdem7Q_HpQPGRxH";
supabase = window.supabase.createClient(supaBaseUrl, supaBaseKey);
const v1 = document.querySelector("#title");
v1.textContent = "Universidad Tecnologica de la laguna de durango";


// 2) Create the map
const map = L.map("map").setView(center, zoom);

async function loadSavedIcons(){
  const {data,error} = await supabase.from("coordinates").select("*");

  if (error){ 
    console.log("Error from supabase" , error);
    return;
  }

  array.forEach((element) => {
   clickMarker = L.marker([lat, lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(`Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`);
    
  });
}

buttonCancel.addEventListener("click", () => {
  dialog.close();
});
// otro campo para guardar las entrecalles betweenstreets
buttonSave.addEventListener("click", async (e) => {
  e.preventDefault();
  const lat = inputlatitude.value;
  const lng = inputlongitude.value;
  const pln = placeName.value;
  const streets = betweenStreets.value;
  const { error } = await supabase.from("coordinates").insert([
    {
      lat: lat,
      lng: lng,
      placeName: pln,
      betweenstreets: streets,
    },
  ]);

  dialog.close();
});

// 3) Add the OpenStreetMap tiles
// Note: respect OSM tile usage policy for production/high traffic.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// 4) Add a marker + popup
L.marker(center).addTo(map).bindPopup(v1.textContent).openPopup();

// 5) Click handler (drops a marker where you click)
let clickMarker = null;



map.on("click", async (e) => {
  const { lat, lng } = e.latlng;

  inputlatitude.value = lat;
  inputlongitude.value = lng;

  dialog.showModal();
  //if (clickMarker) map.removeLayer(clickMarker); para borraar el anterior

  clickMarker = L.marker([lat, lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(`Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`);

  clickMarker.openPopup();
});