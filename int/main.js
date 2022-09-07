$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "intervals.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

tunes = [];
var mainKey = {};
var intervalsNatTxt = '2 1 5 4 6 3 7 5 4 6 3 5 4 6 7 3 5 6 4 1 5 3 4 2 6 1 7 5 4 6 5 4 1 6 7 5 4 3 2 1 4 6 3 7 5 4 6 1 3 5 6 7 3 5 6 4 1 6 5 3 6 1 7 5 4 6 3 5 4 1 6 7 5 4 3 2 1 5 4 6 7 5 4 6 1 3 5 4 6 7 5 6 4 1 6 5 3 4 6 1 5 4 6 3 5 4 1 6 7 5 3 5 6 4 1 6 5 3 4 6 7 5 4 6 3 5 4 1 6 7 4 3 2 1 5 4 6 3 7 5 6 1 3 5 4 6 7 3 5 6 1 6 5 3 4 6 1 7 5 4 3 6 7 3 2 5 6 4 1 6 3 4 6 1 7 5 4 6 3 5 1 6 7 5 4 3 2 1 5 4 3 7 5 4 6 1 3 5 4 6 3 5 6 4 1 6 5 3 4 6 7 2 5 4 6 3 5 4 1 6 5 4 3 5 6 4 1 6 5 3 6 1 7 5 4 6 3 5 6 1 5 4 6 3 5 4 1 6 7 5 3 5 6 4 1 6 5 3 4 6 7 5 4 6 3 5 4 1 6 7 4 3 2 1 5 4 6 3 7 5 6 1 3 5 4 6 7 3 5 6 1 6 5 3 4 6 1 7 5 4';
var intervalsAltTxt = '2# 1 5b 4# 6 3b 7 5# 4 6# 3b 5# 4 6b 7 3b 5 6 4# 5b 3 4# 2b 2 3 6# 1 7b 5# 4# 6 5b 4# 6b 5# 4 3b 2# 1 4 6b 3 7b 5 4 6b 1 3 5# 3b 4 6b 1 7b 5# 4# 2 6 7 3 5# 6 4 1 6b 5b 3b 6b 4 1 6b 7 5b 4 3b 2 1 5# 4 6b 3 7b 5 4 6b 1 3 5# 4 6b 7 5 6b 4 3 6b 5 3b 4 6 1 5b 4# 6b 3 5 4 1 6b 7b 5# 3 5b 6b 4# 1 6b 5 3 11 13 7b 5b 11# 13 11 5 11 1 13b 7 11 3b 9 1 5# 11 13b 3 7 5# 13 1 3 5# 11 13 7b 5b 13 1 13# 5 3b 11 13b 1 7b 5 11# 3 13# 7 3b 5 13 11# 1 13b 3b 11# 6 1 7b 4 13b 3b 5b 4 1 13b 7 5# 11 3 2# 1 4 6b 3 7b 5# 11# 6b 1 3b 5# 6 7 3 5# 13 11 1 6b 5b 3b 13b 1 7b 5 11# 6b 3 5# 4 6b 7b 5b 4 3b 2 5# 11 7b 5 6b 13 5# 4 11# 13b 7 5 6b 4 1 6 5 3b 4 6b 1 5b 1 2b 2 2# 3b 3 4 4# 5b 5 5# 6b 6 7b 7 9b 9 9# 11 11# 13b 13';
var intervals = [];
intervals['nat'] = intervalsNatTxt.split(" ");
intervals['alt'] = intervalsAltTxt.split(" ");
var diff = 'nat';
var finish = false;
var posInterval = 0;
var right = 0;
var wrong = 0;

var startTime = 0;
var endTime = 0;

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            var tune = {};
            tune.key = data[0];
            tune['1'] = data[0];
            for (var j=1; j<headers.length; j++) {
                tune[headers[j]] = data[j];
            }
            tunes.push(tune);
        }
    }
    start();
}

function start(){
    $('#interval').css('visibility','hidden');
    $('#game').css('visibility','hidden');
}

function chooseKey(k){
    var n;
    if (k == undefined)
        n = Math.floor(Math.random() * tunes.length);
    else{
        console.log(tunes[0]['key'])
        for(var i = 0; i < tunes.length; i++){
            if(tunes[i]['key'] == k)
                n = i;
        }
    }
    mainKey = tunes[n];
    play();
}

function chooseDiff(difficulty){
    diff = difficulty;
    $('#setKey').css('visibility','visible');
}

function play(){
    $('.setup').remove();
    $('#game').css('visibility','visible');
    $('#setKey').css('visibility','hidden');
    $('#interval').css('visibility','visible');
    $('#interval').text(intervals[diff][posInterval]);
    $('#key').text(mainKey.key);
    startTime = new Date().getTime();
}

function getNote(note){
    console.log("devi cliccare: " + mainKey[intervals[diff][posInterval]] + " e tu cliccasti: " + note);
    if(mainKey[intervals[diff][posInterval]] == note){
        console.log("Mo bravo!");
        right++;

        posInterval++;
        if(posInterval == intervals[diff].length){
            gameOver();
        }
        $('#interval').text(intervals[diff][posInterval]);
    }
    else{
        wrong++;
        console.log("Ahia");
    }
}

function gameOver(){
    endTime = new Date().getTime();
    totalTime = endTime - startTime;
    var hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((totalTime % (1000 * 60)) / 1000);
    var strTime = hours +":"+minutes+":"+seconds;
    $('.risultati').css("visibility", "visible");
    $('.right').text(right);
    $('.wrong').text(wrong);
    $('.time').text(strTime);
}

function playAgain(){
    location.reload();
}