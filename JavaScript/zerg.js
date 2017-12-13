var id = 0;
var count = 0;
var zergalings = [];
var targets = [];

var titles = ["Missing Stream",
"The Broken Fire",
"Butterfly of Dream",
"The Names's Words",
"The Souls of the Memory",
"Slaves in the Wife",
"All Dream",
"The Entwined Voyager",
"Eye of Crying",
"The Voyage's Voyage",
"The Game of the Stone",
"Door in the Fire",
"Silent Petals",
"The White Storm",
"Serpents of Way",
"The Slaves's Luck",
"The Dreamer of the Sparks",
"Wings in the Doors",
"Last Shard",
"The Whispering Thief",
"Thief of Dream",
"The Twins's Mist",
"The Serpents of the Flames",
"Truth in the Stars",
"Splintered Blade",
"The Dwindling Slave",
"Words of Voyagers",
"The Cloud's Gift",
"The Dreaming of the Dreams",
"Light in the Willow"]; 

var links =  ["http://thatsthefinger.com","http://burymewithmymoney.com",
"http://cant-not-tweet-this.com","http://eelslap.com",
"http://endless.horse", "http://www.fallingfalling.com",
"http://www.trypap.com","http://www.republiquedesmangues.fr",
"http://www.partridgegetslucky.com","http://www.rrrgggbbb.com",
"http://heeeeeeeey.com","http://hooooooooo.com",
"http://www.koalastothemax.com","http://www.everydayim.com",
"http://www.movenowthinklater.com","http://randomcolour.com",
"http://ninjaflex.com","http://www.staggeringbeauty.com",
"http://corndogoncorndog.com","http://chrismckenzie.com"]

var descriptions = [
    "Esse mi integer semper senectus. Vivamus fusce ullamco taciti. Mi labore ullamco.",
    "Lectus officia semper mi sem. Sociis tellus nunc. Per dis duis conubia volutpat parturient. Penatibus congue odio hendrerit montes.",
    "Cupidatat mattis varius aenean nostra aute. Mauris aliquet elementum dictum primis rutrum. Dis nulla luctus proident metus at. Pede commodo cubilia.",
    "Vivamus pellentesque mus. Aute nam congue. Conubia tortor per rhoncus sociis. Inceptos consequat turpis suspendisse. Velit parturient erat convallis commodo.",
    "Aenean dignissim conubia. Sint consectetuer mauris adipiscing. Anim consequat esse reprehenderit. Enim et nascetur justo mollis mollit. A turpis dolore luctus natoque."
];

var dates = ["22 March 2000","8 November 2000","11 December 2001","15 July 2003","29 July 2008","15 February 2010","9 November 2010","10 November 2010","28 March 2013","21 January 2014"];


function clearRight(){
    count = 0;
    $("#right").slideUp(function(){
        $("#right").html("");
        $("#right").show();
    });   
}

function generateDiv(){
    for(var i=0;i<10;i++){
        addRandomDiv();
    }
}

function addRandomDiv(){
    var randomTitle = Math.floor((Math.random() * 30));
    var randomLink = Math.floor((Math.random() * 20));
    var randomDate = Math.floor((Math.random() * 11));
    var randomDesc = Math.floor((Math.random() * 5));
    if(randomDate==11)
        addDiv(titles[randomTitle],links[randomLink],descriptions[randomDesc]);
    else
        addDiv(titles[randomTitle],links[randomLink],descriptions[randomDesc],dates[randomDate]);
}

function addDiv(title, link, description, date = null){
	
	
    var template = $("#template").clone();
    template.attr("id",count);
    template.attr("class","template-clone");
    template.find("#title").html(title);
    template.find("#link").html(link);
    template.find("#description").html(description+ " " +description);
    if(date)
        template.find("#date").html(date + " - ");
    $("#right").append(template);
    template.fadeIn();
    target = new Target(count,template.offset().left,template.offset().top,template);
    targets.push(target);
    count++;
}

function openModal(){
    $("#modal").fadeIn();
}
function closeModal(){
    $("#modal").fadeOut();
}


function Target(id,x,y,element){
	this.id = id;
	this.x = x;
	this.y = y;
	this.health = 100;
	this.element = element;
}

Target.prototype = {
	constructor : Target,
	setX : function(x){
		this.x = x;
	},
	setY : function(y){
		this.y = y;
	},
	setHealth : function(health){
		this.health = health;
	},
	getX : function(){
		return x;
	},
	getY : function(){
		return y;
	},
	getHealth : function(){
		return health;
	},
	hide :  function(){
		$(this).css("visibility","hidden");
	}

}

function Zergaling(id,x,y,element){
	this.id = id;
	this.x = x;
	this.y = y;
	this.health = 100;
	this.element = element;
	this.neighbor = null;
}

