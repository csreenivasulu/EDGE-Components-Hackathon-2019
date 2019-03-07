var totalRecords = 0;
var records = [];
var table ;

$.ajax({
    url: "employees",
    async: true,
    dataType: 'json',
    success: function (data) {
        records = data;
        //console.log(records);
        generate_table();
        pagination();
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            if(value == 0){
                return pagination();
            }
            $("#paginate tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                $('#page_navigation').empty();
            });
        });
    }
});

function generate_table() {
    var tr;
    $('#paginate').html('');
    //console.log(records);

    for (var i = 0; i < records.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + records[i].Id + "</td>");
        tr.append("<td>" + records[i].employee_name + "</td>");
        tr.append("<td>" + records[i].employee_salary + "</td>");
        
        $('#paginate').append(tr);
    }
}
function pagination(){
makePager = function(page){
    var showPerPage = 12;
    var numOfItems = $('#paginate tr').length;
    var numOfPages = Math.ceil(numOfItems / showPerPage);
    var numOfPagesTodisplay = 5;
    var navigationHtml = '';
    var currentPage = page;

    var activeLink = (numOfPagesTodisplay >= currentPage ? 1 : numOfPagesTodisplay + 1);
    if (currentPage > 1)
        activeLink = currentPage;
    if (activeLink != 1) navigationHtml += "<a class='nextbutton' href=\"javascript:first();\">« Start</a><a class='nextbutton' href=\"javascript:previous();\">« Prev</a>";
    
    if (activeLink == numOfPages - 1) activeLink = activeLink - 3;
    
    else if (activeLink == numOfPages) activeLink = activeLink - 4;
    
    else if (activeLink > 2) activeLink = activeLink - 2;
    
    else activeLink = 1;
    var pages = numOfPagesTodisplay;
    
    while (pages != 0) {
        
        if (numOfPages < activeLink) { break; }
        
        if (activeLink >= 1)
            navigationHtml += "<a class='" + ((activeLink == currentPage) ? "currentPageButton" : "numericButton") + "' href=\"javascript:showPage(" + activeLink + ")\" longdesc='" + activeLink + "'>" + (activeLink) + "</a>";
        activeLink++;
        pages--;
    }
    
    if (numOfPages > currentPage){
        navigationHtml += "<a class='nextbutton' href=\"javascript:next()\">Next »</a><a class='nextbutton' href=\"javascript:last(" + numOfPages + ");\">Last »</a>";
    }
            $('#page_navigation').html(navigationHtml);

}
var pageSize = 12;
showPage = function (page) {
        $("#paginate tr").hide();
        $('#currentPage').val(page);
        $("#paginate tr").each(function (n) {
            if (n >= pageSize * (page - 1) && n < pageSize * page)
                $(this).show();
    });

    makePager(page);
    }
    showPage(1);
    next = function () {
        newPage = parseInt($('#currentPage').val()) + 1;
        showPage(newPage);

    }

    last = function (numOfPages) {
        newPage = numOfPages;
        $('#currentPage').val(newPage);
        showPage(newPage);
    }

    first = function () {
        var newPage = "1";
        $('#currentPage').val(newPage);
        showPage(newPage);    
    }

    previous = function () {
        newPage = parseInt($('#currentPage').val()) - 1;
        $('#currentPage').val(newPage);
        showPage(newPage);
    }
}

function sortTable(f,l){
    var rows = $('#employee tbody  tr').get();

    rows.sort(function(a, b) {
        var A = getVal(a);
        var B = getVal(b);

        if(A < B) {
            return -1*f;
        }

        if(A > B) {
            return 1*f;
        }
        return 0;

    });

    function getVal(elm){
        var v = $(elm).children('td').eq(l).text().toUpperCase();
        if($.isNumeric(v)){
            v = parseInt(v,10);
        }
        return v;
    }

    $.each(rows, function(index, row) {
        $('#employee').children('tbody').append(row);
    });

}
var Col1 = -1;
var Col2 = -1;
var Col3 = -1;
$("#Col1").click(function(){
    Col1 *= -1;
    var l = $(this).prevAll().length;
    sortTable(Col1,l);
    pagination();
});

$("#Col2").click(function(){
    Col2 *= -1;
    var l = $(this).prevAll().length;
    sortTable(Col2,l);
    pagination();
});

$("#Col3").click(function(){
    Col3 *= -1;
    var l = $(this).prevAll().length;
    sortTable(Col3,l);
    pagination();
});
