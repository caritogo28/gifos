const API_KEY = "gScHgsNe7Y2Q0e3U3rKZJWc1X1HZa6uo";
const URL = "http://api.giphy.com/v1/gifs/search?";
const URL_Trend = "http://api.giphy.com/v1/gifs/trending?";
let image;
let hastag;
//http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5 responseData[i].images["480w_still"].url;
let arrayNode = document.querySelectorAll(".gif");
let arrayNodeHastag = [];
let trendincito = document.querySelector(".trends");
let arrayNodeImg = [];
let divi = [];

//3. respuesta de la Api dataApi
//Crear img y ponerle Trends
/* const render = async (responseData) => {
  for (let i of arrayNode.keys()) {
    image = document.createElement("img");
    image.src = await responseData[i].images.original.url;
    if ((responseData[i].images["480w_still"].width/responseData[i].images["480w_still"].height) < 1.4){
      image.className = "imgClass";
      image.className = "double";
      console.log(responseData[i].images["480w_still"].width)
    } else {image.className = "imgClass";
    console.log(responseData[i].images["480w_still"].width)}
    arrayNode[i].appendChild(image);

    let val = responseData[i].slug.includes(responseData[i].id);
    let id = responseData[i].id;
    console.log(val, id);
    if (val == true) {
      arrayNodeHastag[i].innerText = arrayNodeHastag[i].innerText.replace(id[i], "NO");
      console.log(val, id);
    }

    arrayNodeHastag[i].innerText = responseData[i].title;
    arrayNodeHastag[i].innerText = "#" + arrayNodeHastag[i].innerText.replace(/ +/g, " #");
    arrayNodeHastag[i].innerText = arrayNodeHastag[i].innerText.replace(/#by/g, "");
  }
  arrayNodeImg = document.querySelectorAll(".imgClass");

  return arrayNodeImg;
};
 */



const render = async (responseData) => {
  for (let i of responseData.keys()) {
          //Crear divs
          let createDivs = document.createElement("div");
          createDivs.className = "gif";

          
          if ((responseData[i].images["480w_still"].width/responseData[i].images["480w_still"].height) > 1.8){
            createDivs.className = "gif double";      
          }

          //Crear imágenes y traerlas
          image = document.createElement("img");
          image.setAttribute("loading","lazy");
          image.className = "imgClass";
          image.src = await responseData[i].images.downsized_medium.url;
          //Contenedor titulo
          let containerTitle = document.createElement("div");
          containerTitle.className = "trends_gif_title";
          //titulo
          let createH3 =  document.createElement("h3");

          containerTitle.appendChild(createH3);
          createDivs.appendChild(containerTitle);    
          createDivs.appendChild(image)
          trendincito.appendChild(createDivs);

          //Traer titulos
          let arrayNodeHastag = document.querySelectorAll("h3");
          arrayNodeHastag[i].innerText = responseData[i].title;
          arrayNodeHastag[i].innerText = "#" + arrayNodeHastag[i].innerText.replace(/ +/g, " #");
          arrayNodeHastag[i].innerText = arrayNodeHastag[i].innerText.replace(/#by/g, ""); 




/*     if ((responseData[i].images["480w_still"].width/responseData[i].images["480w_still"].height) < 1.4){
      console.log(responseData[i].images["480w_still"].width)

      
    } else {
    console.log(responseData[i].images["480w_still"].width)}
         */
/*     image = document.createElement("img");
    image.src = await responseData[i].images.original.url;
    arrayNode[i].appendChild(image);

    let val = responseData[i].slug.includes(responseData[i].id);
    let id = responseData[i].id;
    console.log(val, id);
    if (val == true) {
      arrayNodeHastag[i].innerText = arrayNodeHastag[i].innerText.replace(id[i], "NO");
      console.log(val, id);
    }

    arrayNodeHastag[i].innerText = responseData[i].title;
    arrayNodeHastag[i].innerText = "#" + arrayNodeHastag[i].innerText.replace(/ +/g, " #");
    arrayNodeHastag[i].innerText = arrayNodeHastag[i].innerText.replace(/#by/g, ""); */
  }
  arrayNodeHastag = document.querySelectorAll("h3");
  arrayNodeImg = document.querySelectorAll(".imgClass");

  return arrayNodeImg;
};

//Cambiar src por Search
const renderSearch = async (responseData) => {
  for (let i = 4; i < arrayNodeImg.length; i++) {
    divi = document.querySelectorAll(".gif");
    divi[i].className = "gif";  
    arrayNodeImg[i].setAttribute("src", responseData[i].images.downsized_medium.url);
    if ((responseData[i].images["480w_still"].width/responseData[i].images["480w_still"].height) > 1.8){
      divi[i].className = "gif double";      
    } 
    arrayNodeHastag[i].innerText = responseData[i].title;
    arrayNodeHastag[i].innerText = "#" + arrayNodeHastag[i].innerText.replace(/ +/g, " #");
    arrayNodeHastag[i].innerText = arrayNodeHastag[i].innerText.replace(/#by/g, "");
  }
};

//1. traer los datos
const dataTrend = async () => {
  let response = await fetch(`${URL_Trend}api_key=${API_KEY}&limit=15`);
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
