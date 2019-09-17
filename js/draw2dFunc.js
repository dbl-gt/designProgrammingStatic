/*
* Design Programming '19
* Nirvik Saha, Dennis R Shelden
* Georgia Institute of Technology
*/
//
//
var init2dFunc=function(){
    CANVAS.addEventListener('mouseup', mouseUpListener, false);
    CANVAS.addEventListener('mousedown', mouseDownListener, false);
    CANVAS.addEventListener('mousemove', mouseMoveListener, false);
}
//
//
var stop2dFunc=function(){
    document.getElementById('draw2dDiv').style.display='none';
    CANVAS.removeEventListener('mouseup', mouseUpListener, false);
    CANVAS.removeEventListener('mousedown', mouseDownListener, false);
    CANVAS.removeEventListener('mousemove', mouseMoveListener, false);
}
//
//
setInterval(update2dCanvas, FPS);
//
//
function update2dCanvas(){
    let canv=CANVAS;
    let ctx=CTX;
    ctx.clearRect(0,0,canv.width,canv.height);
    OBJECT_ARRAY.forEach(obj=>{obj.draw2d(ctx)});
    ctx.font="12px arial";
    ctx.fillStyle="rgba(100,100,100,0.5)";
    ctx.fillText("html5 canvas 2d Context", 100,350);
}
//
//
function getMousePos(e){
    var rect=CANVAS.getBoundingClientRect();
    return mos={
        x:e.clientX-rect.left,
        y:e.clientY-rect.top
    };
}
//
//
function mouseDownListener(e){
    let canv=CANVAS;
    let ctx=CTX;
    let mos=getMousePos(e);

    OBJECT_ARRAY.forEach(obj =>{
        if(mos.x>obj.x && mos.x<obj.x+obj.width && mos.y>obj.y && mos.y<obj.y+obj.width){
            obj.selected=true;
            obj.selectedPt.x=mos.x;
            obj.selectedPt.y=mos.y;
            obj.draw2d(ctx);
        }
    });

    if (e.preventDefault) {
        e.preventDefault();
    }
}

//
//
function mouseUpListener(e){
    window.addEventListener('mouseup', e2=>{
        OBJECT_ARRAY.forEach(obj=>obj.selected=false);
    }, false);

    if (e.preventDefault) {
        e.preventDefault();
    }
}
//
//
function mouseMoveListener(e){
    mosQ=getMousePos(e);
    OBJECT_ARRAY.forEach(obj =>{
        if(obj.selected==true){
            obj.x += mosQ.x-obj.selectedPt.x;
            obj.y += mosQ.y-obj.selectedPt.y;
            obj.selectedPt.x=mosQ.x;
            obj.selectedPt.y=mosQ.y;
            generateTable("editTable", "dynamicCells");  // update table;
        }
    });
    if (e.preventDefault) {
        e.preventDefault();
    }
}


// end of 2d draw functions