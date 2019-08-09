

/* global d3 */
import {Howl, Howler} from 'howler';
import pandora from './pandora';
import year from './year';
import * as d3ScaleChromatic from 'd3-scale-chromatic'

var lyrics = null;
var lyricsContainer = null;
var lyricsStamps = null;
var lyricsVals = [0];
var lyricsCount = 0;

function resize() {}


function playLyrics(){

  var yScale = d3.scaleLinear().domain([1,10]).range([20,80])
  var scale = d3.scaleLinear().domain([1,10]).range([1.1,1.5])

  lyrics = [
    ["you",0,5],
["yeah",1.3,4],
["any road",2.2,6],
["you",3,7],
["take",3.2,7],
["you",3.6,5],
["know",3.8,5],
["that",4,5],
["youll",4.1,4],
["find",4.3,5],
["me",4.7,7],
["I'm a sucker for",5.7,5],
["all the",6.9,10],
["subliminal",7.8,7],
["things",8.4,7],
["no",9.2,7],
["one",9.4,8],
["knows",9.7,7],
["about",10,6],
["you",10.6,5],
["about",10.9,4],
["you",11.4,5],
["about",11.9,4],
["you",12.3,5],
["about",12.8,4],
["you",13.1,5],
["and",13.4,6],
["you",13.6,6],
["makin",13.7,10],
["the",14.5,10],
["typical",14.8,6],
["me",15.4,7],
["break",16,8],
["my",16.2,7],
["typical",16.5,6],
["rules",17.4,5],
["it's",18.5,5],
["true",19.1,6],
["I'm a",19.5,7],
["sucker",19.7,6],
["for",20.34,5],
["you",20.9,6],
["yeah",22.5,4]  ];
  lyricsContainer = d3.select("#jonas").select(".lyrics").select(".lyric")
  lyricsContainer.select("p").text("you");
  lyricsStamps = lyrics.map(function(d){return d[1]});
  lyricsContainer
    .style("bottom",yScale(lyrics[lyricsCount][2])+"%")
    .select("p")
    .text(lyrics[lyricsCount][0])
    .style("transform","scale("+scale(lyrics[lyricsCount][2])+")")
    .style("color",d3.interpolateWarm(lyrics[lyricsCount][2]/10))
    ;

}

function changeWord(){
  var scale = d3.scaleLinear().domain([3,10]).range([1,3]).clamp(true)
  var yScale = d3.scaleLinear().domain([1,10]).range([30,80])

  lyricsContainer
    .style("bottom",yScale(lyrics[lyricsCount][2])+"%")
    .select("p")
    .text(lyrics[lyricsCount][0])
    .style("transform","scale("+scale(lyrics[lyricsCount][2])+")")
    .style("color",d3.interpolateWarm(lyrics[lyricsCount][2]/10))
    ;

  if(lyricsCount > 0 && lyrics[lyricsCount][2] > lyrics[lyricsCount - 1][2]){
    d3.select("#jonas").select(".lyrics").select(".lyric").select(".arrow-down").style("display","none")
    d3.select("#jonas").select(".lyrics").select(".lyric").select(".arrow-up").style("display","block")
  }
  else if (lyricsCount > 0 && lyrics[lyricsCount][2] < lyrics[lyricsCount - 1][2]){
    d3.select("#jonas").select(".lyrics").select(".lyric").select(".arrow-down").style("display","block")
    d3.select("#jonas").select(".lyrics").select(".lyric").select(".arrow-up").style("display","none")
  }
  // else if(lyricsCount > 0 && lyrics[lyricsCount][2] == lyrics[lyricsCount - 1][2]){
  //   d3.select("#jonas").select(".lyrics").select(".lyric").select(".arrow-down").style("display","none")
  //   d3.select("#jonas").select(".lyrics").select(".lyric").select(".arrow-up").style("display","none")
  // }
}

function changeBeeGees(){
  var id = cardNames[currentCard].id;
  var idCount = +id.split("-")[1];
  var container = d3.select("#"+currentId);
  container.selectAll(".part").style("opacity",function(d,i){
    if(i == idCount){
      return 1;
    }
    if(i < idCount){
      return .2;
    }
    return 0;
  })
}

