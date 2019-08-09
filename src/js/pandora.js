import * as d3ScaleChromatic from 'd3-scale-chromatic'

var bars = null;
var songs = null;
var container = null;
var avgLine = null;

function fadeInBars(){
  songs
    .transition()
    .duration(1000)
    .delay(function(d,i){
      return 500+i*Math.random()*15;
    })
    .style("display","block")
    .style("height","100%")

  container.selectAll(".annotation")
    .transition()
    .duration(1000)
    .style("opacity",0);
}

function fadeOutBars(){
  songs
    .transition()
    .duration(0)
    .style("display",null)
    .style("height",null)

  container.selectAll(".annotation")
    .transition()
    .duration(0)
    .style("opacity",null);
}

function onlyMale(){

  songs
    .transition()
    .duration(0)
    .style("display",function(d){
      if(d.gender == "male" && +d.register != 0 && +d.spoken < 8 && d.genre != "Rap/Hip hop"){
        return "block";
      }
      return "none";
    })
    .style("height","100%")

}

function showAvgLine(){
  avgLine
    .transition()
    .duration(1000)
    .style("opacity",1)
}

function hideAvgLine(){
  avgLine
    .transition()
    .duration(0)
    .style("opacity",null)
}

function init(data){

  var registerData = d3.nest().key(function(d){
    return +d.register;
  })
  .sortKeys(function(a,b){
    return b-a;
  })
  .entries(data[0]);

  var goodData = data[0].filter(function(d){
    return d.gender == "male" && +d.register != 0 && +d.spoken < 8 && d.genre != "Rap/Hip hop";
  })

  var extent = d3.extent(registerData,function(d){return +d.key;});
  var scaleShift = d3.scaleLinear().domain(extent).range([0,1])

  container = d3.select("#single-year").select(".pandora-chart");

  var maxHeight = 0;

  d3.select("#single-year").select(".text-parts").selectAll(".text-element").each(function(d){
    if(d3.select(this).node().offsetHeight > maxHeight){
      maxHeight = d3.select(this).node().offsetHeight;
    }
  })

  d3.select("#single-year").select(".text-parts").style("height",(maxHeight+30)+"px")

  bars = container.selectAll("div")
    .data(registerData)
    .enter()
    .append("div")
    .attr("class","number-bar")
    .each(function(d,i){
      if(extent.indexOf(+d.key) > -1){
        if(+d.key == extent[0]){
          d3.select(this).append("p")
            .attr("class","annotation")
            .append("span")
            .html("Barry White&rsquo;s register")
            .style("background-color",function(d){
              return d3.interpolateWarm(scaleShift(+d.key));
            })
            .style("color","white")
        }
        else{
          d3.select(this).append("p")
            .attr("class","annotation")
            .append("span")
            .html("Pony&rsquo;s register")
            .style("background-color",function(d){
              return d3.interpolateWarm(scaleShift(+d.key));
            })

        }
      }
    })
    ;

  songs = bars.selectAll("div").data(function(d){
      return d.values;
    })
    .enter()
    .append("div")
    .attr("class","song")
    .style("background-color",function(d){
      var key = d3.select(this.parentNode).datum().key;
      return d3.interpolateWarm(scaleShift(key));
    })
    ;

  bars.append("p")
    .attr("class","bar-name")
    .text(function(d,i){
      return d.key;
    })

  var reScale = d3.scaleLinear().domain(extent).range([0,100]);

  avgLine = container.append("div")
    .attr("class","average-line")
    .style("top",function(d){
      return reScale(d3.mean(goodData.map(function(d){return +d.register})))+"%"
    })

  avgLine
    .append("p")
    .attr("class","label")
    .append("span")
    .text("Average")
    ;

  avgLine
    .append("p")
    .attr("class","avg-num")
    .append("span")
    .text(Math.round(d3.mean(goodData.map(function(d){return +d.register}))*100)/100)
    ;


}

export default { init, fadeInBars, fadeOutBars, onlyMale, showAvgLine, hideAvgLine };
