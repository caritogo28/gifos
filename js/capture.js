const APIKey = "gScHgsNe7Y2Q0e3U3rKZJWc1X1HZa6uo";
const URL_UPLOAD = "http://upload.giphy.com/v1/gifs";
const URL_IDGIF = "http://api.giphy.com/v1/gifs";

let video = document.querySelector("video");
let title = document.querySelector(".pre_capture_title h1");

let recorder;
let form = new FormData();

let myGifsArray = [];
if (localStorage.getItem("myGifs")) {
  myGifsArray = JSON.parse(localStorage.getItem("myGifs"));
}
let myGif;
let saveGifs;

//Para adicionar Class
let addClass = (nodeAdd, classAdd) => {
  document.querySelector(nodeAdd).classList.add(classAdd);
};
//Para quitar Class
let removeClass = (node, classRemove) => {
  document.querySelector(node).classList.remove(classRemove);
};

let reLoad = () => {
  location.reload(true);
}
//Cerrar
document.querySelector("#close").onclick = () => {
  reLoad();
}
document.querySelector("#close_uploaded").onclick = () => {
  reLoad();
}
document.querySelector("#cancel").onclick = () => {
  reLoad();
}

//Repetir captura
document.querySelector("#repeat").onclick = () => {
  reLoad();
}

//Listo
document.querySelector("#ready").onclick = () => {
  reLoad();
}

//Prender la cámara
document.getElementById("start").onclick = () => {
  addClass(".pre_capture", "hidden");
  removeClass(".recording", "hidden");
  document.querySelector(".container_btn").style.display = "none";
  addClass(".mygifs", "hidden");
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        width: { ideal: 832 },
        height: {
          ideal: 434,
        },
      },
    })
    .then((stream) => {
      document.getElementById("video").srcObject = stream;
    });
};

//Comenzar a grabar
document.getElementById("btn-start-recording").onclick = () => {
  addClass("#btn-start-recording", "hidden");
  document.querySelector(".container_btn").style.display = "flex";
  document.querySelector(".load").style.display = "none";
  title.innerText = "Capturando Tu Guifo";
  chronometer();
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        width: { ideal: 832 },
        height: {
          ideal: 434,
        },
      },
    })
    .then((stream) => {
      video.srcObject = stream;
      recorder = RecordRTC(stream, {
        type: "gif",
      });

      recorder.startRecording();
    });
};

//Parar de grabar
document.getElementById("btn-stop-recording").onclick = () => {
  video.src = video.srcObject = null;
  //this.disabled = true; para que el botón se vea desactivado
  chronometer();

  recorder.stopRecording(() => {
    addClass("#video", "hidden");
    addClass(".stop_btn", "hidden");
    document.querySelector(".load").style.display = "flex";
    removeClass(".preview_buttoms", "hidden");
    loadBarGif();
    title.innerText = "Vista previa";
    let containerGif = document.createElement("img");
    containerGif.classList.add("new-gif");
    document.querySelector("#container-gif").appendChild(containerGif);
    document.querySelector(".new-gif").src = URL.createObjectURL(recorder.getBlob());
    newGif = URL.createObjectURL(recorder.getBlob());

    form.append("file", recorder.getBlob(), "newGif.gif");
    console.log(form.get("file"));
  });
};

//Subir gif
document.getElementById("preview_start").onclick = () => {
  addClass(".recording", "hidden");
  removeClass(".upload", "hidden");
  loadBar();
  removeClass(".mygifs", "hidden");
  fetch(`${URL_UPLOAD}?api_key=${APIKey}&username=carolinagomezsanchez&source_image_url=${URL.createObjectURL(recorder.getBlob())}`, {
    method: "post",
    body: form,
    id: "gifCaro",
  })
    .then(async (response) => {
      addClass(".upload", "hidden");
      removeClass(".uploaded", "hidden");
      removeClass(".mygifs", "hidden");
      let dataUpload = await response.json();
      let idGif = dataUpload.data.id;
      let gifContainer = document.querySelector(".uploaded_gif");
      myGif = await urlGif(idGif);
      gifContainer.src = myGif;
      myGifsArray.push(myGif);
      console.log(`Debería agregarse el nuevo gif ${myGifsArray}`);
      localStorage.setItem("myGifs", JSON.stringify(myGifsArray));
      console.log(myGifsArray);
      let btnCopyGif = document.querySelector("#copy");
      let btnUrlGif = document.querySelector("#download");
      let urlMyGif = await urlGifLink(idGif);
      console.log(urlMyGif);
      btnCopyGif.setAttribute("href", urlMyGif);
      btnCopyGif.setAttribute("target", "_blank");
      btnUrlGif.setAttribute("href", urlMyGif);
      btnUrlGif.setAttribute("target", "_blank");
      console.log("Boton", urlMyGif, btnUrlGif);
    })
    .catch((err) => console.error(err));
};

//Link Gif subido
async function urlGif(id) {
  let response = await fetch(`${URL_IDGIF}/${id}?api_key=${APIKey}`);
  let data = await response.json();
  console.log("La data", data)
  let urlImg = await data.data.images.downsized_large.url;
  return urlImg;
}

async function urlGifLink(id) {
  let response = await fetch(`${URL_IDGIF}/${id}?api_key=${APIKey}`);
  let data = await response.json();
  console.log("La data", data)
  let urlGif = await data.data.url;
  return urlGif;
}

window.onload = function (e) {
  let savedGifs = localStorage.getItem("myGifs");
  savedGifs = JSON.parse(savedGifs);
  console.log("array localGif", savedGifs);
  for (let i = 0; i < savedGifs.length; i++) {
    let contenedor = document.querySelector(".mygifs");
    let myGifCont = document.createElement("div");
    myGifCont.className = "gif gif-hover";
    let image = document.createElement("img");
    image.src = savedGifs[i];
    console.log(`Renderizar ${savedGifs[i]}`);
    myGifCont.appendChild(image);
    contenedor.appendChild(myGifCont);
  }
};

