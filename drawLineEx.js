const canvas = document.querySelector("canvas"); 
const context = canvas.getContext("2d")

canvas.width = 800
canvas.height = 800
context.lineWidth=2;
const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff73",
  "#7efff5",
  "#18dcff",
  "#7d5fff",
]

/**
 * offSetX, offSetY
 * @param {*} event 
*/
function onClick(event) {
  context.beginPath()
  context.moveTo(400,400);
  context.lineTo(event.offsetX, event.offsetY)
  const color = colors[Math.floor(Math.random() * colors.length)] // 랜덤색상
  context.strokeStyle = color // stroke에 랜덤 색상 반영
  context.stroke();
}
canvas.addEventListener("mousemove", onClick)