const API_KEY = "gScHgsNe7Y2Q0e3U3rKZJWc1X1HZa6uo";
const URL = "http://api.giphy.com/v1/gifs/search?";
const URL_Trend = "http://api.giphy.com/v1/gifs/trending?";
let image;
let hastag;
//http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5
let arrayNode = document.querySelectorAll(".gif");
let arrayNodeImg = [];
let arrayNodeHastag = document.querySelectorAll("h3");

//3. respuesta de la Api dataApi
//Crear img y ponerle Trends
const render = async (responseData) => {
  for (let i of arrayNode.keys()) {
    image = document.createElement("img");
    image.src = await responseData[i].images.fixed_height.url;
    image.className = "imgClass";
    arrayNode[i].appendChild(image);

    let val = responseData[i].slug.includes(responseData[i].id);
    let id = responseData[i].id;
    console.log(val, id);
    if (val == true) {
      arrayNodeHastag[i].innerText = arrayNodeHastag[i].innerText.replace(id[i], "NO");
      console.log(val, id);
    }

    arrayNodeHastag[i].innerText = responseData[i].slug;
    arrayNodeHastag[i].innerText = "#" + arrayNodeHastag[i].innerText.replace(/-/g, " #");
  }
  arrayNodeImg = document.querySelectorAll(".imgClass");

  return arrayNodeImg;
};

//Cambiar src por Search
const renderSearch = async (responseData) => {
  console.log(arrayNodeImg);
  for (let i = 4; i < arrayNodeImg.length; i++) {
    arrayNodeImg[i].setAttribute("src", responseData[i].images.fixed_height.url);
    arrayNodeHastag[i].innerText = responseData[i].slug;
    arrayNodeHastag[i].innerText = "#" + arrayNodeHastag[i].innerText.replace(/-/g, " #");
  }
};

//1. traer los datos
const dataTrend = async () => {
  let response = await fetch(`${URL_Trend}api_key=${API_KEY}&limit=25`);
  let data = await response.json();
  console.log(data.data);
  return data.data;
};

dataTrend()
  .then((response) => render(response))
  .catch((error) => console.log(error, "hubo un error"));

const dataApi = async (category) => {
  let response = await fetch(`${URL}q=${category}&api_key=${API_KEY}&limit=20`);
  let data = await response.json();
  console.log(data.data);
  return data.data;
};
//2. capturar los datos
document.getElementById("search_button").addEventListener("click", function () {
  let keywordSearch = document.querySelector(".search_input").value;
  console.log(keywordSearch);
  document.querySelector(".trends h2").innerText = `${keywordSearch}:`;
  //2. capturar los datos
  dataApi(keywordSearch)
    .then((response) => renderSearch(response))
    .catch((error) => console.log(error, "hubo un error"));
});

//-----------Dropdown-----------
let dropdownTheme = document.querySelector(".dropbtn").addEventListener("click", expand);
console.log(dropdownTheme);

let dropdownSearch = document.querySelector(".search_input").addEventListener("click", expand);
console.log(dropdownSearch);

function expand() {
  let dropdown = document.querySelectorAll(".dropdown");
  dropdown.forEach((drop) => {
    drop.classList.toggle("dropdown-show");
  });
}

window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var dropdownButton = document.querySelector(".dropdown");
    if (dropdownButton.classList.contains("dropdown-show")) {
      dropdownButton.classList.remove("dropdown-show");
    }
  }
};

// Cerrar cuando da click por fuera
/* function dropdown() {
  document.querySelector(".dropdown").classList.toggle("dropdown-show");
}
window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var dropdownButton = document.querySelector(".dropdown");
    if (dropdownButton.classList.contains("dropdown-show")) {
      dropdownButton.classList.remove("dropdown-show");
    }
  }
}; */

//-----
