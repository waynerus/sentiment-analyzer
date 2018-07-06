// Set up subtable
function format_sub ( subtable_id ) {
    // `d` is the original data object for the row
  return '<table id="'+subtable_id+'" cellpadding="0" cellspacing="0" border="2" style="width:100%";>'+
      '<thead>'+
      '<th>Date</th>'+
      '<th>User</th>'+
      '<th>Tweet</th>'+
      '<th>Sentiment</th>'+
      //'<th>Sentiment Correction</th>'+          
      '</thead>'+  
    '</table>';
}

//Fill data for subtable
function sub_DataTable(tweets, table_id) {
/*    $.get("/getTweets", { coin: coin }, function( tweets ){
        alert(tweets);
    });
*/        
/*    $.ajax({
        url: "/getTweets",
        method: "GET",
        dataType: "json",
        data: coin
    }).done(function(tweets) {
        //document.getElementById("json").innerHTML = JSON.stringify(jsonList, null, 3);
        tweetList = tweets;
    });*/
    asdf = tweets;
    alert(asdf);
    var subtable = $('table#'+table_id).DataTable({
      "scrollY": "150px",
      "scrollCollapse": true,
      "paging": false,
      "searching": false,
      "data": tweets.data,
      "columns": [
          { "data": "Date" },
          { "data": "RTs" },
          { "data": "Tweets" },
          { "data": "SA" }/*,
          { "data": "sentimentCorrection" }*/
        ]
    });
}

function setupTable(jsonList) {
    alert(jsonList.data);
    var table = $('#coinList').DataTable( {
            "scrollY": true,//"150px",
            "scrollCollapse": true,
            "paging": false,
            "searching": false,
            "data": jsonList.data,
            "columns": [
                {
                    "className":      'details-control',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": ''
                },
                { "data": "symbol" },
                { "data": "percent_change_1h" },
                { "data": "percent_change_24h" },
                { "data": "percent_change_7d" },
                { 
                    "data": "price_btc",
                    "className": "dt-body-right",
                    "render": $.fn.dataTable.render.number(',', '.', 8,'฿')
                },
                { "data": "price_usd" },
                { 
                    "data": "market_cap_usd",
                    "className": "dt-body-right",
                    "render": $.fn.dataTable.render.number(',', '.', 2, '$')
                },
                { 
                    "data": "24h_volume_usd",
                    "className": "dt-body-right",
                    "render": $.fn.dataTable.render.number( ',', '.', 2, '$') 
                }
            ],
            "order": [[1, 'asc']]
    });
    listener(table);
}

function listener(table) {
    $('#coinList tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = table.row(tr);
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
          var virtual_task_id = row.data()[0];
          var subtable_id = "subtable-"+virtual_task_id;
          row.child(format_sub(subtable_id)).show(); // HERE I format the new table
          tr.addClass('shown');
          var coin = table.cell(tr, 1).data();
          /*
          $.get("/getTweets", { coin: coin }
          ).done(function(tweets) {
              sub_DataTable(tweets, subtable_id);
          });
          */
          $.ajax({
              url: "/getTweets",
              method: "GET",
              dataType: "json"
          }).done(function(tweets) {
              alert(tweets);
              sub_DataTable(tweets, subtable_id);
          });
          //sub_DataTable(coin, subtable_id); // HERE I was expecting to load data

        }
    });
}
                            
$(document).ready(function() {
    $.ajax({
        url: "/getTable",
        method: "POST",
        dataType: "json"
    }).done(function(jsonList) {
        //document.getElementById("json").innerHTML = JSON.stringify(jsonList, null, 3);
        setupTable(jsonList);
    });    
});
