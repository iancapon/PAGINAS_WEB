class Tetramino{
    constructor(wid,hei){
      this.wid=wid
      this.hei=hei
      this.array=Array(wid*hei).fill(-1)
      this.transparency=255
    }
    plot(escala,dx,dy){
      let pallete=8
      for(let i=0; i<this.wid; i++){
        for(let j=0; j<this.hei; j++){
          if(this.array[i+j*this.wid]!=-1){
            colorMode(HSB,70)
            fill(this.array[i+j*this.wid]*pallete,200,200)
          }else{
            colorMode(RGB,255)
            fill(100,this.transparency)
          }
          rect(i*escala+dx,j*escala+dy,escala,escala)
        }
      }
    }
    rotation(){
      if(this.wid!=2 ){
        let aux=[]
        if(this.hei==3 && this.wid==3){
          aux.push(this.array[6+0]);aux.push(this.array[3+0]);aux.push(this.array[0+0]);
          aux.push(this.array[6+1]);aux.push(this.array[3+1]);aux.push(this.array[0+1]);
          aux.push(this.array[6+2]);aux.push(this.array[3+2]);aux.push(this.array[0+2]);
        }
        else if (this.hei==4 && this.wid==4){
          aux.push(this.array[12+0]);aux.push(this.array[8+0]);aux.push(this.array[4+0]);aux.push(this.array[0+0]);
          aux.push(this.array[12+1]);aux.push(this.array[8+1]);aux.push(this.array[4+1]);aux.push(this.array[0+1]);
          aux.push(this.array[12+2]);aux.push(this.array[8+2]);aux.push(this.array[4+2]);aux.push(this.array[0+2]);
          aux.push(this.array[12+3]);aux.push(this.array[8+3]);aux.push(this.array[4+3]);aux.push(this.array[0+3]);
        }
        this.array.splice(0,this.array.length)
        this.array=aux
      }
    }
    copy(canvas,dx,dy){
      for(let i=0; i< this.wid;i++){
        for(let j=0; j<this.hei;j++){
          if(this.array[i+j*this.wid]!=-1){
            if(dx+i < canvas.wid && dy+j < canvas.hei)
            canvas.array[dx+i+(dy+j)*canvas.wid]=this.array[i+j*this.wid]
          }
        }
      }
    }
    
    makeChild(){
      let child=new Tetramino(this.wid,this.hei)
      this.copy(child,0,0)
      child.transparency=0
      return child
    }
    
    checkValid(canvas,dx,dy,mv){
      let answer=true
      let child=new Tetramino(this.wid,this.hei)
      this.copy(child,0,0)
      if(mv==1){
        child.rotation()
      }
      for(let i=0; i< this.wid;i++){
        for(let j=0; j<this.hei;j++){
          if(child.array[i+j*this.wid]!=-1){
            if(i+dx<0 || i+dx >=12){
              answer=false
              break
            }
            if(j+dy<0 || j+dy >=24){
              answer=false
              break
            }
            if(answer==true){
              if(canvas.array[dx+i+(dy+j)*canvas.wid]!=-1){
                answer=false
                break
              }
            }
          }
        }
      }
      return answer
    }
  }
  
  class stair_a extends Tetramino{
    constructor(){
      super(3,3)
      this.array[0]=0
      this.array[1]=0
      this.array[4]=0
      this.array[5]=0
      //this.array[8]=0
      this.transparency=0
    }
  }
  class stair_b extends Tetramino{
    constructor(){
      super(3,3)
      this.array[2]=1
      this.array[1]=1
      this.array[4]=1
      this.array[3]=1
      //this.array[8]=0
      this.transparency=0
    }
  }
  class linea extends Tetramino{
    constructor(){
      super(4,4)
      this.array[1]=2
      this.array[5]=2
      this.array[9]=2
      this.array[13]=2
      this.transparency=0
      this.pos=1
    }
  }
  class corner_a extends Tetramino{
    constructor(){
      super(3,3)
      this.array[0]=3
      this.array[1]=3
      this.array[3]=3
      this.array[6]=3
      this.transparency=0
    }
  }
  class corner_b extends Tetramino{
    constructor(){
      super(3,3)
      this.array[2]=4
      this.array[1]=4
      this.array[8]=4
      this.array[5]=4
      this.transparency=0
    }
  }
  class funny extends Tetramino{
    constructor(){
      super(3,3)
      this.array[4]=5
      this.array[7]=5
      this.array[8]=5
      this.array[6]=5
      this.transparency=0
    }
  }
  class block extends Tetramino{
    constructor(){
      super(2,2)
      this.array[0]=6
      this.array[1]=6
      this.array[2]=6
      this.array[3]=6
      this.transparency=0
    }
  }
  
  let grid=new Tetramino(12,24)
  let shapes=[new block(),new funny(),new corner_a(),new corner_b(),new linea(),new stair_a(),new stair_b()]
  let x=4
  let y=0
  let timing=-1
  let timeout=-1
  let difficulty=45
  let nextIndex
  let current
  let score=0
  
  //let music
  /*let title
  function preload(){
    //music=loadSound("tetris_theme_strings_compressed.mp3")
    title=loadImage("tetris_title.png")
  }*/
  function setup() {
    createCanvas(500, 600);
    nextIndex=floor(Math.random()*7)
    current=shapes[floor(Math.random()*7)].makeChild()
    
    //music.loop()
  }
  
  
  let movesCounter=0
        
  function draw() {
    timing++;
    timeout++;
    colorMode(RGB,255)
    stroke(0)
    background(0);
    //image(title,-50+20,400-20,250,200)
    let escala=20
    let desfX=220
    let desfY=50
    difficulty=45-score/5
    grid.plot(escala,desfX,desfY)
  
    if(keyIsPressed && timeout>7){
      movesCounter=0
      timeout=0
      if(keyCode==UP_ARROW && current.checkValid(grid,x,y,1)){
        current.rotation()
      }
      if(keyCode==DOWN_ARROW && current.checkValid(grid,x,y+1,0)){
        y+=1
        timeout=6
        //timing=0
      }
      if(keyCode==LEFT_ARROW && current.checkValid(grid,x-1,y,0)){
        x+=-1
        timeout=4
      }
      if(keyCode==RIGHT_ARROW && current.checkValid(grid,x+1,y,0)){
        x+=1
        timeout=4
      }
      /*if(key==' '){
        current.copy(grid,x,y)
        current=shapes[nextIndex].makeChild()
        nextIndex=floor(Math.random()*7)
        x=4
        y=0
        movesCounter++
      }*/
    }
    
    if(timing>difficulty){
      if(current.checkValid(grid,x,y+1,0)==false){
        current.copy(grid,x,y)
        current=shapes[nextIndex].makeChild()
        nextIndex=floor(Math.random()*7)
        x=4
        y=0
        movesCounter++
      }
      if(current.checkValid(grid,x,y+1,0)==true){
        y+=1
        movesCounter=0
      }
      timing=0
    }
    fill(255)
    textSize(20)
    text("NEXT:",18,75)
    text("SCORE:",10,230)
    text(score,10,260)
    text("SPEED:",10,320)
    text(int(46-difficulty),10,350)
    shapes[nextIndex].plot(20,20,90)
    current.plot(20,desfX+x*escala,desfY+y*escala)
    
    let count=0
    for(let j=0; j<24; j++){
      let delete_line=true
      for(let i=0; i<12;i++){
        if(grid.array[i+j*12]==-1){
          delete_line=false
        }
      }
      if(delete_line==true){
        for(let v=j-1; v>=0; v--){
          for(let u=0; u< 12; u++){
            grid.array[u+(v+1)*12]=grid.array[u+v*12]
          }
        }
        count++
        j--
      }
    }
    score+=count*10
    if(count==4){
      score+=40
    }
    if(movesCounter>0){
      textSize(40)
      fill(200,0,0)
      text("TRY AGAIN!!!",180,590)
    }
    
  }