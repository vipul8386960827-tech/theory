{/* <div id="container"></div>;  add this in the html container.................*/}

let container = document.getElementById("container");
let buttonNext = document.createElement("button");
let buttonPrev = document.createElement("button");
let resultContainer = document.createElement("div");

buttonNext.textContent = "Next";
buttonPrev.textContent = "Prev";
resultContainer.id = "result";

container.appendChild(buttonPrev);
container.appendChild(buttonNext);
container.appendChild(resultContainer);

buttonNext.addEventListener("click", handleNext);
buttonPrev.addEventListener("click", handlePrev);

let start = 0;
const limit = 5;

function handleNext() {
  start = start + limit;
  apiCall(start, limit);
}
function handlePrev() {
  if (start === 0) {
    buttonPrev.disabled;
    return;
  }
  start = start - limit;
  apiCall(start, limit);
}

async function apiCall(start, limit) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=${limit}`
    );
    const data = await response.json();
    resultContainer.innerHTML = "";
    data.map((data) => {
      const p = document.createElement("p");
      p.textContent = data.email;
      resultContainer.appendChild(p);
    });
  } catch (error) {
    console.log("error :", error);
  }
}
apiCall(start, limit);
