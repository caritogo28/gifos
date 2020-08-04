const APIKey = "gScHgsNe7Y2Q0e3U3rKZJWc1X1HZa6uo";
URL_UPLOAD = "http://upload.giphy.com/v1/gifs";

let video = document.querySelector("video");
let title = document.querySelector(".pre_capture_title h1");

let recorder;
let form = new FormData();

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
  removeClass(".capture", "hidden");
  addClass(".load", "hidden");

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
  removeClass("#btn-stop-recording", "hidden");
  removeClass(".time", "hidden");

  title.innerText = "Capturando Tu Guifo";
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

  recorder.stopRecording(() => {
    addClass("#video", "hidden");
    addClass(".stop_btn", "hidden");
    removeClass(".preview_buttoms", "hidden");
    removeClass(".load", "hidden");
    document.querySelector(".load").style.display = "flex";
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
  fetch(`${URL_UPLOAD}?api_key=${APIKey}&username=carolinagomezsanchez&source_image_url=${URL.createObjectURL(recorder.getBlob())}`, {
    method: "post",
    body: form,
    id: "gifCaro",
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.error(err));
};
