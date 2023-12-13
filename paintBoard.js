const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const lineWidthValue = document.getElementById("line-width-value");
const canvas = document.querySelector("canvas"); 
const context = canvas.getContext("2d")

canvas.width = 800
canvas.height = 800
context.lineWidth = lineWidth.value
lineWidthValue.innerText = lineWidth.value
/**
 * 마우스 눌린상태에서는 그림을 그리고
 * 마우스를 땐 상태에서는 path 좌표만 이동시킨다.
 * @param {*} event 
*/
function onMouseMove(event) {
  if (isPainting) {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return
  }
  context.moveTo(event.offsetX, event.offsetY);
}

let isPainting = false;

/**
 * 페인팅 시작 모드
 * 마우스를 누르는 동안 움직이는 위치까지 선이 그려져야한다.
 */
function onMouseDown(event) {
  isPainting = true;
}
/**
 * 페인팅 종료 모드
 * @param {*} event 
 */
function onMouseUp(event) {
  isPainting = false;
  context.beginPath(); // 페인팅이 끝났으므로 path를 초기화해준다.
}
/**
 * 선 두께 변경
 * @param {*} event 
 */
function onLineWidthChange(event) {
  const changeValue = event.target.value
  context.lineWidth = changeValue
  lineWidthValue.innerText = changeValue
}
/**
 * 선, 채우기 색 변경
 * @param {*} event 
 */
function onColorChange(event) {
  const changeValue = event.target.value
  context.strokeStyle = changeValue
  context.fillStyle = changeValue
}
canvas.addEventListener("mousemove", onMouseMove)
canvas.addEventListener("mousedown", onMouseDown) // 마우스를 눌를때 이벤트 발생 - click은 눌렀다가 땔때 발생
canvas.addEventListener("mouseup", onMouseUp) // 마우스를 눌렀다가 땔때 이벤트 발생 - click은 눌렀다가 땔때 발생
canvas.addEventListener("mouseleave", onMouseUp) // 마우스가 캔버스를 떠났을 때에도 onMouseUp 함수 호출 (그리지않을것이므로)
lineWidth.addEventListener("change", onLineWidthChange)
color.addEventListener("change", onColorChange)