$(document).ready(function(){

	var cn = '<table><tr><td id="main"></td></tr><tr><td id="nav"></td></tr></table>'
	$("#index").html(cn);

    $("#next").click(function(){
	$("style").html("table, td {border: 2px solid green; width: 100%;}")
     $("#main").html("<h1>This is my second page</h1>");
  	$("#nav").html("<p>This is my second page</p>");



    });
});


