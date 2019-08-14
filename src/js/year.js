var data = [{"avg":5.8014,"year":1958},{"avg":5.7442,"year":1959},{"avg":5.8774,"year":1960},{"avg":5.9836,"year":1961},{"avg":5.8371,"year":1962},{"avg":6.0255,"year":1963},{"avg":6.106,"year":1964},{"avg":6.2549,"year":1965},{"avg":6.1895,"year":1966},{"avg":6.2788,"year":1967},{"avg":6.3386,"year":1968},{"avg":6.3666,"year":1969},{"avg":6.5993,"year":1970},{"avg":6.4382,"year":1971},{"avg":6.5219,"year":1972},{"avg":6.444,"year":1973},{"avg":6.5137,"year":1974},{"avg":6.6292,"year":1975},{"avg":6.6217,"year":1976},{"avg":6.7936,"year":1977},{"avg":6.6617,"year":1978},{"avg":6.949,"year":1979},{"avg":6.7048,"year":1980},{"avg":6.734,"year":1981},{"avg":6.8873,"year":1982},{"avg":6.8197,"year":1983},{"avg":7.0364,"year":1984},{"avg":7.0144,"year":1985},{"avg":6.7879,"year":1986},{"avg":7.0802,"year":1987},{"avg":7.0782,"year":1988},{"avg":7.0407,"year":1989},{"avg":7.0807,"year":1990},{"avg":6.8633,"year":1991},{"avg":6.6944,"year":1992},{"avg":6.6033,"year":1993},{"avg":6.3714,"year":1994},{"avg":6.5283,"year":1995},{"avg":6.4479,"year":1996},{"avg":6.4,"year":1997},{"avg":6.055,"year":1998},{"avg":6.246,"year":1999},{"avg":6.25,"year":2000},{"avg":6.178,"year":2001},{"avg":6.1085,"year":2002},{"avg":5.9521,"year":2003},{"avg":6.1322,"year":2004},{"avg":6.1479,"year":2005},{"avg":6,"year":2006},{"avg":5.963,"year":2007},{"avg":6,"year":2008},{"avg":6.075,"year":2009},{"avg":6.3904,"year":2010},{"avg":6.1053,"year":2011},{"avg":6.1656,"year":2012},{"avg":6.3097,"year":2013},{"avg":6,"year":2014},{"avg":6.0514,"year":2015},{"avg":6.0473,"year":2016},{"avg":5.7226,"year":2017},{"avg":5.8837,"year":2018},{"avg":5.95,"year":2019}];

var dataTop = [ { "avg": 5.9189, "year": 1958 }, { "avg": 5.6727, "year": 1959 }, { "avg": 5.9811, "year": 1960 }, { "avg": 6.1538, "year": 1961 }, { "avg": 5.7931, "year": 1962 }, { "avg": 6.2115, "year": 1963 }, { "avg": 6.4203, "year": 1964 }, { "avg": 6.3625, "year": 1965 }, { "avg": 6.1954, "year": 1966 }, { "avg": 6.4853, "year": 1967 }, { "avg": 6.25, "year": 1968 }, { "avg": 6.6119, "year": 1969 }, { "avg": 6.9552, "year": 1970 }, { "avg": 6.6415, "year": 1971 }, { "avg": 6.5065, "year": 1972 }, { "avg": 6.6786, "year": 1973 }, { "avg": 6.4026, "year": 1974 }, { "avg": 6.9697, "year": 1975 }, { "avg": 6.807, "year": 1976 }, { "avg": 6.8545, "year": 1977 }, { "avg": 6.7917, "year": 1978 }, { "avg": 7.1111, "year": 1979 }, { "avg": 6.8868, "year": 1980 }, { "avg": 6.86, "year": 1981 }, { "avg": 6.8571, "year": 1982 }, { "avg": 6.8906, "year": 1983 }, { "avg": 7.0952, "year": 1984 }, { "avg": 7.0625, "year": 1985 }, { "avg": 6.8571, "year": 1986 }, { "avg": 7.0169, "year": 1987 }, { "avg": 7.2055, "year": 1988 }, { "avg": 7.0526, "year": 1989 }, { "avg": 7.0638, "year": 1990 }, { "avg": 7.119, "year": 1991 }, { "avg": 6.8696, "year": 1992 }, { "avg": 6.8182, "year": 1993 }, { "avg": 6.4, "year": 1994 }, { "avg": 6.2778, "year": 1995 }, { "avg": 6.5882, "year": 1996 }, { "avg": 6.7368, "year": 1997 }, { "avg": 6.1818, "year": 1998 }, { "avg": 6.6667, "year": 1999 }, { "avg": 6.3462, "year": 2000 }, { "avg": 6.2381, "year": 2001 }, { "avg": 6.1667, "year": 2002 }, { "avg": 6.375, "year": 2003 }, { "avg": 6.5625, "year": 2004 }, { "avg": 6.15, "year": 2005 }, { "avg": 6.2143, "year": 2006 }, { "avg": 6.3182, "year": 2007 }, { "avg": 6.28, "year": 2008 }, { "avg": 6.8235, "year": 2009 }, { "avg": 6.9167, "year": 2010 }, { "avg": 6.2667, "year": 2011 }, { "avg": 6.3, "year": 2012 }, { "avg": 6.7059, "year": 2013 }, { "avg": 6.4762, "year": 2014 }, { "avg": 6.8333, "year": 2015 }, { "avg": 6.5, "year": 2016 }, { "avg": 6.2353, "year": 2017 }, { "avg": 6.1818, "year": 2018 }, { "avg": 7.6, "year": 2019 } ];

