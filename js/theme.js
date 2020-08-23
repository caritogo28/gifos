const htmlTag = document.getElementsByTagName("html")[0];
//Cambio de tema
document.querySelector("#night").addEventListener("click", (e) => {
  htmlTag.setAttribute("data-theme", "dark");
  document.querySelector(".logo").setAttribute("src", "./assets/gifOF_logo_dark.png");
  document.querySelector(".button_drop img").setAttribute("src", "./assets/dropdown-white.svg");
  document.querySelector(".search_button img").setAttribute("src", "./assets/combined_shape.svg");
});
document.querySelector("#day").addEventListener("click", (e) => {
  htmlTag.setAttribute("data-theme", "day");
  document.querySelector(".logo").setAttribute("src", "./assets/gifOF_logo.png");
  document.querySelector(".button_drop img").setAttribute("src", "./assets/dropdown.svg");
  document.querySelector(".search_button img").setAttribute("src", "./assets/lupa_inactive.svg");
});


localStorage.getItem('themes') == 'sNight' ? sailorNightMode() : sailorDayMode();
