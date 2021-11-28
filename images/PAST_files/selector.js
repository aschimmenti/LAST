$( document ).ready(function() {
  $.getJSON('data/index.json',function(indexOfTablets){   
    //getButtons(indexOfTablets); 
    getSeries2(indexOfTablets);  
})})

/*function getButtons(indexOfTablets) {
    $("#series-list").empty()
    $.each(indexOfTablets, function( key, val ) {
      $("#series-list").append("<div class='seriesButton'>" + key + "<select onchange='showTablet(value)' value="+ key +" id="+ key +"></select></div>");
      var list_of_tablets_in_series = indexOfTablets[key]
      var content = [];
      $.each( list_of_tablets_in_series, function( key2, val2 ) {
       content.push("<option value="+ key2 +">"+key2+"</option>")
       });
       $('#'+key).append(content)
    })}
*/

function getSeries2(indexOfTablets) {
  $('#series-list').empty()
  $('#series-list-index').empty()
  $('#series-list').append('<div class="card-deck"><div id="rowdeck" class="row"></div></div>')
  $('#series-list-index').append('<ul class="tablets-index"><li style="list-style: none;">Series / </li></ul>')
  var count = Object.keys(indexOfTablets).length;
  console.log(count)
  nrows = Math.ceil(count / 3);
  console.log(nrows)
  
  $.each(indexOfTablets, function(key, value) {
    $('.tablets-index').append(`<li style="list-style: none;"> <a class="cool-link" onclick="addSeriesTablets('${key}')">
    Pylos ${key}
    </a>
    </li>`)
    $('#rowdeck').append(`<div class="col-md-4 "><div class="card mb-2 border-0">
    <img class="card-img-top img-responsive" src="images/ticon.png" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Pylos ${key} series</h5>
      <p class="card-text">Series description</p>
      <a onclick="addSeriesTablets('${key}')" class="btn btn-primary">Show series</a>
    </div>
  </div>
  </div>`
    )
  });
}
/*<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>*/

function addSeriesTablets(value) {
  $('#series-match').empty()
  $('#form-search').empty()
  $('#series-list').empty()
  $('#series-codes').empty()
  $.getJSON('data/index.json',function(indexOfTablets){
    list_of_codes = indexOfTablets[value]
    console.log(list_of_codes)
    $('#series-codes').append('<div class="card-deck"><div id="rowdeck-series" class="row"></div></div>')
    $('#rowdeck-series').append(`
    <div class="col-md-4 ">
    <div class="card mb-2 border-0">
      <div class="card-body">
      <h5 class="card-title"> Series ${value} </h5>
      <p class="card-text">${value} description</p>
      <a onclick="window.location.reload();" class="btn btn-primary">Go Back</a>
    </div>
    </div></div>`)
    $.each( list_of_codes, function( key, val ) {
      $('#rowdeck-series').append(`
      <div class="col-md-4 ">
      <div class="card mb-2 border-0">
      <img class="card-img-top img-responsive" src="data/${key}/${key}.jpg" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${key.replace('_', ' ')}</h5>
        <p class="card-text"></p>
        <a onclick="showTablet('${key}')" class="btn btn-primary">Show document</a>
      </div>
      </div></div>`
      )
    });
})}



/*function addSeriesMatches(matches) {
  $('#series-codes').empty()
  $.getJSON('data/index.json',function(indexOfTablets){
    $('#series-codes').append("<select onchange='showTablet(value)' id='mat'></select></div>")
    $('#mat').append('<option value="" selected disabled hidden>Matches</option>');
    var content = [];
    $.each(matches, function(idx, val) {
      content.push("<option value="+ val +">"+val+"</option>")
    })
    $('#mat').append(content)
  })
}*/

function addSeriesMatches(matches) {
  $('#series-match').empty()
  $.getJSON('data/index.json',function(indexOfTablets){
    $('#series-match').append("<div id='btn-g' class='btn-group'></div>")
    var setcontent = new Set()
    $.each(matches, function(idx, val) {
      setcontent.add('<button type="button" class="btn btn-danger" onclick="showTablet(\'' +val+ '\')">Match inside ' + val + '</button>' )
    })
    let content = Array.from(setcontent);
    console.log(content)
    $('#btn-g').append(content.join(''))
  })
}

function goBack(series) {
  $('#tabletShower, #signsShower, #notes').empty();
  $("#tabletTitle").text("Documents");
  addSeriesTablets(series);
}


function showTablet(i) {
  $("#signsShower").empty()
  $("#tabletTitle").text("Documents")
  $("#notes").empty()
  $("#tabletShower").empty()
  $('#series-codes').empty()
  series = i.slice(0,2)
  $('#series-codes').append('<button class="btn btn-primary" onClick="goBack(series);"><img src="images/prev.png"> Go back</button>')
  $.getJSON('data/index.json',function(indexOfTablets){
    list_of_filenames = indexOfTablets[series][i]['filenames']
    list_of_filemaps = indexOfTablets[series][i]['file_maps']
    let rows = new Set()
    content = []
    $.each(list_of_filemaps, function(idxmap, tm){ //number of rows of the chosen tablet 
      rows.add(tm[1])
    })
    urows = [...new Set (rows)];
    content.push('<ul>')
    $.each(urows, function (idx_row, row_n) {
      content.push('<li class="images"><span class="li-index">' + row_n + '.</span>' )
      $.each( list_of_filemaps, function(idx, t) {
        row_at_n = []
        
        if (row_n == t[1]) { 
          row_at_n.push("<figure style='display:inline-block;'><img style='width:50px;' src='data/" + i + "/LB_" + i + "_r" + row_n + "_" + t[2] + "_" + t[3] + ".png'><figcaption>" + t[3] + "</figcaption></figure>")
        }
        content.push(row_at_n.join(""))
        
      });
      content.push('</li>')
    })
    content.push('</ul>')
    $("#signsShower").append(content.join(""))
    notes = indexOfTablets[series][i]['notes']
    notes_p = '<p>' + notes +'</p>'
    $("#notes").append(notes_p)
    /*page_title = $("#tabletTitle").text()
    $("#tabletTitle").text(new_title = page_title + ' - ' + i.replace('_', ' '))*/
    $("#tabletTitle").text('Pylos ' + i.replace('_', ' '))
    tablet = '<img data-action="zoom" style="width:100%;" src="data/' + i  +"/" + i + '.jpg">'
    $("#tabletShower").append(tablet)
  });}


  function sConsole(event) {
    $("#signsShower").empty()
    $("#notes").empty()
    $("#tabletShower").empty()
    event.preventDefault();
    var data = document.getElementById("data");
    matches = []
    $('#series-match').empty()
    $.getJSON('data/result2.json',function(index_of_transcriptions){
      $.each(index_of_transcriptions, function(key, value) {
        $.each(value, function(idx, str) {
        if (str.includes(data.value)) {
          console.log(str, data.value)
          matches.push(key)
        }
        })
      })
      addSeriesMatches(matches)        
      })
  }


function form(input_text) {
  $.each(indexOfTablets, function( key, val ) {
    if (input_text in indexOfTablets[key]['transcription']) {
      console.log(input_text)
    }})}