var path = null;
var annotations = null;
var container = null;
var margin = {"bottom":100,"top":50,"left":20,"right":30};
var chartWidth = Math.min(600,d3.select("#touch").node().offsetWidth*.9) - margin.left - margin.right;
var chartHeight = Math.min(500,d3.select("#touch").node().offsetHeight*.5) - margin.top - margin.bottom;
var yearColumns = null;
var songs = null;
var svg = null;
var yearColumn = null;
var avgExtent = null;
var avgTopExtent = null;
var xScale = null;
var yScale = null;
var line = null;
var topCircles = null;
var registerNums = null;

function filterForTop10(toggle){
  if(toggle){
    yScale.domain(avgTopExtent);
  }
  else{
    yScale.domain(avgExtent);
  }

  topCircles
    .attr("transform",function(d){
      return "translate("+xScale(d.year)+","+yScale(d.avg)+")"
    })
    .selectAll("circle")
    .transition()
    .duration(0)
    .style("display",function(d){
      if(toggle){
        return "block"
      }
      return null;
    })
    .style("opacity",function(d){
      return 0
    })
    .duration(function(d){
      if(toggle){
        return 1000
      }
      return 0;
    })
    .delay(function(d){
      if(toggle){
        return 1000
      }
      return 0;
    })
    .style("opacity",function(d){
      if(toggle){
        return 1
      }
      return 0;
    })
    ;


  annotations
    .transition("position")
    .duration(function(d){
      if(toggle){
        return 1000
      }
      return 0;
    })
    .attr("transform",function(d){
      return "translate("+xScale(d.year)+","+yScale(d.avg)+")"
    })

  path
    .transition()
    .duration(0)
    .attr("stroke-dashoffset", 0)
    .transition()
    .duration(function(d){
      if(toggle){
        return 1000
      }
      return 0;
    })
    .attr("d",line);

  registerNums
    .transition()
    .duration(function(d){
      if(toggle){
        return 1000
      }
      return 0;
    })
    .attr("transform",function(d){
      return "translate(0,"+yScale(d)+")"
    });
}

function highlightSong(songName,year){
  yearColumn.filter(function(d){
      return d.key == year
    }).selectAll(".song-name").classed("song-highlight",function(d){
      if(songName.indexOf(d.song_title) > -1){
        return true
      }
      return false;
    })
}


function changeBackground(src){


  d3.select("#year-chart")
    .select(".background-image")
    .classed("overlay-mix",true)
    .transition()
    .duration(1000)
    .style("opacity",function(){
      if(src != ""){
        return 1
      }
      return null;
    })
    ;

  d3.select("#year-chart")
    .select(".background-image")
    .select("img")
    .attr("src",src);
}


function highlightRegister(toggle){
  yearColumns.selectAll(".year-col").style("display",function(d){
    if(+d.key == 1984){
      return null
    }
    return "none"
  })
  yearColumns.classed("show-register",toggle)
}

function highlightTopOnly(toggle){
  yearColumns.classed("show-top",toggle)
}

