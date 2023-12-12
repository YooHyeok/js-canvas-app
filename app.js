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

contextPathEx();
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
  // 같은 결로 위에 많은 선들을 그리고, 해당 스타일중 하나만 ㅂ젼경해도 모든 경로에 영향을 미치게 된다

}