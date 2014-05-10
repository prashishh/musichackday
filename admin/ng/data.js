var n = 2, // number of layers
    m = 5, // number of samples per layer
    stack = d3.layout.stack() ,
    layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

var margin = {top: 40, right: 10, bottom: 20, left: 10},
    width = 300 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
.domain(d3.range(m))
.rangeRoundBands([0, width], .08);

var y = d3.scale.linear()
.domain([0, yStackMax])
.range([height, 0]);

var color = d3.scale.linear()
.domain([0, n - 1])
.range(["#aad", "#556"]);

var xAxis = d3.svg.axis()
.scale(x)
.tickSize(0)
.tickPadding(6)
.orient("bottom");

var svg = d3.select("#barChart").append('svg')
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var layer = svg.selectAll(".layer")
.data(layers)
.enter().append("g")
.attr("class", "layer")
.style("fill", function(d, i) { return color(i); });

var rect = layer.selectAll("rect")
.data(function(d) { return d; })
.enter().append("rect")
.attr("x", function(d) { return x(d.x); })
.attr("y", height)
.attr("width", x.rangeBand())
.attr("height", 0);

rect.transition()
.delay(function(d, i) { return i * 10; })
.attr("y", function(d) { return y(d.y0 + d.y); })
.attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

function bumpLayer(n, o) {
  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 0.9 / (.1 + Math.random());
    for (var i = 0; i < n; i++) {
      var w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
  var a = [], i;
  for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
  for (i = 0; i < 5; ++i) bump(a);
  var data =  a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
  return data;
}



function initialize() {

  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(21.431364, 81.7349884)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);

  //map.data.loadGeoJson('/data/states.json');
  map.data.loadGeoJson('/data/sample.json');

  map.data.setStyle({fillColor : 'navy', title : "state"});

  map.data.addListener('click', function(event) {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {fillColor: 'red'});
   
    smallerChart('smallerGraph', event.feature.j['filename']);

    document.querySelector('#schoolDetails').innerHTML  = ('<table class="table table-striped"><thead><tr><td>School Name</td><td>' + event.feature.j['School Name '] + '</td></tr>'+'</thead><thead><tr><td>Route Name</td><td>' + event.feature.j['Route Name'] + '</td></tr>'+'</thead><thead><tr><td>Route Code</td><td>' + event.feature.j['Route Code'] + '</td></tr>'+'</thead><thead><tr><td>Range</td><td>' + event.feature.j['Range'] + '</td></tr><tr><td>Type</td><td>' + event.feature.j['Type'] + '</td></tr><tr><td>Class</td><td>' + event.feature.j['Class'] + '</td></tr></thead><tbody>'+'</tbody></table>');
  });

  map.data.addListener('mouseover', function(event) {
    // map.data.revertStyle();
    // map.data.overrideStyle(event.feature, {strokeWeight: 8});
  });

  map.data.addListener('mouseout', function(event) {
    // map.data.revertStyle();
  });

}
//google.maps.event.addDomListener(window, 'load', initialize);


// schools charts
function setupChart(id, options){
  // make chart object
  var chart = new d3_tsline("#"+ id, options);

  // override parse_date function to handle our data's date format
  chart.parse_date = d3.time.format("%Y-%m-%d").parse;
  chart.parse_val = function(v) {
    return parseInt(v);
  }
  // add some metadata about the series
  chart.series = {
    "aapl" : {
      "name"   : "AAPL",
      "active" : true
    }
  };
  chart.ref_series="aapl";
  chart.view_span = 120;
  // fetch data and draw the chart
  var data = get_aapl();
  chart.setSeriesData("aapl",data);
  chart.render();
}


function smallerChart(id, filename) {
  filename = filename || "indi.csv";
  id = id || "smallerGraph";
  
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%d-%b-%y").parse;

  var x = d3.time.scale()
  .range([0, width]);

  var y = d3.scale.linear()
  .range([height, 0]);

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

  var line = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.close); });

  var svg = d3.select("#"+id).html('').append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("./data/" + filename, function(data, error) {
    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price ($)");

    svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
  });

}
