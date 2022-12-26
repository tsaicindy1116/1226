var colors = "133c55-386fa4-59a5d8-84d2f6-91e5f6".split("-").map(a=>"#"+a)
var colors_r = "aaaaaa-bbbbbb-cccccc-dddddd-eeeeee".split("-").map(a=>"#"+a)
var clr,clr_r
//宣告陣列資料，記錄每一朵花的基本資料
var positionListX =[]  //所有花的X軸位置，List串列，array陣列
var positionListY =[]  //所有花的Y軸位置
var clrList=[]      //所有花瓣顏色
var clr_r_List = []  //所有花圓心顏色
var sizeList =[]  //所有花的大小

//+++++++++++++手勢辨識＿變數宣告區++++++++++++++++
let handpose;
let video;//攝影機取得放影像資料的地方
let predictions = [];//放手勢辨識的資料
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d//d為4,8點之間的距離
let pointerX14,pointerY14,pointerX16,pointerY16//用四個變數紀錄第14(pointerX14,pointerY14)及第16個點(pointerX16,pointerY16)的xy軸
//++++++++++++++++++++++++++++++++++++++++++++++

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var j=0;j<10;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)
    //紀錄資料
    positionListX.push(random(width)) //把花X位置存入到positionListX list資料內
    positionListY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionListX[j],positionListY[j]) //花的座標，原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j]) 
    pop()
    }
   //+++++++++++++++++++++++++++取得攝影機影像並開始執行++++++++++++++++++++++++++++++
   video = createCapture(VIDEO);//取得攝影機的影像，影像畫面放到video中
   video.size(width, height);//影像大小為整個視窗的大小

   handpose = ml5.handpose(video, modelReady);//把video影像執行辨識手勢，辨識完畢會去執行modelReady function

    // This sets up an event that fills the global variable "predictions"
    // with an array every time new hand poses are detected
   handpose.on("predict", (results) => { //最後手勢辨識後的結果放到變數中
     predictions = results;
   });

    // Hide the video element, and just show the canvas
   video.hide();//隱藏video
   //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
}
//最後手勢辨識後的結果完成就開始執行
function modelReady() {
  console.log("Model ready!");
}


function draw() {  //一秒進到function執行60次
 
  //攝影機反向
  translate(width, 0);
  scale(-1, 1);
    //+++++++++
 
  background(255); 
 image(video,0,0,width,height);
 
  d= dist(pointerX8,pointerY8,pointerX4,pointerY4)
 
  for(var j=0;j<positionListX.length;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)    
    //畫圖
    // push()  
    //   translate(positionListX[j],positionListY[j]) //花的座標，原點移到視窗的中心點
    //   rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
    //   clr = clrList[j]
    //   clr_r = clr_r_List[j]
    //   drawFlower(clr,clr_r,map(mouseX,0,width,sizeList[j],sizeList[j]+1)) 
    // pop()
  r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionListX[j],positionListY[j])
  }
  drawKeypoints(); //取得手指位置
   }
  


function drawFlower(clr,clr_r,size=1){  //clr:花瓣顏色，clr_r:花圓心顏色，size:花大小
  
  push()
    // fill(255,211,33)
    scale(size)    //縮放，size=1，100%顯示，0.5，50%顯示
 rectMode(CENTER)
    strokeWeight(0)
    fill("#4361ee")
    rect(0,0,60,100,20)//拖鞋深色
    fill("#4cc9f0")
    rect(-5,5,60,100,20)//拖鞋淺色
    strokeWeight(4)
    stroke("#fee440")
    arc(-20,-21,30,40,100,210)
    arc(10,-21,30,40,70,198)
    stroke(0)
    for(var i =0;i<6;i++){  
      strokeWeight(0)
	fill("#9d6b53")
	ellipse(105,0,50,100)//身體
 	fill("#774936")
 	ellipse(90,18,35,70)//翅膀(左)
 	ellipse(120,18,35,70)//翅膀(右)
	strokeWeight(1)
 	line(127,-17,83,-17)//脖子線
 	noFill()
 	strokeWeight(1)
 	arc(130,-60,50,80,41,200)//觸鬚(右)
 	arc(80,-60,50,80,80,-50)//觸鬚(左)
 	strokeWeight(0)
 	fill(0)
 	ellipse(110,-40,5)//眼睛(右)
 	ellipse(98,-40,5)//眼睛(左)
      rotate(PI/3) //PI代表180，
    }
  pop()    
}

function mousePressed(){
//紀錄資料
positionListX.push(mouseX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
positionListY.push(mouseY)
clrList.push(colors[int(random(colors.length))])
clr_r_List.push(colors_r[int(random(colors_r.length))])
sizeList.push(random(0.5,1.5))
let data_length = positionListX.length
//畫圖
push() 
  translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
  clr = clrList[data_length-1]
  clr_r = clr_r_List[data_length-1]
  drawFlower(clr,clr_r,sizeList[data_length-1]) 
pop()
}

//畫點，取第八點及第四點
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      // noStroke();
      if (j == 8) { //食指的上端   
    pointerX8 = map(keypoint[0],0,640,0,width) //j=8所以取得第8點的資訊，keypoint[0]代表x(食指座標)
    pointerY8 = map(keypoint[1],0,480,0,height)//keypoint[1]代表y(食指座標)
        pointerZ8 = map(keypoint[2],0,480,0,height)//keypoint[2]代表z(食指座標)
        console.log(pointerZ8)
        if(pointerZ8<-40)
        {
          R_draw(pointerX8,pointerY8)
        }
    ellipse(pointerX8, pointerY8, 30, 30);
      } else
      if (j == 4) { //大拇指的上端  
    fill(255,0,0)
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
    // pointerZ = keypoint[2]
    // print(pointerZ)
        ellipse(pointerX4, pointerY4, 30, 30);
  
      } else
      if (j == 14) { //無名指第三個關節
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 16) { //無名指上端
        pointerX16 = keypoint[0];
        pointerY16 =  keypoint[1];
      }
   
    }
  
  }
}


  function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
   push()
    translate(F_x,F_y);
    if(pointerY14<pointerY16){  
     drawFlower(F_clr,F_clr_r,map(d,0,600,F_size-0.2,F_size+0.6)) //放大縮小，代表無名指有彎曲
    }else
    {
     //無名指沒有彎曲
     rotate(frameCount/20)
     drawFlower(F_clr,F_clr_r,F_size)

    }
   pop()
}
 //畫一朵花，跟滑鼠按下的程式碼一模一樣，改變handX,handY
 function R_draw(handX,handY){
  //紀錄資料
  positionListX.push(handX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
  positionListY.push(handY)
  clrList.push(colors[int(random(colors.length))])
  clr_r_List.push(colors_r[int(random(colors_r.length))])
  sizeList.push(random(0.5,1.5))
  let data_length = positionListX.length
  //畫圖
  push() 
   translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
   clr = clrList[data_length-1]
   clr_r = clr_r_List[data_length-1]
   drawFlower(clr,clr_r,sizeList[data_length-1]) 
  pop()
}