function changePandora(){
  var id = cardNames[currentCard].id;
  var idCount = +id.split("-")[1];
  var container = d3.select("#"+currentId);
  container.selectAll(".part").style("opacity",function(d,i){
    if(i == idCount){
      return 1;
    }
    if(i < idCount){
      return .2;
    }
    return 0;
  })
}

function changeIntro(){
  var id = cardNames[currentCard].id;
  var idCount = +id.split("-")[1];
  var container = d3.select("#"+currentId);
  container.selectAll(".part").style("opacity",function(d,i){

    if(i < idCount){
      d3.select(this).select("button").style("opacity",0)
    }
    else {
      d3.select(this).select("button").style("opacity",1)
    }

    if(i == idCount){
      return 1;
    }
    if(i < idCount){
      return .2;

    }
    return 0;
  })
}

function changeSingleChart(){
  var id = cardNames[currentCard].id;
  var idCount = +id.split("-")[1];
  var container = d3.select("#"+currentId);

  container.select(".text-parts").selectAll(".text-element").style("opacity",function(d,i){
    if(i == idCount){
      return 1;
    }
    return 0;
  })

  if(idCount == 0){
    pandora.fadeOutBars();

  }
  if(idCount == 1){
    pandora.fadeInBars();
  }
  if(idCount == 2){
    pandora.onlyMale();
    pandora.hideAvgLine();
  }
  if(idCount == 3){
    pandora.onlyMale();
    pandora.showAvgLine();
  }
}

function changeYearChart(){
  var id = cardNames[currentCard].id;
  var idCount = +id.split("-")[1];
  var container = d3.select("#"+currentId);

  container.select(".text-parts").selectAll(".text-element").style("opacity",function(d,i){
    if(i == idCount){
      return 1;
    }
    return 0;
  })

  if(idCount == 0){
    year.fadeAnnotation("none")
    year.fadeInLine();
  }

  if(idCount == 1){
    year.fadeAnnotation(1984)
  }

  if(idCount < 1){

    d3.select("#year-chart")
      .select(".background-image")
      .transition()
      .duration(1000)
      .style("opacity",null)
      ;
  }
  else if(idCount == 1){

    year.shiftChart("down")

    d3.select("#year-chart")
      .select(".background-image")
      .transition()
      .duration(1000)
      .style("opacity",1)
      ;
  }
  else if(idCount == 2){
    year.shiftChart("up")
    year.highlightRegister(false)
  }
  console.log(idCount);
  if(idCount == 3){
    year.highlightRegister(true)
    year.compareChart(false,[1984])
  }

  if(idCount == 4){
    year.compareChart(true,[1984,2017])
  }
  if(idCount == 5){
    year.compareChart(false,[1984])
    year.shiftChart("down")
    year.highlightRegister(false)
    year.fadeAnnotation(1987)
  }



}

function changeChart(direction){

  console.log("changing");

  if(direction == "right"){
    currentCard = currentCard + 1;
  }
  else{
    currentCard = Math.max(0,currentCard - 1);
  }

  currentId = cardNames[currentCard].card;

  d3.selectAll(".card").classed("is-visible",function(d){
    var cardId = d3.select(this).attr("id");
    if(cardId == currentId){
      return true
    }
    return false;
  });

  if(currentSound){
    if(currentSound.playing && cardNames[currentCard].audio == "none"){
      currentSound.fade(1, 0, 1500);
      window.setTimeout(function(d){
        if(cardNames[currentCard].audio == "none"){
          currentSound.stop();
        }
      },1500)
    }
    else if(currentSound.playing && currentSoundTrack != cardNames[currentCard].audio){
      currentSound.stop();
    }
  }


  if(cardNames[currentCard].audio != "none" && currentSoundTrack != cardNames[currentCard].audio){
    playSound();
  }
  else if(cardNames[currentCard].audio == "none") {
    currentSoundTrack = "none";
  }

  if(currentId == "intro"){
    changeIntro();
  }
  if(currentId == "jonas"){
    lyricsCount = 0;
    playLyrics();
  }
  if(currentId == "beegees"){
    changeBeeGees();
  }
  if(currentId == "pandora"){
    changePandora();
  }
  if(currentId == "single-year"){
    changeSingleChart();
  }
  if(currentId == "year-chart"){
    changeYearChart();
  }


}

