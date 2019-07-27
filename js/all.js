//轮播
const dataArray=['p1','p2','p3','p4','p5','p6','p7','p8','p9']
const middle=4

//获取node

const container=document.getElementById('container')
const left=document.querySelector('.left')
const right=document.querySelector('.right')

const nodeArray=container.children
console.log(nodeArray instanceof NodeList)

let current=2;

console.log(nodeArray.length)

function toLeft () {

    if(current>0){
        current=current-1

        for(let i=0; i<nodeArray.length;i++){
            nodeArray.item(i).className=dataArray[current+i]
        }
    }
    
}

left.addEventListener('click',toLeft);

function toRight () {
    if(current<4){

        current=current+1

        for(let i=0; i<nodeArray.length;i++){
            nodeArray.item(i).className=dataArray[current+i]
        }
    }
}

right.addEventListener('click',toRight)

//照片点击
const nodeLists=Array.prototype.filter.call(container.childNodes,function(item){return item.nodeType===1})
console.log(nodeLists)
/*if(window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach=Array.prototype.forEach;
}*/

nodeLists.forEach(function(currentValue,currentIndex,listObj){
    currentValue.addEventListener('click',function(){
        console.log(currentValue.className,currentIndex,listObj.length);
        random(currentValue)
    })
})

function random (currentValue) {
    let difference=dataArray.indexOf(currentValue.className)-middle
    console.log(difference)
    current=current-difference
    console.log(current)

    for(let i=0; i<nodeArray.length;i++){
        nodeArray.item(i).className=dataArray[current+i]
    }
}

//百叶窗

const experience= document.querySelector('.experience')
const expChildren =experience.children

function wider (event) {

    if(event.target.className!=='experience'){
        for(let i=0;i<expChildren.length;i++){
            expChildren.item(i).style.width='50px'
        }
    
        event.target.parentNode.style.width='650px'
    }
}

experience.addEventListener('click',wider)

//part3 点击翻转

function flip (event){
    if(event.target.className!=='wrap'){
        
        const computedStyle=document.defaultView.getComputedStyle(event.target,null)

        computedStyle.transform.length>30? event.target.style.transform='rotateY(0deg)': event.target.style.transform='rotateY(180deg)'
    }
}

const wrap=document.querySelector('.wrap')

wrap.addEventListener('click',flip)

//音效

let audioCtx=new (window.AudioContext||window.webkitAudioContext)()

function voice (event) {

    let url= event.target.getAttribute('data-url')
    const req= new XMLHttpRequest()

    let source= audioCtx.createBufferSource()

    req.open('Get',url,true)
    req.responseType='arraybuffer'
    req.onload=function(){
        let arraydata=req.response

        audioCtx.decodeAudioData(arraydata,function(audiobuffer){
            source.buffer=audiobuffer ;
            source.connect(audioCtx.destination);
            source.start()
        },function(error){ console.log(error) })
    }

    req.send(null)
}

wrap.addEventListener('click',voice)