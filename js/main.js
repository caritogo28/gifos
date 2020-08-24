const API_KEY = "gScHgsNe7Y2Q0e3U3rKZJWc1X1HZa6uo";
const URL = "https://api.giphy.com/v1/gifs/search";
const URL_Trend = "https://api.giphy.com/v1/gifs/trending?";
let image;
//http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5 responseData[i].images["480w_still"].url;
let arrayNode = document.querySelectorAll(".gif");
let arrayNodeHastag = [];
let containerTrends = document.querySelector(".trends");
let containerSuggestion = document.querySelector(".suggestions");
let containerSearches = document.querySelector(".searches");
let arrayNodeImg = [];
let arrayGif = [];
let arrayWords = [];
let createDivs;

const create = function (element, clase) {
  createDivs = document.createElement(element);
  createDivs.className = clase;
};

const searchWords = function (searchWord) {
  let createSearchItem = document.createElement("a");
  createSearchItem.className = "searches_item";
  containerSearches.appendChild(createSearchItem);
  createSearchItem.innerText = `#${searchWord}`;
  createSearchItem.setAttribute("href", "#trends");

  createSearchItem.onclick = () => {
    document.querySelector(".trends h2").innerText = `${searchWord}:`;

    //2. capturar los datos
    dataApi(searchWord)
      .then((response) => renderSearch(response))
      .catch((error) => console.log(error, "hubo un error"));

    console.log(createSearchItem, searchWord);
  };
};

//3. respuesta de la Api dataApi
//Crear img y ponerle Trends