var cardNames = [
  {
    id:"intro-0",
    card:"intro",
    audio:"none"
  },
  {
    id:"intro-1",
    card:"intro",
    audio:"none"
  },
  {
    id:"jonas",
    card:"jonas",
    audio:"https://p.scdn.co/mp3-preview/8b304ee721be5f4235a67722670be137c785de1e.mp3"
  },
  {
    id:"mendes",
    card:"mendes",
    audio:"https://p.scdn.co/mp3-preview/bd54ee94f858ab1213956811d9ecbb000c32c446.mp3"
  },
  {
    id:"beegees-0",
    card:"beegees",
    audio:"https://p.scdn.co/mp3-preview/3d1632a9d561aa44fd5d66eb766e002cb2acf6d0.mp3"
  },
  {
    id:"beegees-1",
    card:"beegees",
    audio:"https://p.scdn.co/mp3-preview/3d1632a9d561aa44fd5d66eb766e002cb2acf6d0.mp3"
  },
  {
    id:"pandora-0",
    card:"pandora",
    audio:"https://p.scdn.co/mp3-preview/3ea8fa99dbd05e210739f960065718fb9ca0bdfd.mp3"
  },
  {
    id:"pandora-1",
    card:"pandora",
    audio:"https://p.scdn.co/mp3-preview/3ea8fa99dbd05e210739f960065718fb9ca0bdfd.mp3"
  },
  {
    id:"pandora-2",
    card:"pandora",
    audio:"https://p.scdn.co/mp3-preview/3ea8fa99dbd05e210739f960065718fb9ca0bdfd.mp3"
  },
  {
    id:"single-0",
    card:"single-year",
    audio:"https://p.scdn.co/mp3-preview/fa8b4ab4bf19294e193dee6f5cfeed640faec5a9.mp3"
  },
  {
    id:"single-1",
    card:"single-year",
    audio:"https://p.scdn.co/mp3-preview/fa8b4ab4bf19294e193dee6f5cfeed640faec5a9.mp3"
  },
  {
    id:"single-2",
    card:"single-year",
    audio:"https://p.scdn.co/mp3-preview/fa8b4ab4bf19294e193dee6f5cfeed640faec5a9.mp3"
  },
  {
    id:"single-3",
    card:"single-year",
    audio:"https://p.scdn.co/mp3-preview/fa8b4ab4bf19294e193dee6f5cfeed640faec5a9.mp3"
  },
  {
    id:"year-0",
    card:"year-chart",
    audio:"none"
  },
  {
    id:"year-1",
    card:"year-chart",
    audio:"none"
  },
  {
    id:"year-2",
    card:"year-chart",
    audio:"https://p.scdn.co/mp3-preview/808822c217ebcd3843f6c422de1f3dad8e419595.mp3"
  },
  {
    id:"year-3",
    card:"year-chart",
    audio:"https://p.scdn.co/mp3-preview/808822c217ebcd3843f6c422de1f3dad8e419595.mp3"
  },
  {
    id:"year-4",
    card:"year-chart",
    audio:"https://p.scdn.co/mp3-preview/808822c217ebcd3843f6c422de1f3dad8e419595.mp3"
  },
  {
    id:"year-5",
    card:"year-chart",
    audio:"https://p.scdn.co/mp3-preview/808822c217ebcd3843f6c422de1f3dad8e419595.mp3"
  }
];

var cardSequence = null;
var currentCard = 0;
var currentId = "intro"
var currentSound = null;
var currentSoundTrack = "none";

function playSound(){

  console.log("playing song");

  currentSound = new Howl({
    src: [cardNames[currentCard].audio],
    volume:1,
    loop:true,
    onend: function(){
      console.log("finished");
    }
  });
  currentSoundTrack = cardNames[currentCard].audio

  var id1 = currentSound.play();
  currentSound.fade(0, 1, 500, id1);
  window.setInterval(function(d){
    var value = currentSound.seek();
    if(value > lyricsStamps[lyricsCount + 1]){
      lyricsCount = lyricsCount + 1;
      changeWord();
    }
  },100)
}

function init(data) {
  cardSequence = cardNames.map(function(d){return d.id});

  d3.select("#touch").selectAll("div").on("click",function(){
    var direction = d3.select(this).attr("class");
    changeChart(direction)
  })

  if(cardNames[currentCard].audio != "none"){
    playSound();
  }

  playLyrics();
}

export default { init, resize };
