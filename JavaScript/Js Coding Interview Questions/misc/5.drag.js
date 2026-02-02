{/* <div id="drag-container"></div> */}
const container = document.getElementById('drag-container')
const button = document.createElement('button')
button.textContent='Drag me'
button.style.position='absolute'
container.appendChild(button)

let dragging = false
let offsetX,offsetY

button.addEventListener('mousedown',(e)=>{
  dragging = true
  offsetX = e.clientX - button.offsetLeft
  offsetY = e.clientY - button.offsetTop
  console.log(e.clientX,button.offsetLeft)
})
document.addEventListener('mousemove',(e)=>{
  if(!dragging) return;
  button.style.left = `${e.clientX - offsetX}px`;
  button.style.top = `${e.clientY - offsetY}px`;
})

document.addEventListener('mouseup', () => {
  dragging = false;
});
