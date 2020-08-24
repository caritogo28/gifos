const htmlTag = document.getElementsByTagName("html")[0];

function darkTheme() {
  htmlTag.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
  document.querySelector(".logo").setAttribute("src", "/assets/gifOF_logo_dark.png");
  document.querySelector(".button_drop img").setAttribute("src", "/assets/dropdown-white.svg");
  document.querySelector(".search_button img").setAttribute("src", "/assets/combined_shape.svg");
}

function dayTheme() {
  htmlTag.setAttribute("data-theme", "day");
  localStorage.setItem("theme", "day");
  document.querySelector(".logo").setAttribute("src", "/assets/gifOF_logo.png");
  document.querySelector(".button_drop img").setAttribute("src", "/assets/dropdown.svg");
  document.querySelector(".search_button img").setAttribute("src", "/assets/lupa_inactive.svg");
}

localStorage.getItem("theme") == "dark" ? darkTheme() : dayTheme();

document.querySelector("#night").addEventListener("click", darkTheme);
document.querySelector("#day").addEventListener("click", dayTheme);
