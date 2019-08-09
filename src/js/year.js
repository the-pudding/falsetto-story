var data = [{"avg":5.8014,"year":1958},{"avg":5.7442,"year":1959},{"avg":5.8774,"year":1960},{"avg":5.9836,"year":1961},{"avg":5.8371,"year":1962},{"avg":6.0255,"year":1963},{"avg":6.106,"year":1964},{"avg":6.2549,"year":1965},{"avg":6.1895,"year":1966},{"avg":6.2788,"year":1967},{"avg":6.3386,"year":1968},{"avg":6.3666,"year":1969},{"avg":6.5993,"year":1970},{"avg":6.4382,"year":1971},{"avg":6.5219,"year":1972},{"avg":6.444,"year":1973},{"avg":6.5137,"year":1974},{"avg":6.6292,"year":1975},{"avg":6.6217,"year":1976},{"avg":6.7936,"year":1977},{"avg":6.6617,"year":1978},{"avg":6.949,"year":1979},{"avg":6.7048,"year":1980},{"avg":6.734,"year":1981},{"avg":6.8873,"year":1982},{"avg":6.8197,"year":1983},{"avg":7.0364,"year":1984},{"avg":7.0144,"year":1985},{"avg":6.7879,"year":1986},{"avg":7.0802,"year":1987},{"avg":7.0782,"year":1988},{"avg":7.0407,"year":1989},{"avg":7.0807,"year":1990},{"avg":6.8633,"year":1991},{"avg":6.6944,"year":1992},{"avg":6.6033,"year":1993},{"avg":6.3714,"year":1994},{"avg":6.5283,"year":1995},{"avg":6.4479,"year":1996},{"avg":6.4,"year":1997},{"avg":6.055,"year":1998},{"avg":6.246,"year":1999},{"avg":6.25,"year":2000},{"avg":6.178,"year":2001},{"avg":6.1085,"year":2002},{"avg":5.9521,"year":2003},{"avg":6.1322,"year":2004},{"avg":6.1479,"year":2005},{"avg":6,"year":2006},{"avg":5.963,"year":2007},{"avg":6,"year":2008},{"avg":6.075,"year":2009},{"avg":6.3904,"year":2010},{"avg":6.1053,"year":2011},{"avg":6.1656,"year":2012},{"avg":6.3097,"year":2013},{"avg":6,"year":2014},{"avg":6.0514,"year":2015},{"avg":6.0473,"year":2016},{"avg":5.7226,"year":2017},{"avg":5.8837,"year":2018},{"avg":5.95,"year":2019}];


var path = null;
var annotations = null;
var container = null;
var margin = {"bottom":100,"top":50,"left":20,"right":20};
var chartWidth = Math.min(600,d3.select("#content").node().offsetWidth*.9) - margin.left - margin.right;
var chartHeight = Math.min(500,d3.select("#content").node().offsetHeight*.5) - margin.top - margin.bottom;
var yearColumns = null;
var songs = null;

function highlightRegister(toggle){
  yearColumns.selectAll(".year-col").style("display",function(d){
    if(+d.key == 1984){
      return null
    }
    return "none"
  })
  yearColumns.classed("show-register",toggle)
}

function compareChart(toggle,years){
  yearColumns.classed("minify",toggle)
  yearColumns.selectAll(".year-col").style("display",function(d){
    if(years.indexOf(+d.key) > -1){
      return null
    }
    return "none"
  })

}

function shiftChart(direction){

  container
    .transition()
    .duration(1500)
    .style("transform",function(d){
      if(direction=="up"){
        return "translate(0px,"+(-chartHeight - margin.top - margin.bottom)+"px)";
      }
      return null;
    })
    .each(function(d){
      if(direction=="up"){
        d3.select(this).select("svg")
          .transition()
          .duration(1500)
          .style("opacity",.5);

        d3.select(this).select(".song-names")
          .transition()
          .duration(1500)
          .style("opacity",1);
      }
      else{
        d3.select(this).select("svg")
          .transition()
          .duration(1500)
          .style("opacity",null);

        d3.select(this).select(".song-names")
          .transition()
          .duration(1500)
          .style("opacity",null);
      }
    })
}

