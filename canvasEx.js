const canvas = document.querySelector("canvas"); 
const context = canvas.getContext("2d")// 캔버스에 그림을 그릴때 사용한다.

canvas.width = 800
canvas.height = 800

/**
 * x축, y축, width, height 순서로 argument를 받는다.
 * canvas가 시작 좌표 위치를 기준으로 x축,y축의 시작위치와 사각형의 높이,너비를 세팅한다.
 * canvas의 좌측 상단 꼭지점이 x(가로),y(세로) 축의 시작위치가 된다.
 */

// context.fillRect(50, 50, 100, 200) // 좌표 50,50에 너비100 높이200 사각형을 채운다.
// context.strokeRect(50, 50, 100, 200);
// contextPathEx();
// contextMoveLineEx();
// drawHouse();

drawPeople();
function drawPeople() {
  context.fillRect(200, 200, 15, 100) // 왼쪽팔
  context.fillRect(295, 200, 15, 100) // 오른쪽팔
  context.fillRect(225, 200, 60, 200) // 몸통

  context.arc(255, 145, 50, 0, 2*Math.PI); // start->end point 우측부터 시계방향으로 0(2.0), 0.5, 1.0, 1.5
  context.fill()
  
  context.beginPath();
  context.arc(275, 125, 5, Math.PI, 2*Math.PI); 
  context.arc(235, 125, 5, Math.PI, 2*Math.PI); 
  context.fillStyle = "white"
  context.fill()

  context.beginPath();
  context.arc(255, 165, 15, Math.PI, 2*Math.PI); 
  context.fillStyle = "white"
  context.fill()

}

/**
 * 집 그리기 예제
 */
function drawHouse() {
  context.fillRect(200, 200, 50, 200); //좌측벽
  context.fillRect(400, 200, 50, 200); //우측벽

  context.lineWidth = 2; // 선 두께 지정 (선 두께를 먼저 지정하고 stroke 해줘야함 )
  context.strokeRect(300, 300, 50, 100); //문

  context.fillRect(250, 200, 150, 20) //천장
  
  context.moveTo(200, 200) // 지붕을 위해 좌측벽 최상단으로 커서 이동
  context.lineTo(325, 100) // 200 + 50 + 400 = (650/2) 중앙에서 100만큼 위의 좌표 위치로 선긋기 (100만큼 내려가야함 초기좌표가 Y축이 일반적인 좌표 진행방향인↗ 이 아니라 ↘이기 때문)
  context.lineTo(450, 200) // 450 , 200(벽높이)에 선긋기 (200만큼 내려가야함 ) 
  context.fill();
}

/**
 * Y축은 일반적인 좌표 진행방향인↗ 이 아니라 ↘이다.
 * moveTo() : 선을 긋지않고 path좌표 이동
 * lineTo() : 선을 그으면서 path좌표 이동
 */
function contextMoveLineEx () {
  context.moveTo(50, 50); //path를 50,50 좌표(경로)로 이동

  context.lineTo(150, 50); //50,50애서 150, 50 경로로 선을 긋도록 준비한다.
  context.lineTo(150, 150); //50,250애서 50, 250 경로로 선을 긋도록 준비한다.
  context.lineTo(50, 150); //50,50애서 50,250 경로로 선을 긋도록 준비한다.
  context.lineTo(50, 50); //50,50애서 50,250 경로로 선을 긋도록 준비한다.

  context.stroke(); // 해당 함수를 호출함으로써 비로서 선이 출력된다.
  context.fill(); // 채우기
}

/**
 * 경로 구성 예제
 * short-cut 형태의 fillRect와 strokeRect함수의 기본 분리 함수
 * rect() : 경로 구성
 * stroke() : 구성된 경로를 선으로 잇는다.
 * fill() : 구성된 경로내부를 색으로 채운다.
 * beginPath() : 경로를 시작하거나 현재 경로를 재설정
 * closePath() : 현재 지점에서 시작 지점까지의 경로 생성 (생략 가능)
 */
function contextPathEx() {

  /**
   * part1
   * 경로 구성후 선긋기
   */
  context.beginPath(); // 경로를 시작한다.
  context.rect(50, 50, 100, 100)
  context.stroke(); // 그려진 모든 경로의 선을 그린다.
  context.closePath(); //현재 지점에서 시작 지점까지의 경로를 만든다.

 /**
  * part2
  * 경로 구성후 채우기
  */
  context.beginPath(); // 경로를 시작하면서 현재 경로를 재설정한다. - 하지 않으면 part1 rect에 fill이 적용된다.
  context.rect(150, 150, 100, 100)
  context.rect(250, 250, 100, 100)
  context.fill(); // 그려진 모든 경로에 색을 채운다.
  // context.closePath(); // 생략 가능

  /**
   * part3
   * 경로 구성 후 채우기 색 빨강
   */
  context.beginPath(); // 경로를 시작하면서 현재 경로를 재설정
  context.rect(350, 350, 100, 100)
  context.rect(450, 450, 100, 100)
  context.fillStyle = "red"
  context.fill(); 
  // 전부 빨간색이 되는데 이유는 모든 rect가 같은 경로의 일부이기 때문이다.
  // 같은 결로 위에 많은 선들을 그리고, 해당 스타일중 하나만 변경해도 모든 경로에 영향을 미치게 된다

}