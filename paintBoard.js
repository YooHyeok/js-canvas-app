/* 캔버스 초기 설정 */
const canvas = document.querySelector("canvas"); 
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT
/* 캔버스 CONTEXT */
const context = canvas.getContext("2d")
context.lineCap = "round" // 커서모양? butt, round, square
context.lineJoin = "round" // 꺽인선 모서리 bevel, round, miter

/* 선 굵기 초기 설정 */
const lineWidth = document.getElementById("line-width");
const lineWidthInput = document.getElementById("line-width-value");
context.lineWidth = lineWidth.value // 초기 선굵기 세팅
lineWidthInput.value = lineWidth.value  // 초기 선굵기 출력

/* 색상 목록 - 태그 생성*/
const colors = ["#000000", "#1abc9c", "#3498db", "#34495e", "#27ae60", "#8e44ad", "#f1c40f", "#e74c3c", "#95a5a6", "#d35400", "#2ecc71", "#e67e22",]
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

/**
 * 이미지 파일로 저장 기능
 * a태그를 생성하고, 생성한 상태에서 href속성에 이미지 url을 입력, download속성에 저장될 파일명을 입력한뒤
 * html에 따로 렌더링하지 않고 자바스크립트에서 click()함수를 통해 실행해버린다.
 */
const saveBtn = document.getElementById("save")
function onSaveClick() {
  const url = canvas.toDataURL() // canvas에 렌더링한 최종 이미지 작업물을 base64로 인코딩된 url로 반환받는 메소드
  const a = document.createElement("a") // <a href = "" download = "저장될파일명.확장자"></a>
  a.href = url
  a.download = "draw.png"
  a.click();
  
}
saveBtn.addEventListener("click", onSaveClick)


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
    // context.strokeText(text, event.touches[0].clientX, event.touches[0].clientY)
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
  const url = URL.createObjectURL(file) // 로컬서버 주소를 포함한 파일의 저장 경로를 만든다.
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
  if(!confirm("현재까지 작업한 모든 내용이 초기화 됩니다. \n정말로 초기화 하시겠습니까?")) return;
  context.save()
  context.fillStyle = "white"
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  context.restore() //최초 저장된 시점으로 돌아간다.
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
  let pathX;
  let pathY
  if (isPainting) {
  switch (event.type) {
    case "mousemove":
      pathX = event.offsetX;
      pathY = event.offsetY;
      break;
  
    case "touchmove":
      pathX = event.touches[0].clientX - canvas.offsetLeft;
      pathY = event.touches[0].clientY - canvas.offsetTop;
      break;
  }
    context.lineTo(pathX, pathY);
    context.stroke();
    return
  }
  // context.moveTo(pathX, pathY);
}

/* function onMouseMove(event) {
  if (isPainting) {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return
  }
  context.moveTo(event.offsetX, event.offsetY);
}

function onTouchMove(event) {
  if (isPainting) {
    context.lineTo(event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
    context.stroke();
    return
  }
  context.moveTo(event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
} */

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
// canvas.addEventListener("touchmove", onTouchMove)
canvas.addEventListener("touchmove", onMouseMove)
canvas.addEventListener("touchstart", onMouseDown) // 화면에 터치될때 이벤트 발생
canvas.addEventListener("touchend", onMouseUp) // 화면에 터치했다가 땔때 이벤트 발생 - click은 눌렀다가 땔때 발생
// canvas.addEventListener("touchcancel", onMouseUp, {passive: false}) // 터치가 끝났을 때에도 onMouseUp 함수 호출 (그리지않을것이므로)
lineWidth.addEventListener("change", onLineWidthChange)
lineWidthInput.addEventListener("change", onLineWidthChange)
color.addEventListener("change", onColorChange)
