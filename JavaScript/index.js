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

var count = 0;

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
    count++;
    template.attr("class","template-clone");
    template.find("#title").html(title);
    template.find("#link").html(link);
    template.find("#description").html(description+ " " +description);
    if(date)
        template.find("#date").html(date + " - ");
    $("#right").append(template);
    template.fadeIn();
}

function openModal(){
    $("#modal").fadeIn();
}
function closeModal(){
    $("#modal").fadeOut();
}

$(document).ready(function(){
    
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