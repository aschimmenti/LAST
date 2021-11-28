/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */




  $( document ).ready(function() {
    $.getJSON('js/graph.json',function(clusters){   
        getButtons(clusters);  })})
  

function getButtons(clusters) {
    list_of_names = []
    $('#buttonsList').empty()
    var content = []
    content.push('<div class="btn-group">')
    $.each(clusters, function( idx, dict ) {
        content.push('<button type="button" class="btn btn-danger" onClick="getGraph(' + dict['name'] + ')"> Cluster n.' + dict["name"] +'</button>')
    })
    content.push('</div>')
    console.log(content.join(''))
    $('#buttonsList').append(content.join(''))
}




function getGraph(name) {
    $.getJSON('js/graph.json',function(clusters){
        am4core.useTheme(am4themes_animated);

        // Create chart
        var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);

        // Create series
        var series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
        // Set data
        console.log(clusters[name])
        series.data = [clusters[name]]
        // Set up data fields
        series.dataFields.value = "value";
        series.dataFields.name = "name";
        series.dataFields.children = "children";
        series.links.template.distance = 1;
        series.dataFields.linkWith = "linkWith";

        // Add labels
        series.nodes.template.label.text = "{name}";
        series.nodes.template.fillOpacity = 1;
        series.maxLevels = 2;

        series.fontSize = 10;
        series.minRadius = 15
        series.maxRadius = 30        
        series.manyBodyStrength = -16;
        series.centerStrength = 1;
    })}