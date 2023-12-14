/* 캔버스 초기 설정 */
const canvas = document.querySelector("canvas"); 
const CANVAS_WIDTH = 875;
const CANVAS_HEIGHT = 875;
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

/* 캔버스 CONTEXT */
const context = canvas.getContext("2d")

/* 선 굵기 초기 설정 */
const lineWidth = document.getElementById("line-width");
const lineWidthInput = document.getElementById("line-width-value");
context.lineWidth = lineWidth.value // 초기 선굵기 세팅
lineWidthInput.value = lineWidth.value  // 초기 선굵기 출력

/* 색상 목록 - 태그 생성*/
const colors = ["#000000", "#1abc9c", "#3498db", "#34495e", "#27ae60", "#8e44ad", "#f1c40f", "#e74c3c", "#95a5a6", "#d35400", "#bdc3c7", "#2ecc71", "#e67e22",]
colors.forEach(element => {
  const colorsDiv = document.getElementById("colors") 
  const colorDiv = document.createElement("div")
  // colorDiv.className = "color-option"
  // colorDiv.style.cssText = `background-color : ${element};`
  // colorDiv.dataset.color = element
  colorDiv.setAttribute("class", "color-option")
  colorDiv.setAttribute("style", `background-color : ${element};`)
  colorDiv.setAttribute("data-color", element)
  colorsDiv.appendChild(colorDiv)
});

/* 색상 클릭시 색상 적용 */
const colorOptions = document.getElementsByClassName("color-option");
Array.from(colorOptions).forEach(color => color.addEventListener("click", onColorClick))

/**
 * 색상 클릭 이벤트 콜백 함수
 */
const color = document.getElementById("color"); // 색상 선택기
function onColorClick(event) {
  const dataColor = event.target.dataset.color
  context.fillStyle = dataColor
  context.strokeStyle = dataColor
  color.value =  dataColor // input 색상 선택기에 선택된 색상 출력
}

/**
 * 더블클릭 텍스트 입력기 
 */
const textInput = document.getElementById("text")
function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    context.save()
    context.lineWidth = 1;
    context.font = "48px serif"
    // context.fillText(text, event.offsetX, event.offsetY)
    context.strokeText(text, event.offsetX, event.offsetY)
    context.restore() //최초 저장된 시점으로 돌아간다.
  }
}
canvas.addEventListener("dblclick", onDoubleClick)

/**
 * 캔버스에 이미지 첨부
 */
const fileInput = document.getElementById("file")
function onFileChange(event) {
  const file = event.target.files[0]
  const url = URL.createObjectURL(file)
  const image = new Image() // <img src=""/>와 같다
  image.src = url
  image.onload = function() {
    context.drawImage(image, 0, 0, image.width * (CANVAS_HEIGHT / image.height), CANVAS_HEIGHT)
    fileInput.value = null
  }
}
fileInput.addEventListener("change", onFileChange)

/**
 * 전체 지우기
 */
const initBtn = document.getElementById("init-btn"); //전체 지우기 버튼
function onInitClick() {
  context.fillStyle = "white"
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}
initBtn.addEventListener("click", onInitClick)

/**
 * 일반 지우기
 */
const eraserBtn = document.getElementById("eraser-btn")
function onEraserClick() {
  isFilling = false;
  modeBtn.innerText = "Fill"
  context.strokeStyle = "white"

}
eraserBtn.addEventListener("click", onEraserClick)

/**
 * 채우기, 그리기 버튼 전환 기능
 */
const modeBtn = document.getElementById("mode-btn"); // FILL/STROKE 모드 버튼
let isFilling = false
function onModeClick(event) {
  if (isFilling) {
    isFilling = false
    modeBtn.innerText = "Fill"
    return;
  }
  isFilling = true
  modeBtn.innerText = "Draw"
}
modeBtn.addEventListener("click", onModeClick)

/**
 * 캔버스 클릭이벤트 콜백함수
 * 캔버스 전체 배경 색을 채운한다.
 * @returns 
 */
function onCanvasClick() {
  if (isFilling) {
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    return;
  }
}
canvas.addEventListener("click", onCanvasClick) //캔버스 클릭시 백그라운드 색상 fill


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
  console.dir()
  const inputType = event.target.type
  const changeValue = event.target.value
  context.lineWidth = changeValue
  if(inputType === "range") {
    lineWidthInput.value = changeValue
    return
  }
  lineWidth.value = changeValue

  
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
lineWidthInput.addEventListener("change", onLineWidthChange)
color.addEventListener("change", onColorChange)
