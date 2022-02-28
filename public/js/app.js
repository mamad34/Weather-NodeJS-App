console.log("Client side javascript is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#first-message");
const messageTwo = document.querySelector("#second-message");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = input.value;
  console.log(location);
  messageOne.textContent = "Loading...";
  messageTwo.innerHTML = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (("Error", data.error)) {
        console.log(data.error);
        messageOne.innerHTML = "There was An Error";
        messageTwo.textContent = "ERRRROOOOOOR";
      } else {
        console.log(data.location);
        console.log(data.forcast);
        messageOne.textContent = data.location;
        messageTwo.innerHTML = data.forcast;
      }
    });
  });
});