function compareChart(toggle,years){
  yearColumns.classed("minify",toggle)
  yearColumns.selectAll(".year-col").transition().duration(0).style("display",function(d){
    if(years.indexOf(+d.key) > -1){
      return null;
    }
    return "none"
  })

}

function shiftChart(direction){

  d3.select("#year-chart")
    .transition()
    .duration(0)
    .style("background-color",function(d){
      if(direction == "up"){
        return "#a4c098"
      }
      return null;
    })

  container
    .transition()
    .duration(0)
    .style("transform",function(d){
      if(direction=="up"){
        return "translate(0px,"+(-chartHeight - margin.top - margin.bottom)+"px)";
      }
      return null;
    })

    if(direction=="up"){
      svg
        .transition()
        .duration(0)
        .style("opacity",0);

      container.select(".song-names")
        .transition()
        .duration(0)
        .style("opacity",1);
    }
    else if (direction == "down"){
      svg
        .transition()
        .duration(0)
        .style("opacity",null);

      container.select(".song-names")
        .transition()
        .duration(0)
        .style("opacity",null);
    }
}

function fadeInLine(){
  path
    .transition()
    .duration(2500)
    .delay(750)
    .attr("stroke-dashoffset", 0);
}


function fadeTopAnnotation(year){
  topCircles
    .selectAll("circle")
    .transition("color")
    .duration(500)
    .style("fill",function(d){
      if(d.year == year){
        return "#112d3a";
      }
      return null;
    })
    .style("stroke-width",function(d){
      if(d.year == year){
        return "20px";
      }
      return null;
    })
    ;

}

function fadeAnnotation(year){

  annotations
    .transition()
    .duration(500)
    .style("opacity",null)
    .transition()
    .duration(1000)
    .delay(250)
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
  avgExtent = d3.extent(data,function(d){return d.avg});
  avgTopExtent = d3.extent(dataTop,function(d){return d.avg});

  xScale = d3.scaleLinear().domain(yearExtent).range([0,chartWidth])
  yScale = d3.scaleLinear().domain(avgExtent).range([chartHeight,0])

  line = d3.line()
    .x(function(d){
      return xScale(d.year)
    })
    .y(function(d){
      return yScale(d.avg)
    })
    ;

  container = d3.select("#year-chart").select(".chart")

  svg = container.append("svg")
    .attr("width",chartWidth+margin.left+margin.right)
    .attr("height",chartHeight+margin.top+margin.bottom)
    .style("width",chartWidth+margin.left+margin.right+"px")
    .style("height",chartHeight+margin.top+margin.bottom+"px")
    .datum(data);

  container.select(".arrow")
    .style("width",chartWidth+margin.left+margin.right+"px")
    .style("height",chartHeight+margin.top+margin.bottom+"px")


  var g = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

  var gTopTen = svg.append("g")
    .attr("class","top-path")
    .attr("transform","translate("+margin.left+","+margin.top+")")
    .datum(dataTop)

  topCircles = gTopTen
    .selectAll("g")
    .data(function(d){
      return d;
    })
    .enter()
    .append("g")
    .attr("transform",function(d){
      return "translate("+xScale(d.year)+","+yScale(d.avg)+")"
    })

  topCircles
    .append("circle")
      .attr("cx",0)
      .attr("cy",0)
      .attr("r",5)
      ;

  // gTopTen
  //   .append("path")
  //     .attr("d",line)
  //     ;

  path = g.append("path")
    .attr("d",line)
    ;

    var totalLength = path.node().getTotalLength();

    path.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)

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

  registerNums = svg.append("g")
    .attr("transform","translate(0,"+margin.top+")")
    .attr("class","num-container")
    .selectAll("g")
    .data(d3.range(Math.round(avgExtent[0]),Math.round(avgExtent[1])+1,.5))
    .enter()
    .append("g")
    .attr("transform",function(d){
      return "translate(0,"+yScale(d)+")"
    })

  registerNums
    .append("text")
    .text(function(d){
      return d;
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

  yearColumn = yearColumns
    .selectAll("div")
    .data(dataByYear)
    .enter()
    .append("div")
    .attr("class","year-col")
    .style("display","none")
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
    .classed("peak-rank",function(d){
      if(+d.peak_rank < 11){
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


export default { init, fadeAnnotation, fadeInLine, shiftChart, highlightRegister, compareChart, changeBackground, highlightSong, filterForTop10, fadeTopAnnotation, highlightTopOnly };
