

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
var lyricsTwo = null;


function resize() {}


function playLyrics(){

  var yScale = d3.scaleLinear().domain([1,10]).range([20,80])
  var scale = d3.scaleLinear().domain([1,10]).range([1.1,1.5])

  var lyricsMendes = [
    ["about",0,8],
    ["you",0.55,6],
    ["is",1.1,7],
    ["it",1.5,6],
    ["too",1.95,7],
    ["late",2.4,6],
    ["to",2.9,7],
    ["tell",3.25,7],
    ["you",3.6,8],
    ["that",3.8,8],
    ["every",4.3,10],
    ["thing",4.7,9],
    ["means",5,9.5],
    ["nothing",5.3,9],
    ["If I",5.7,5],
    ["can't",6.4,5],
    ["have",6.85,5],
    ["you",7.15,7],
    ["I",8.4,6],
    ["can't",9,6],
    ["write",9.4,5],
    ["one",10,6],
    ["song",10.4,5],
    ["that's",10.8,6],
    ["not",11.3,6],
    ["about",11.7,7],
    ["you",12.3,5],
    ["can't",12.9,6],
    ["drink",13.3,5],
    ["without",13.85,6],
    ["thinking",14.8,6],
    ["about",15.5,8],
    ["you",16.2,6],
    ["is",16.7,7],
    ["it",17.4,6],
    ["too",17.8,7],
    ["late",18.2,6],
    ["to",18.7,7],
    ["tell",19.1,7],
    ["you that",19.7,8],
    ["every",20.2,10],
    ["thing",20.7,9],
    ["means",21,9.5],
    ["nothing",21.3,9],
    ["If I",21.65,5],
    ["can't",22.1,5],
    ["have",22.6,5],
    ["you",23.1,7],
    ["I'm so",25.9,4],
    ["sorry",26.4,5],
    ["that my",27,4],
    ["timing's",27.4,4],
    ["off",28.2,4],
    ["but I",28.8,4],
    ["can't",29.2,5],
    ["move",29.7,5]
  ]

  var lyricsJonas = [
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

  if(currentId == "mendes"){
    lyrics = lyricsMendes;
  }
  else {
    lyrics = lyricsJonas;
  }

  lyricsContainer = d3.select("#"+currentId).select(".lyric")
  lyricsContainer.select("p").text(function(d){
    if(currentId == "jonas"){
      return "you"
    }
    return "about"
  });
  lyricsStamps = lyrics.map(function(d){return d[1]});

  lyricsContainer
    .style("bottom",yScale(lyrics[lyricsCount][2])+"%")
    .select("p")
    .text(lyrics[lyricsCount][0])
    .style("transform","scale("+scale(lyrics[lyricsCount][2])+")")
    .style("color",d3.interpolateCool(lyrics[lyricsCount][2]/10))
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
    .style("color",d3.interpolateCool(lyrics[lyricsCount][2]/10))
    ;

  if(lyricsCount > 0 && lyrics[lyricsCount][2] > lyrics[lyricsCount - 1][2]){
    d3.select("#"+currentId).select(".lyric").select(".arrow-down").style("display","none")
    d3.select("#"+currentId).select(".lyric").select(".arrow-up").style("display","block")
  }
  else if (lyricsCount > 0 && lyrics[lyricsCount][2] < lyrics[lyricsCount - 1][2]){
    d3.select("#"+currentId).select(".lyric").select(".arrow-down").style("display","block")
    d3.select("#"+currentId).select(".lyric").select(".arrow-up").style("display","none")
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

  d3.select(".footer").select(".author").style("display","block")
  d3.select(".footer").select(".logo").style("display","none")

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

  console.log(idCount);

  if(idCount == 0){
    year.fadeAnnotation(2019)
    year.fadeInLine();
    year.changeBackground("")
  }

  if(idCount == 1){
    year.shiftChart("down")
    year.fadeAnnotation(1984)
    year.changeBackground("https://i.giphy.com/media/26AHrsRVKw5lDjRba/giphy.gif")
  }
  else if(idCount == 2){
    year.shiftChart("up")
    year.highlightRegister(false)
    year.changeBackground("")
  }
  if(idCount == 3){
    year.highlightRegister(true)
    year.compareChart(false,[1984])
    year.highlightSong(["When Doves Cry"],1984)
  }

  if(idCount == 4){
    year.compareChart(true,[1984,2017])
    year.shiftChart("up")
    year.highlightRegister(true)
    year.changeBackground("")
    year.highlightSong([""],1984)
  }
  if(idCount == 5){
    year.compareChart(false,[1984])
    year.shiftChart("down")
    year.fadeAnnotation(1988)
    year.changeBackground("https://media.giphy.com/media/3ohjURsduh3JdxkV6o/giphy.gif")
    year.highlightSong([],"none")
  }
  if(idCount == 6){
    year.compareChart(false,[1988])
    year.shiftChart("up")
    year.fadeAnnotation("none")
    year.highlightSong(["Sweet Child O' Mine"],1988)
  }
  if(idCount == 7){
    year.shiftChart("down")
    year.fadeAnnotation(1977)
    year.changeBackground("https://media.giphy.com/media/xT1Ra5lymPYAYTVM0o/giphy.gif")
  }
  if(idCount == 8){
    year.shiftChart("up")
    year.compareChart(false,[1977])
    year.highlightSong(["Got To Give It Up (Pt. I)","We Are The Champions","Sir Duke","Cold As Ice"],1977)

  }
  if(idCount == 9){
    year.shiftChart("down")
    year.fadeAnnotation(1970)
    year.changeBackground("")
  }
  if(idCount == 10){
    year.shiftChart("up")
    year.compareChart(false,[1970])
    year.highlightSong(["The Tears Of A Clown","Cecilia","ABC","I'll Be There","Immigrant Song"],1977)
  }
  if(idCount == 11){
    year.shiftChart("down")
    year.fadeAnnotation(1962)
    year.changeBackground("https://media.giphy.com/media/26FxKEkdhEECnwEYE/giphy.gif")
  }
  if(idCount == 12){
    year.fadeAnnotation(2010)
    year.changeBackground("")
    year.shiftChart("down")
  }
  if(idCount == 13){
    year.shiftChart("up")
    year.compareChart(false,[2010])
    year.highlightSong(["Just The Way You Are","Baby","Grenade","The Lazy Song","U Smile", "Never Let You Go"],2010)
  }
  if(idCount == 14){
    year.shiftChart("down")
    year.fadeAnnotation(2019)
    year.filterForTop10(false)
    year.changeBackground("")
  }
  if(idCount == 15){
    year.filterForTop10(true)
    year.fadeTopAnnotation("")
    year.fadeAnnotation("")
  }
  if(idCount == 16){
    year.fadeTopAnnotation(2019)
    year.shiftChart("down")
  }
  if(idCount == 17){
    year.shiftChart("up")
    year.compareChart(false,[2019])
    year.highlightTopOnly(false)
  }
  if(idCount == 18){
    year.highlightTopOnly(true)
    year.highlightSong(["Talk"],2019)
    year.shiftChart("up")
  }
  if(idCount == 19){
    year.shiftChart("down")
  }


}

function changeChart(direction){

  console.log("changing");

  if(direction == "right" || currentCard < 2){
    currentCard = currentCard + 1;
  }
  else{
    currentCard = Math.max(0,currentCard - 1);
  }

  console.log(currentCard);

  currentId = cardNames[currentCard].card;

  d3.selectAll(".card").classed("is-visible",function(d){
    var cardId = d3.select(this).attr("id");
    if(cardId == currentId){
      return true
    }
    return false;
  });

  if(cardNames[currentCard].audio == "none") {
    currentSoundTrack = "none";
  }

  if(lastAudio){
    if(lastAudio.playing && cardNames[currentCard].audio == "none"){
      stopLastAudio()
    }
  }

  if(cardNames[currentCard].audio != "none" && cardNames[currentCard-1].audio != cardNames[currentCard].audio) {
    playSound();
  }

  if(currentId == "intro"){
    changeIntro();
  }
  else {
    d3.select(".footer").select(".author").style("display","none")
    d3.select(".footer").select(".logo").style("display","block")
  }

  var interval = null;

  if(currentId == "jonas" || currentId == "mendes"){

    playLyrics();

    if(interval){
      clearInterval(interval);
    }
    lyricsCount = 0;

    interval = window.setInterval(function(d){
      if(lastAudio){
        var value = lastAudio.seek();
        if(value > lyricsStamps[lyricsCount + 1]){
          lyricsCount = lyricsCount + 1;
          changeWord();
        }
      }
    },100)

  }
  else {
    clearInterval(interval);
    interval = null;
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
    audio:"none"
  },
  {
    id:"year-6",
    card:"year-chart",
    audio:"https://p.scdn.co/mp3-preview/01c79aa22b13a374980cc1c0c42871b9b77f3038.mp3"
  },
  {
    id:"year-7",
    card:"year-chart",
    audio:"none"
  },
  {
    id:"year-8",
    card:"year-chart",
    audio:"https://p.scdn.co/mp3-preview/760acd645ebaa00533bb73e20627da437a4a5142.mp3"
  },
  {
    id:"year-9",
    card:"year-chart",
    audio:"none"
  },
  {
    id:"year-10",
    card:"year-chart",
    audio:"https://p.scdn.co/mp3-preview/39d220117c9e65f09cda2df24066d1154647f407.mp3"
  },
  {
    id:"year-11",
    card:"year-chart",
    audio:"https://p.scdn.co/mp3-preview/3d1e5ad6cca790e85e25396adc39d5506c2bc2ab.mp3"
  },
  {
    id:"year-12",
    card:"year-chart",
    audio:""
  },
  {
    id:"year-13",
    card:"year-chart",
    audio:"https://p.scdn.co/mp3-preview/a7457c94f24ced0115c865b325e031ea6fb2a964.mp3"
  },
  {
    id:"year-14",
    card:"year-chart",
    audio:"none"
  },
  {
    id:"year-15",
    card:"year-chart",
    audio:"none"
  },
  {
    id:"year-16",
    card:"year-chart",
    audio:"none"
  },
  {
    id:"year-17",
    card:"year-chart",
    audio:"none"
  },
  {
    id:"year-18",
    card:"year-chart",
    audio:"https://p.scdn.co/mp3-preview/2fb54a9c23ec3124319df5739aa081bf9183fa8b.mp3"
  },
  {
    id:"year-19",
    card:"year-chart",
    audio:"none"
  },
  {
    id:"year-20",
    card:"year-chart",
    audio:"none"
  },
  {
    id:"outro-1",
    card:"outro",
    audio:"none"
  }

];

var cardSequence = null;
var currentCard = 0;
var currentId = "intro"
var currentSound = null;
var currentSoundTrack = "none";
var lastAudio = null;
function stopLastAudio() {
  if (!lastAudio) return
  lastAudio.stop()
}

window.onblur = function() {
    stopLastAudio();
};

function playSound(){
  stopLastAudio()

  const newSound = new Howl({
    src: [cardNames[currentCard].audio],
    volume:.8,
    html5: false,
    loop:false,
    onload: function(d){
      console.log("loaded"+cardNames[currentCard].id);
      var thisSource = this._src;
      if(cardNames[currentCard].audio == thisSource){
        currentSoundTrack = cardNames[currentCard].audio
        newSound.play();
        lastAudio = newSound
      }
    }
  });
}

var outroVisible = false;

function init(data) {
  cardSequence = cardNames.map(function(d){return d.id});

  d3.select("#touch").selectAll("div").on("click",function(){
    var direction = d3.select(this).attr("class");
    changeChart(direction)
  })

  d3.select(".about").on("click",function(d){
    if(!outroVisible){
      d3.select(this).select(".circle").text("X");

      d3.selectAll(".card").classed("is-visible",function(d){
        var cardId = d3.select(this).attr("id");
        if(cardId == "outro"){
          outroVisible = true;
          return true
        }
        return false;
      });
    }
    else {
      changeChart("left")
      d3.select(this).select(".circle").text("?");
      outroVisible = false;
    }
  })

}

export default { init, resize };
