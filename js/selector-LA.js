$( document ).ready(function() {
  $.getJSON('indexTablets.json',function(indexOfTablets){   
    getSeries2(indexOfTablets);
    //getButtons(indexOfTablets); 
})})


function getSeries2(indexOfTablets) {
  $('#series-list').empty()
  $('#series-index-list').empty()
  $('#series-list').append('<div class="card-deck"><div id="rowdeck" class="row"></div></div>')
  $('#series-index-list').append('<li style="list-style: none; font-size: larger;">Series / </li>')
  $.each(indexOfTablets, function(key, value) {
    $('#series-index-list').append(`
    <li style="list-style: none;" id="${key}SeriesList"> <a class="cool-link" onclick="addSeriesTablets('${key}')">
     ${key} Series
    </a>
    </li>`)
    $('#rowdeck').append(`
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card border-0 document-card-size">
        <div class="card-body text-center">
        <img class="card-img-top img-responsive" src="images/thumbnail${key}.png" alt="Card image cap">
          <h5 class="card-title"> ${key} Series</h5>
          <a onclick="addSeriesTablets('${key}')" class="btn btn-outline-secondary">SHOW SERIES</a>
        </div>
      </div>
    </div>`
    )
  });
}


function addSeriesTablets(value) {
  $('#series-match').empty()
  $('#form-search').empty()
  $('#series-list').empty()
  $('#series-codes').empty()
  $.getJSON('indexTablets.json',function(indexOfTablets){
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
     
    $(`#${value}SeriesList`).text(`${value} Series /`)
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

  arrayi = i.split("_")
  series = arrayi[0]
  $('#series-codes').append('<button class="btn btn-outline-secondary" onClick="goBack(series);">GO BACK</button>')
  $.getJSON('indexTablets.json',function(indexOfTablets){
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
        if (row_n < 10) {
          rightrow = '0' + row_n.toString()
        } 
        else {
          rightrow = row_n
        }
        if (rightrow == t[1]) { 
          console.log(series)
          console.log(i)
          row_at_n.push(`<figure style='display:inline-block;'><img style='width:50px;' src='tablets/${series}/${i}/LA_${i}_r${rightrow}_${t[2]}_${t[3]}.png'><figcaption>${t[3]}</figcaption></figure>`)
          console.log("<figure style='display:inline-block;'><img style='width:50px;' src='tablets/" + series + "/" + i + "/LA_" + i + "_r" + rightrow + "_" + t[2] + "_" + t[3] + ".png'><figcaption>" + t[3] + "</figcaption></figure>")
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
