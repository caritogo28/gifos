//Dropdown
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
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
};

//3. respuesta de la Api dataApi
/* const render = async (responseData) => {
  arrayNode.forEach((valor, index) => {
    let image = document.createElement("img");
    image.src = responseData[index].images.fixed_height.url;
    arrayNode[index].appendChild(image);
  });
}; */
