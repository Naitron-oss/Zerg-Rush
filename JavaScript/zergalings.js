var isDoneRushing = true;

$.fn.closestToOffset = function(top,left) {
    var el = null,elOffset,x = left,y = top,distance,dx,dy,minDistance,arr,tempX,tempY;
    this.each(function() {
        var $t = $(this);
        elOffset = $t.offset();
        right = elOffset.left + $t.width();
        bottom = elOffset.top + $t.height();

        var offsets = [
            [elOffset.left, elOffset.top],
            [right, elOffset.top],
            [elOffset.left, bottom],
            [right, bottom],
        ];
        for (var off in offsets) {
            dx = offsets[off][0] - x;
            dy = offsets[off][1] - y;
            
            distance = Math.sqrt(dx * dx + dy * dy);
            if (minDistance === undefined || distance < minDistance) {
                minDistance = distance;
                el = $t;
                if(x> elOffset.left && x<  right) dx = 0;
                if(y> elOffset.top && y<  bottom) dy = 0;
                arr = [el,dx,dy];               
            }
        }
    });

    return arr;
};

var zergalings = [];
var targets = [];

function initZergalings(){
    zergalings = [];
    var tops = [0, $(document).height()];
    for (var i = 0; i < 5; i++) {
        var top = tops[Math.floor((Math.random() * 2))];
        var left = Math.floor((Math.random() * $(document).width()-200));

        var temp = $(".zergaling-wrap-clone").clone();
        temp.attr("class","zergaling-wrap");
        temp.css("top",top+"px");
        temp.css("left",left+"px");
        $("#right").append(temp);
        zergalings.push(temp);
    }
}

function startRush(){
    $("#left").fadeOut();
    targets = $(".template-clone");
    isDoneRushing = false;
    doRush();
}

function doRush(){
    initZergalings();
    checkClosest();

    var count = 0;
    
    var rush = setInterval(function(){
        // console.log("doRush still running");
        if(isDoneRushing==false){
            initZergalings();
            checkClosest();
            count++;
        }
        if(count==4)
            clearInterval(rush);
    },5000);
}

function checkClosest(){
    if(zergalings.length!=0){
        for (var i = 0; i < zergalings.length; i++) {
            var closest = targets.closestToOffset(zergalings[i].offset().top,zergalings[i].offset().left);
            closest[0].css('background-color','#eee');
            walk(zergalings[i],closest[1],closest[2],closest[0])
        }
    }
    else{
        isDoneRushing = true;
        
    }
}

function walk(obj,x,y,closest){

    // var ada = false;
    // for(var i=0;i<targets.length;i++){
    //     if(targets.eq(i).attr("id")==closest.attr("id")){
    //         ada = true;
    //     }    
    // }
    // if (ada == false){
    //     clearInterval(timer);
    //     checkClosest();
    // }

    var timer = setInterval (function () {
        var temp = obj;
        var top=1,left=1;

        if(x!=0 && y!=0){
            top = y/(x+y);
            left = x/(x+y);
        }
        if(x<0)
            left*=-1;
        if(y<0)
            top*=-1;

        if(!(y<1&&y>-1) && !(x<1&&x>-1)){
            temp.offset({top: temp.offset().top + top + "px", left: temp.offset().left + left + "px"});
            x+=-left;
            y+=-top;
        }
        else if(!(x<1&&x>-1)){
            temp.css( 'left', temp.offset().left + left + "px");
            x+=-left;
        }
        else if(!(y<1&&y>-1)){
            temp.css( 'top', temp.offset().top + top + "px");
            y+=-top;
        }

        if ((y<1&&y>-1) && (x<1&&x>-1)){
            clearInterval(timer);
            zergHit(closest,temp); 
        }
        // ada = false;
        // // console.log("walk still running");
        for(let i=0;i<targets.length;i++){
            if(targets.eq(i).attr("id")==closest.attr("id")){
                ada = true;
            }    
        }
        if (ada == false){
            // console.log("udah ga ada objeknya!");
            clearInterval(timer);
            checkClosest();
        }
    }, 16);
}

function zergHit(obj,zerg){
    var health = obj.children().eq(0);
    health.css("visibility","visible");

    var hitter = setInterval(function(){
        // console.log("hit still running");
        health.attr("health",health.attr("health")-1);
        health.css("width",($(health).attr("health")*2+"px"));
        
        if($(health).attr("health")<0){
            clearInterval(hitter);
            $(obj).css("visibility","hidden");
            for(var i=0;i<targets.length;i++){
                if(targets.eq(i).attr("id")==obj.attr("id")){
                    targets.splice(i,1);
                    break;
                }    
            }
            if(targets.length!=0){
                var closest = targets.closestToOffset(zerg.offset().top,zerg.offset().left);
                closest[0].css('background-color','#eee');
                walk(zerg,closest[1],closest[2],closest[0]);
            }
            else{
                //TODO validasi kelar
                // console.log("done");
                isDoneRushing = true;
                $("#left").fadeIn();
            }
             
        }
        else if($(health).attr("health")<30){
            $(obj).children().eq(0).css("background-color","red");
        }
        else if($(health).attr("health")<70){
            $(obj).children().eq(0).css("background-color","orange");
        }

        if(zerg.css("display")=="none"){
            clearInterval(hitter);
        }
    },10);
}

$(document).ready(function(){
    $(document).on("click",".zergaling-wrap", function(){
        $(this).attr("health",$(this).attr("health")-34);
        if($(this).attr("health")<0){
            $(this).fadeOut();
        }
        else if($(this).attr("health")<60){
            $(this).children().eq(0).css({
                "background-color":"red",
                "width":"5px"
            });
        }
        else if($(this).attr("health")<70){
            $(this).children().eq(0).css({
                "background-color":"orange",
                "width":"10px"
            });
        }
    });
});

