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
  $('#series-index-list').empty()
  $('#series-list').append('<div class="card-deck"><div id="rowdeck" class="row"></div></div>')
  $('#series-index-list').append('<li style="list-style: none; font-size: larger;">Series / </li>')
  $.each(indexOfTablets, function(key, value) {
    $('#series-index-list').append(`
    <li style="list-style: none;" id="${key}SeriesList"> <a class="cool-link" onclick="addSeriesTablets('${key}')">
    Pylos ${key} Series
    </a>
    </li>`)
    $('#rowdeck').append(`
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card border-0 document-card-size">
        <div class="card-body text-center">
        <img class="card-img-top img-responsive" src="images/thumbnail${key}.png" alt="Card image cap">
          <h5 class="card-title">Pylos ${key} Series</h5>
          <a onclick="addSeriesTablets('${key}')" class="btn btn-outline-secondary">SHOW SERIES</a>
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
    <a href="#" class="btn btn-outline-secondary">Go somewhere</a>
  </div>
</div>*/

function addSeriesTablets(value) {
  $('#series-match').empty()
  $('#form-search').empty()
  $('#series-list').empty()
  $('#series-codes').empty()
  $.getJSON('data/index.json',function(indexOfTablets){
    list_of_codes = indexOfTablets[value]
    $('#series-codes').append('<div class="card-deck"><div id="rowdeck-series" class="row"></div></div>')
    $('#rowdeck-series').append(`
    <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card mb-2 border-0">
    <div class="card-body text-center">
    <img class="card-img-top img-responsive tablet-card-size" src="images/thumbnail${value}.png" alt="Card image cap">
      <h5 class="card-title"> Series ${value} </h5>
      <a onclick="window.location.reload();" class="btn btn-outline-secondary">GO BACK</a>
    </div>
    </div></div>`)
     
    $(`#${value}SeriesList`).text(`Pylos ${value} Series /`)
    $(`#${value}SeriesList`).append(`<ul id="tablet-li-elements"></ul>`)
    $.each( list_of_codes, function( key, val ) {
      if ( (key === 'category' ) || (key === 'shape' ) || (key === 'series-description' ) || (key === 'author' ) || (key === 'provenance' )) {
        return;
      }
      $('#tablet-li-elements').append(`<li style="list-style: none;"><a onclick="showTablet('${key}')">${key.replace('_', ' ')}</a></li>`)
      $('#rowdeck-series').append(
      `<div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card mb-2 border-0">
      <div class="card-body text-center">
      <img class="card-img-top img-responsive tablet-card-size" src="data/thumbnails/${key}.jpg" alt="Card image cap">
        <h5 class="card-title">${key.replace('_', ' ')}</h5>
        <p class="card-text"></p>
        <a onclick="showTablet('${key}')" class="btn btn-outline-secondary">SHOW TABLET</a>
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
  $('#series-codes').append('<button class="btn btn-outline-secondary" onClick="goBack(series);">GO BACK</button>')
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
    $("#tabletTitle").text('PYLOS ' + i.replace('_', ' '))
    tablet = '<img data-action="zoom" style="width:50vw;" src="data/' + i  +"/" + i + '.jpg">'
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