function fadeInLine(){
  function transition(path) {
    path.transition()
      .duration(2500)
      .delay(500)
      .attrTween("stroke-dasharray", tweenDash)
      //.each("end", function() { d3.select(this).call(transition); });
  }

  function tweenDash() {
    var l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) { return i(t); };
  }

  path.call(transition);
}

function fadeAnnotation(year){
  annotations
    .transition()
    .duration(1000)
    .style("opacity",function(d){
      if(d.year == year){
        return 1;
      }
      return null;
    })
    ;
}

function init(dataToLoad){

  var dataByYear = d3.nest().key(function(d){
    return d.year;
  })
  .entries(dataToLoad[1])

  var maxHeight = 0;

  d3.select("#year-chart").select(".text-parts").selectAll(".text-element").each(function(d){
    if(d3.select(this).node().offsetHeight > maxHeight){
      maxHeight = d3.select(this).node().offsetHeight;
    }
  })

  d3.select("#year-chart").select(".text-parts").style("height",(maxHeight+30)+"px")

  var yearExtent = d3.extent(data,function(d){return d.year});
  var avgExtent = d3.extent(data,function(d){return d.avg});

  var xScale = d3.scaleLinear().domain(yearExtent).range([0,chartWidth])
  var yScale = d3.scaleLinear().domain(avgExtent).range([chartHeight,0])

  var line = d3.line()
    .x(function(d){
      return xScale(d.year)
    })
    .y(function(d){
      return yScale(d.avg)
    })
    ;

  container = d3.select("#year-chart").select(".chart")

  var svg = container.append("svg")
    .attr("width",chartWidth+margin.left+margin.right)
    .attr("height",chartHeight+margin.top+margin.bottom)
    .style("width",chartWidth+margin.left+margin.right+"px")
    .style("height",chartHeight+margin.top+margin.bottom+"px")
    .datum(data);

  var g = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

  path = g.append("path")
    .attr("d",line)
    ;

  annotations = g.append("g")
    .attr("class","annotations-container")
    .selectAll("g")
    .data(function(d){
      return d;
    })
    .enter()
    .append("g")
    .attr("transform",function(d){
      return "translate("+xScale(d.year)+","+yScale(d.avg)+")"
    })

  annotations.append("circle")
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",5)
    ;

  annotations.append("text")
    .attr("x",0)
    .attr("y",-15)
    .text(function(d){
      return +d.year
    })
    ;

  var axis = g.append("g")
    .attr("transform","translate(0,"+chartHeight+")")
    .attr("class","year-container")
    .selectAll("g")
    .data(function(d){
      return d
    })
    .enter()
    .append("g")
    .attr("transform",function(d){
      return "translate("+xScale(d.year)+",0)"
    })

  axis.append("line")
    .attr("x1",0)
    .attr("x2",0)
    .attr("y1",5)
    .attr("y2",12)

  axis
    .append("text")
    .attr("x",0)
    .attr("y",25)
    .text(function(d){
      return d.year;
    })
    ;

  var yearColumnWidth = 150;
  var yearColumnMargin = 30;

  var leftMove = (yearColumnWidth+yearColumnMargin)*(1984-1958);

  yearColumns = container.append("div").attr("class","song-names")
    //.style("transform","translate("+(-leftMove)+"px,0px)")
    .style("height",d3.select("#content").node().offsetHeight-maxHeight+"px")

  var yearColumn = yearColumns
    .selectAll("div")
    .data(dataByYear)
    .enter()
    .append("div")
    .attr("class","year-col")
    ;

  songs = yearColumn.selectAll("p")
    .data(function(d){
      return d.values.slice(0,100)
    })
    .enter()
    .append("p")
    .attr("class","song-name")
    //.style("min-width",yearColumnWidth+"px")
    //.style("margin-right",yearColumnMargin+"px")
    .classed("high-register",function(d){
      if(+d.register > 6){
        return true
      }
      return false;
    })

  songs
    .append("span")
    .text(function(d){
      if(d.song_title.length > 18){
        return d.song_title.slice(0,15)+"..."
      }
      return d.song_title
    })

  var yearName = yearColumn.append("p")
    .attr("class","year-name")
    .text(function(d){
      return d.key;
    })






}


export default { init, fadeAnnotation, fadeInLine, shiftChart, highlightRegister, compareChart };