const renderSugg = async (responseData) => {
  for (let i = 0; i < 4; i++) {
    //Crear divs
    create("div", "gif gif-hover");

    //Crear imágenes y traerlas
    image = document.createElement("img");
    image.setAttribute("loading", "lazy");
    image.className = "imgClass";
    image.src = await responseData[i].images.downsized_medium.url;
    //Contenedor Título
    let containerTitle = document.createElement("div");
    containerTitle.className = "gif_title";
    //Título
    let createH3 = document.createElement("h3");
    //Botón
    let createA = document.createElement("a");
    createA.className = "more more-hover";
    createA.innerText = "Ver más...";
    createA.setAttribute("href", "#trends");

    containerTitle.appendChild(createH3);
    createDivs.appendChild(containerTitle);
    createDivs.appendChild(image);
    createDivs.appendChild(createA);
    containerSuggestion.appendChild(createDivs);

    //Traer titulos
    let arrayNodeHastag = document.querySelectorAll("h3");
    arrayNodeHastag[i].innerText = responseData[i].title;
    arrayNodeHastag[i].innerText = "#" + arrayNodeHastag[i].innerText.replace(/ +/g, " #");
    arrayNodeHastag[i].innerText = arrayNodeHastag[i].innerText.replace(/#by/g, "");

    //Agregarle link a los botones
    createA.onclick = () => {
      let titles = responseData[i].title;
      document.querySelector(".trends h2").innerText = `${titles}:`;

      //2. capturar los datos
      dataApi(titles)
        .then((response) => renderSearch(response))
        .catch((error) => console.log(error, "hubo un error"));

      console.log("holi", titles);
    };
  }
  arrayNodeHastag = document.querySelectorAll("h3");
  arrayNodeImg = document.querySelectorAll(".imgClass");

  return arrayNodeImg;
};

const render = async (responseData) => {
  for (let i = 4; i < responseData.length; i++) {
    //Crear divs

    createDivs = document.createElement("div");
    createDivs.className = "gif";

    if (responseData[i].images["480w_still"].width / responseData[i].images["480w_still"].height > 1.8) {
      createDivs.className = "gif double";
    }

    //Crear imágenes y traerlas
    image = document.createElement("img");
    image.setAttribute("loading", "lazy");
    image.className = "imgClass";
    image.src = await responseData[i].images.downsized_medium.url;
    //Contenedor titulo
    let containerTitle = document.createElement("div");
    containerTitle.className = "trends_gif_title";
    //titulo
    let createH3 = document.createElement("h3");

    containerTitle.appendChild(createH3);
    createDivs.appendChild(containerTitle);
    createDivs.appendChild(image);
    containerTrends.appendChild(createDivs);

    //Traer titulos
    let arrayNodeHastag = document.querySelectorAll("h3");
    arrayNodeHastag[i].innerText = responseData[i].title;
    arrayNodeHastag[i].innerText = "#" + arrayNodeHastag[i].innerText.replace(/ +/g, " #");
    arrayNodeHastag[i].innerText = arrayNodeHastag[i].innerText.replace(/#by/g, "");
  }
  arrayNodeHastag = document.querySelectorAll("h3");
  arrayNodeImg = document.querySelectorAll(".imgClass");

  return arrayNodeImg;
};

//Cambiar src por Search
const renderSearch = async (responseData) => {
  for (let i = 4; i < arrayNodeImg.length; i++) {
    arrayGif = document.querySelectorAll(".gif");
    arrayGif[i].className = "gif";
    arrayNodeImg[i].setAttribute("src", responseData[i].images.downsized_medium.url);
    if (responseData[i].images["480w_still"].width / responseData[i].images["480w_still"].height > 1.8) {
      arrayGif[i].className = "gif double";
    }
    arrayNodeHastag[i].innerText = responseData[i].title;
    arrayNodeHastag[i].innerText = "#" + arrayNodeHastag[i].innerText.replace(/ +/g, " #");
    arrayNodeHastag[i].innerText = arrayNodeHastag[i].innerText.replace(/#by/g, "");
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
  .then((response) => renderSugg(response))
  .catch((error) => console.log(error, "hubo un error"));

dataTrend()
  .then((response) => render(response))
  .catch((error) => console.log(error, "hubo un error"));

const dataApi = async (category) => {
  let response = await fetch(`${URL}?q=${category}&api_key=${API_KEY}&limit=25`);
  let data = await response.json();
  console.log(data.data);
  return data.data;
};

let newArray = [];
if (localStorage.getItem("searchWords")) {
  newArray = JSON.parse(localStorage.getItem("searchWords"));
}

//2. capturar los datos
document.getElementById("search_button").addEventListener("click", function () {
  let keywordSearch = document.querySelector(".search_input").value;
  newArray.push(keywordSearch);
  console.log("Nuevo array", newArray);
  localStorage.setItem("searchWords", JSON.stringify(newArray));
  /* arrayWords = localStorage.getItem("searchWords");
  arrayWords = JSON.parse(arrayWords); */
  searchWords(keywordSearch);
  console.log(keywordSearch, arrayWords);

  document.querySelector(".trends h2").innerText = `${keywordSearch}:`;

  //2. capturar los datos
  dataApi(keywordSearch)
    .then((response) => renderSearch(response))
    .catch((error) => console.log(error, "hubo un error"));
});

console.log("Nuevo array 2", newArray);
/* document.querySelector(".searches_item").addEventListener("click", function(){
  let titles = "holisss";
  document.querySelector(".trends h2").innerText = `${titles}:`;

  //2. capturar los datos
  dataApi(titles)
    .then((response) => renderSearch(response))
    .catch((error) => console.log(error, "hubo un error"));

  console.log("holi", titles);
}) */

//-----------Dropdown-----------
let dropdownTheme = document.querySelector(".dropbtn").addEventListener("click", expand);
console.log(dropdownTheme);

let dropdownSearch = document.querySelector(".search_input").addEventListener("click", function () {
  let dropdown = document.querySelectorAll(".dropdown");
  dropdown.forEach((drop) => {
    drop.classList.toggle("dropdown-show");
  });
  document.querySelector(".search_button").className = "search_button search_button-input";
});
console.log(dropdownSearch);

function expand() {
  let dropdown = document.querySelectorAll(".dropdown");
  dropdown.forEach((drop) => {
    drop.classList.toggle("dropdown-show");
  });
}

window.onclick = function (e) {
  let dropdown = document.getElementById("dropdown");
  let keyword = document.getElementById("search_dropdown");
  let searchBtn = document.querySelector(".search_button");
  // close all
  if (!e.target.matches(".dropbtn") && !e.target.matches(".search_input")) {
    dropdown.classList.remove("dropdown-show");
    // keyword.classList.remove('showK');
  }
  // close search
  if (e.target.matches(".search_input")) {
    dropdown.classList.remove("dropdown-show");
    if ((searchBtn.className = "search_button search_button-input")) {
      searchBtn.classList.remove("search_button-input");
    }
  }
  // close dropdown
  if (e.target.matches(".dropbtn")) {
    keyword.classList.remove("dropdown-show");
  }
};

window.onload = function (e) {
  let arrayW = localStorage.getItem("searchWords");
  arrayW = JSON.parse(arrayW);
  console.log("array local", arrayW);
  for (let i = 0; i < arrayW.length; i++) {
    searchWords(arrayW[i]);
  }
};

//Crear botones

const dataApiWord = async (word) => {
  let response = await fetch(`${URL}/tags?q=${word}&api_key=${API_KEY}`);
  let data = await response.json();
  console.log(data.data);
  return data.data;
};

//Barra de buscador

document.getElementById("search").addEventListener("keypress", onKeyDown);
let word = "";
let vector = new Array();
const elementos = document.querySelectorAll(".search_word");
let dropcont = document.querySelector(".dropdown-search");

document.getElementById("search").addEventListener("keydown", borrar);
function borrar(event) {
  const key = event.key;
  if (key === "Backspace" || key === "Delete") {
    word = "";
  }
}
function onKeyDown(event) {
  let key = event.key; // "A", "1", "Enter", "ArrowRight"...
  console.log(key);
  word += key;

  dataApiWord(word)
    .then((response) => ciclo(response))
    .catch((error) => console.log(error));
}
function ciclo(array) {
  for (let i of array.keys()) {
    vector.push(array[i].name);
    let createRel = document.createElement("a");
    createRel.className = "search_word";
    createRel.innerText = vector[i];
    createRel.setAttribute("href", "#trends");
    dropcont.appendChild(createRel);

    createRel.onclick = () => {
      document.querySelector(".trends h2").innerText = `${createRel.text}:`;

      //2. capturar los datos
      dataApi(createRel.text)
        .then((response) => renderSearch(response))
        .catch((error) => console.log(error, "hubo un error"));

      console.log(createRel, createRel.text);
    };
    if (i >= 2) {
      break;
    }
  }

  vector = [];
}
