const APIKey = "gScHgsNe7Y2Q0e3U3rKZJWc1X1HZa6uo";
const URL_UPLOAD = "http://upload.giphy.com/v1/gifs";
const URL_IDGIF = "http://api.giphy.com/v1/gifs";

let video = document.querySelector("video");
let title = document.querySelector(".pre_capture_title h1");

let recorder;
let form = new FormData();

let myGifsArray = [];
console.log(`El array debe estar vacio ${myGifsArray}`);
console.log(myGifsArray);
localStorage.setItem("myGifs", myGifsArray);
let myGif;
let saveGifs;

let timeout = 0;

//Para adicionar Class
let addClass = (nodeAdd, classAdd) => {
  document.querySelector(nodeAdd).classList.add(classAdd);
};
//Para quitar Class
let removeClass = (node, classRemove) => {
  document.querySelector(node).classList.remove(classRemove);
};

//Cerrar
document.querySelector("#close").onclick = () => {
  removeClass(".pre_capture", "hidden");
  addClass(".capture", "hidden");
};

//prender la cámara
document.getElementById("start").onclick = () => {
  addClass(".pre_capture", "hidden");
  removeClass(".recording", "hidden");
  document.querySelector(".container_btn").style.display = "none";

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
  /* 
  removeClass("#btn-stop-recording", "hidden");
  removeClass(".time", "hidden"); */
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

  fetch(`${URL_UPLOAD}?api_key=${APIKey}&username=carolinagomezsanchez&source_image_url=${URL.createObjectURL(recorder.getBlob())}`, {
    method: "post",
    body: form,
    id: "gifCaro",
  })
    .then(async (response) => {
      addClass(".upload", "hidden");
      removeClass(".uploaded", "hidden");
      let dataUpload = await response.json();
      let idGif = dataUpload.data.id;

      let gifContainer = document.querySelector(".uploaded_gif");
      myGif = await urlGif(idGif);
      gifContainer.src = myGif;
      myGifsArray.push(myGif);
      console.log(`Debería agregarse el nuevo gif ${myGifsArray}`);
      localStorage.setItem("myGifs", JSON.stringify(myGifsArray));
      console.log(myGifsArray);
    })
    .catch((err) => console.error(err));
};

//Link Gif subido
async function urlGif(id) {
  let response = await fetch(`${URL_IDGIF}/${id}?api_key=${APIKey}`);
  let data = await response.json();
  let urlImg = await data.data.images.downsized_large.url;
  return urlImg;
}

savedGifs = localStorage.getItem("myGifs");
myGifsArray = JSON.parse(savedGifs);
console.log(`Deberia traer la info del Local ${myGifsArray}`);

let arrayAv = document.querySelectorAll(".my-new-gif");
console.log(arrayAv);
for (let i of arrayAv.keys()) {
  let image = document.createElement("img");
  image.src = myGifsArray[i];
  console.log(`Renderizar ${myGifsArray[i]}`);
  arrayAv[i].appendChild(image);
}

//Cronómetro
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
	let durationGif = LeadingZero(difference.getUTCHours()) + ':' + LeadingZero(difference.getUTCMinutes()) + ':' + LeadingZero(difference.getUTCSeconds());
	document.getElementById('time').innerHTML = durationGif;
	timeout = setTimeout('startChronometer()', 1000);
}

function LeadingZero(Time) {
	return Time < 10 ? '0' + Time : +Time;
}