//Load bar
let loadBar = () => {
  for (let i=0; i<30; i++) {
    let itemLoad = document.createElement("div");
    let loader = document.querySelector(".loading_bar")
    itemLoad.className = "loading_item";
    loader.appendChild(itemLoad);
  }
}

let loadBarGif = () => {
  for (let i=0; i<15; i++) {
    let itemLoadGif = document.createElement("div");
    let loaderGif = document.querySelector(".loader")
    itemLoadGif.className = "load_item loaded";
    loaderGif.appendChild(itemLoadGif);
  }
}

//Cronómetro
let timeout = 0;

function chronometer() {
  if (timeout == 0) {
    start = vuelta = new Date().getTime();
    startChronometer();
  } else {
    clearTimeout(timeout);
    timeout = 0;
  }
}

function startChronometer() {
  let now = new Date().getTime();
  let difference = new Date(now - start);
  let durationGif =
    LeadingZero(difference.getUTCHours()) + ":" + LeadingZero(difference.getUTCMinutes()) + ":" + LeadingZero(difference.getUTCSeconds());
  document.getElementById("time").innerHTML = durationGif;
  timeout = setTimeout("startChronometer()", 1000);
}

function LeadingZero(Time) {
  return Time < 10 ? "0" + Time : +Time;
}


//Dropdown
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
/* function myFunction() {
  document.getElementById("myDropdown").classList.toggle("dropdown-show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains("dropdown-show")) {
      myDropdown.classList.remove("dropdown-show");
    }
  }
}; */

//3. respuesta de la Api dataApi
/* const render = async (responseData) => {
  arrayNode.forEach((valor, index) => {
    let image = document.createElement("img");
    image.src = responseData[index].images.fixed_height.url;
    arrayNode[index].appendChild(image);
  });
}; */