Zergaling.prototype = {
	constructor : Zergaling,
	closest : function(){
		var el = null,
		elOffset,
		distance,
		dx,
		dy,
		minDistance,
		arr,
		tempX,
		tempY;

		for (var i = 0;i<targets.length;i++) {
			var $t = targets[i].element;
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
	            dx = offsets[off][0] - this.x;
	            dy = offsets[off][1] - this.y;
	            
	            distance = Math.sqrt(dx * dx + dy * dy);
	            if (minDistance === undefined || distance < minDistance) {
	                minDistance = distance;
	                el = $t;
	                if(this.x> elOffset.left && this.x<  right) dx = 0;
	                if(this.y> elOffset.top && this.y<  bottom) dy = 0;
	                arr = [dx,dy,targets[i].id];               
	            }
	        }
		}
	    return arr;
	},

	walk : function(){
		this.neighbor = this.closest();
		
		var x = this.neighbor[0], y = this.neighbor[1];
       	var me = this;


		var timer = setInterval(function(){
			var isAda = false;
			for(var i=0;i<targets.length;i++){
                if(targets[i].id==me.neighbor[2]){
                	targets[i].element.css("background-color","eee");
                    isAda = true;
                    break;
                }    
	        }
	        if(isAda==false)
	        {
				clearInterval(timer);
				if(targets.length!=0)
	        		me.walk();
	        }

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

	        	me.x += left;
	        	me.y += top;
	            x+=-left;
	            y+=-top;
	        }
	        else if(!(x<1&&x>-1)){
	            me.x = me.x + left;
	            x+=-left;
	        }
	        else if(!(y<1&&y>-1)){
	            me.y = me.y + top;
	            y+=-top;
	        }

	        me.element.css("top",me.y+"px");
        	me.element.css("left",me.x+"px");

	        if(me.health==0){
	            clearInterval(timer);
	        } 

	        if ((y<1&&y>-1) && (x<1&&x>-1)){
	            clearInterval(timer);
	            me.hit(); 
	        } 
		},17);
	},

	hit : function(){
		var target;
		for(var i=0;i<targets.length;i++){
            if(targets[i].id==this.neighbor[2]){
    			target = targets[i];
                break;
            }    
        }
	    target.element.children().eq(0).css("visibility","visible");
	    var me = this;
	    var timer = setInterval(function(){
	    	target.health -= 1;
	        target.element.children().eq(0).css("width",(target.health*2+"px"));
	        
	        if(target.health<0){
	            clearInterval(timer);
	            target.element.css("visibility","hidden");

	            for(var i=0;i<targets.length;i++){
	                if(targets[i].id==me.neighbor[2]){
	        
	                    targets.splice(i,1);
	                    break;
	                }    
	            }

	            if(targets.length!=0){
	               	me.walk()
	            }
	            else{
	                clearInterval(timer);
	            }	             
	        }
	        else if(target.health<30){
	            target.element.children().eq(0).css("background-color","red");
	        }
	        else if(target.health<70){
	            target.element.children().eq(0).css("background-color","orange");
	        }

	        if(me.health==0){
				clearInterval(timer);
	        }
	    },100)

	},
}

function startRush(){

	var tops = [0, $(document).height()];

	for (var i = 0;i<5;i++) {
		var top = tops[Math.floor(Math.random() * 2)];
		var left = Math.floor((Math.random() * 1000) + 1);

		var temp = $(".zergaling-wrap-clone").clone();
		temp.attr("class","zergaling-wrap");
		temp.attr("zerg-id",id);

		if(Math.floor(Math.random() * 2)==0){
			temp.css("top",top+"px");
			temp.css("left",left+"px");
			zerg = new Zergaling(id,left,top,temp);
		}
		else{
			temp.css("top",left+"px");
			temp.css("left",top+"px");
			zerg = new Zergaling(id,top,left,temp);
		}
		
		$("#right").append(temp);
		id++;
		zergalings.push(zerg);
		zerg.walk();
	}

    var timer = setInterval(function(){    
		for (var i = 0;i<5;i++) {
			var top = tops[Math.floor((Math.random() * 2))];
			var left = Math.floor((Math.random() * 1000) + 1);
			
			var temp = $(".zergaling-wrap-clone").clone();
			temp.attr("class","zergaling-wrap");
			temp.attr("zerg-id",id);

			temp.css("top",top+"px");
			temp.css("left",left+"px");

			$("#right").append(temp);
			zerg = new Zergaling(id,left,top,temp);
			id++;
			zergalings.push(zerg);
			zerg.walk();

			if(zergalings.length==25){
				clearInterval(timer);
			}
		}
	},5000);

	var game = setInterval(function(){
		if(zergalings.length>0 && targets.length==0){
			clearInterval(game);
			console.log("Zerg Wins");
		}
		else if(targets.length>0 && zergalings.length==0){
			clearInterval(game);
			console.log("Player Wins");
		}
		else if(targets.length==0 && zergalings.length==0){
			clearInterval(game);
			console.log("draw!");
		}
	},17);
}

$(document).ready(function(){
	


    $(document).on("click",".zergaling-wrap", function(){
		var zerg = null;

		for(var i=0;i<zergalings.length;i++){
            if(zergalings[i].id==$(this).attr("zerg-id")){
				zerg = zergalings[i];
                break;
            }    
        }
        zerg.health -= 34;

        if(zerg.health<0){
			zerg.element.hide();
			for(var i=0;i<zergalings.length;i++){
				if(zergalings[i].id==$(this).attr("zerg-id")){
					zergalings.splice(i,1);
					break;
				}    
			}
        }
        else if(zerg.health<60){
            zerg.element.children().eq(0).css("background-color","red");
            zerg.element.children().eq(0).css("width","5px");
        }
        else if(zerg.health<70){
            zerg.element.children().eq(0).css("background-color","orange");
            zerg.element.children().eq(0).css("width","10px");
        }
    });


    $("#close").click(function(){
        closeModal();
    });

    $("#add").click(function(){
        closeModal();
        addDiv($("#titleInput").val(),$("#linkInput").val(),$("#descriptionInput").val(),$("#dateInput").val());
        $("#titleInput").val("");
        $("#linkInput").val("");
        $("#descriptionInput").val("");
        $("#dateInput").val("");
    });

    $(window).click(function(e){
        if (e.target == $("#modal")[0])
            closeModal();
    });

});
