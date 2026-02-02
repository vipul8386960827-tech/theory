let container = document.getElementById("container");
let buttonNext = document.createElement("button");
let buttonPrev = document.createElement("button");
let resultContainer = document.createElement("div");

buttonNext.textContent = "Prev";
buttonPrev.textContent = "Next";
resultContainer.id = "result";

container.appendChild(buttonNext);
container.appendChild(buttonPrev);
container.appendChild(resultContainer);

buttonNext.addEventListener("click", handleNext);
buttonPrev.addEventListener("click", handlePrev);

let start = 0;
const limit = 5;

function handleNext() {
  console.log("next click");
}

function handlePrev() {
  console.log("prev click");
}

async function apiCall(start, limit) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=${limit}`
    );
    const data = await response.json();
    data.map((data) => {
      const p = document.createElement("p");
      p.textContent = data.email;
      resultContainer.prepend(p);
    });
  } catch (error) {
    console.log("error :", error);
  }
}

apiCall(start, limit);

setInterval(() => {
  start += limit;
  apiCall(start, limit);
}, 5000);
