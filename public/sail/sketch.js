class SailBoat{
    constructor(x,y,heading){
        this.x=x
        this.y=y
        this.u=0
        this.v=0
        this.head=heading
    }
    helm(input){
        this.head+=input
    }
    calculate(wind){
        let r=0.02
        let s=createVector(sin(radians(this.head)),-cos(radians(this.head)))
        let w= createVector(sin(radians(wind.head)),-cos(radians(wind.head)))
        //ine(150,250,150+s.x*20,250+s.y*20)
        //line(350,250,350+w.x*20,250+w.y*20)
        //console.log(abs(degrees(s.angleBetween(w))))
        let CORRECTO=-1
        if(s.x<0){
            CORRECTO=1
        }
        if(abs(s.angleBetween(w)) > radians(40)){
            this.u+=  sin(radians(this.head))*wind.speed*2*r*sin(s.angleBetween(w)*CORRECTO)*1.2
            this.v+= -cos(radians(this.head))*wind.speed*2*r
            if(createVector(this.u,this.v).mag()>wind.speed*0.6){
                this.u=  sin(radians(this.head))*wind.speed*0.6*sin(s.angleBetween(w)*CORRECTO)*1.2
                this.v= -cos(radians(this.head))*wind.speed*0.6
            }
        }else{
            
            if(this.u>0){
                this.u-=r
            }
            if(this.u<0){
                this.u+=r
            }
            if(this.v>0){
                this.v-=r
            }
            if(this.v<0){
                this.v+=r
            }
        }

        this.x+=this.u
        this.y+=this.v

        this.y+=wind.speed*0.05
        
        strokeWeight(3)
        stroke(0,300,250);
        line(velero.x,velero.y,velero.x + sin(s.angleBetween(w)/2)*15,velero.y + cos(s.angleBetween(w)/2)*15)
    }
}

let arrow_img
let boat_img
let velero
let wind
function setup(){
    arrow_img=loadImage("assets/flecha-arriba.png")
    boat_img=loadImage("assets/boat.png")
    velero=new SailBoat(200,250,0)
    wind={head:0,speed:2}
    createCanvas(900,700)
}

function draw(){
    noStroke()
    strokeWeight(0.5)
    colorMode(HSL,360)
    background(200,300,200);
    fill(180,300,250);
    circle(450,350,580)
    
    arrow_visualize(wind.head,180,900,700,arrow_img)
    boat_visualize(velero.head,0,velero.x,velero.y,boat_img)
    
    fill(0,300,250)
    stroke(0.5)
    line(450,120,450+200,120+200)
    line(450,120,450-200,120+200)
    noStroke()
    circle(450,120,10)
    circle(450,600,10)
    boat_visualize(0,0,300,600,boat_img)//lancha de regata

    velero.calculate(wind)

    if(keyIsPressed){
        if(key=="a" || key == "A"){
            velero.helm(-3)
        }
        if(key=="d" || key == "D"){
            velero.helm(3)
        }
    }
    
}

function boat_visualize(angle,offset,x,y,img){
    angleMode(DEGREES)
    translate(x,y)
    imageMode(CENTER)
    rotate(angle+offset)
    image(img,0,0,30,30)
    rotate(-angle-offset)
    translate(-x,-y)
    angleMode(RADIANS)
}

function arrow_visualize(angle,offset,w,h,img){
    angleMode(DEGREES)
    translate(w/2,h/2)
    imageMode(CENTER)
    rotate(angle+offset)
    image(img,0,h/2.5,10,10)
    rotate(-angle-offset)
    translate(-w/2,-h/2)
    angleMode(RADIANS)
}