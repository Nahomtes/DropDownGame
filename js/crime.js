var txnJson = {};
var pageId = "firstpage";
var timeStamp = "";

////////////////////EVent handers////////////////////
$(document).ready(function (){
	var cn = '<table width=100% border=1>';
	cn += '<tr><td id=main class=main></td></tr>';
	cn += '<tr><td id=btn class=btn></td></tr>';
	cn += '</table>';
	$('body').html(cn);
	 
	txnJson = {"svc":"screen.py", "pageid":pageId}
	setMainRow();
});

//////////////////////////////////////////////////////
$(document).on('click', '.btnclass', function (event) {
	event.preventDefault();
	while ($( "input[name='fname']").val() == "" || $( "input[name='fname']").val() == "") {
		alert("Hello! I am an alert box!!");	
	}	
	var btnId = $(this).attr("id");
	if (btnId == "btnid1"){
		
		txnJson["fname"] = $( "input[name='fname']").val();
		console.log(txnJson);   
	}
	else if (btnId == "btnid2"){
		txnJson["lname"] = $( "input[name='lname']").val();
		console.log(txnJson);
	}
	setMainRow();
});

///////////////Functions////////////////////
function setMainRow(){
        var url = '/cgi-bin/project-3/'+ txnJson["svc"];
        var reqObj = new XMLHttpRequest();
        reqObj.open("POST", url, true);
        reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        reqObj.svc = txnJson["svc"];   
        reqObj.onreadystatechange = function() {
		if (reqObj.readyState == 4 && reqObj.status == 200) {
			txnJson = JSON.parse(reqObj.responseText);
			if(txnJson["taskstatus"] == 1){
                           	if (txnJson["pageid"] == "firstpage"){
                    			var cn = renderFirstPage();
                                   	$("#main").html(cn);
                            	} else if (txnJson["pageid"] == "secondpage"){
                    			var cn = renderSecondPage();
                                        $("#main").html(cn);
                		} else if (txnJson["pageid"] == "thirdpage"){
                    			var cn = renderThirdPage();
                                        $("#main").html(cn);
                		}
                	}
                }
        };
	var postData = 'txnjson='+JSON.stringify(txnJson)
	reqObj.send(postData);
	console.log(postData);   
}

///////////////////////////////////////////////
function renderFirstPage(){
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table border=1>';
	cn += '<tr><td>Enter first name</td></tr>';
	cn += '<tr><td><input name=fname type=text value=""></td></tr>';
	cn += '<tr><td id="btnid1" class="btnclass" style="'+btnStyle+'">Step 1 of 3 >> Next</td></tr>';
	cn += '</table>';
		       
	return cn;
}
//////////////////////////////////////////////
function renderSecondPage(){

	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table border=1>';
	cn += '<tr><td>Enter last name</td></tr>';
	cn += '<tr><td><input name=lname type=text value=""></td></tr>';
	cn += '<tr><td id="btnid2" class="btnclass" style="'+btnStyle+'">Step 2 of 3 >> Next</td></tr>';
	cn += '</table>';

	return cn;

}
/////////////////////////////////////////////
function renderThirdPage(){
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var text = displayStatus(txnJson)
	var cn ='<table border=1>';
	  
	cn += '<tr><td>Third Page</td></tr>'
	cn += '<tr><td>'+text+'</td></tr>'

	cn += '<tr><td id="btnid3" class="btnclass" style="'+btnStyle+'">Step 3 of 3</td></tr>';
	cn += '</table>'
	   

	return cn;
	
}
