const canvas = document.querySelector("canvas"); 
const context = canvas.getContext("2d")// 캔버스에 그림을 그릴때 사용한다.

canvas.width = 800
canvas.height = 800

/**
 * x축, y축, width, height 순서로 argument를 받는다.
 * canvas가 시작 좌표 위치를 기준으로 x축,y축의 시작위치와 사각형의 높이,너비를 세팅한다.
 * canvas의 좌측 상단 꼭지점이 x(가로),y(세로) 축의 시작위치가 된다.
 */
context.fillRect(50, 50, 100, 200) // 좌표 50,50에 너비100 높이200 사각형을 채운다.