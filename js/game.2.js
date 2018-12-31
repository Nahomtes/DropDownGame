var inJson = {};
var pageId = "";
var action = "getFirstPage";
var timeStamp = "";
var score = 0;

$(document).ready(function(){
	var cn = '<h1 style="position: absolute; top: 50%; left: 50%;">Loading ... :)</h1>'
	$("body").html(cn);
	

	inJson = {"svc": "gameScript.2.py", "action":action};
	connectionWithWebServer();




	
});

////////////////////////////////////////
function renderFirstPage(resObj) {
	var cn = '<h1>Select Level:</h1>'
	cn += getSelector("levelObj",resObj["levelObj"])
	cn += '</br></br></br>'
	cn += '<button class="btn" id="2ndPage"> Proceed >> </button>'

	return cn;
};


//////////////////////////////////////////
$(document).on('click','.btn', function(event){
	event.preventDefault();
	var buttonId = $(this).attr("id");
	if (buttonId == "2ndPage") {
			
		inJson["level"]=$("select[name='levelObj']").val()//get selcted level by player 	
		
		if (inJson["level"] == ""){
			alert("You must select level!!!");		
		} else {

		//alert(inJson["level"]);
		inJson["action"] = "getSecondPage";
		//inJson["timeStamp"] = getTimeStamp();
		console.log('After level been selected, inJson='+JSON.stringify(inJson));
		connectionWithWebServer();

		}
	}

	
});
///////////////////////////////////////////////
function trimPlayerAnswer(playerAnswer){

	trimedStr = $.trim(playerAnswer);
	console.log("***************************** trimedStr ==> ",trimedStr);
	return trimedStr;
}
/////////////////////////////////////////////////////
function checkAnswer(resObj){
	
	buttonId = Object.keys(inJson["playerAnswerObj"])[0];
	playerAnswer = inJson["playerAnswerObj"][buttonId];
	

	var questionStat = '';
	if (resObj["answerStatusFor_"+buttonId+""] == "Correct") {
		questionStat = '===> CORRECT :):)';
		
	} else if (resObj["answerStatusFor_"+buttonId+""] == "Incorrect") {
		questionStat = '===> INCORRECT :(:(';
	} else {
		questionStat=resObj["answerStatus"];
	}
		
	$('#'+buttonId+'').html(questionStat)
	

	
	return "";

}
///////////////////////////////////////////
$(document).on('click','.auto_div', function(event){
	event.preventDefault();
	
	var buttonId = $(this).attr("id");
	
	console.log("ButtonId ====> ", buttonId);
	//:checked
	var playerAnswer = $("input[name='"+buttonId+"']:checked").val();
	if (playerAnswer != "" && playerAnswer != undefined) { //This if-statment limit so that only when they select the radio button check for answer by going to the server
		//if (playerAnswer != null){	
		alert(playerAnswer);
		//}
		inJson["playerAnswerObj"] = {[""+buttonId+""]:playerAnswer};
	 	inJson["action"] ="checkForAnswer";

		$("button#"+buttonId).hide();
		

		console.log('checkAnswer Button id=['+buttonId+'] is pressed');
		connectionWithWebServer();
	}
});




////////////////////////////////////////
function moveDivs(){
	alert("HIIIIII");
	$("#id_1").css({"top":"50%"});
	
	$("#id_1").animate({top:"60%"},50000); //red
	var r = $("#id_1").css("top");
	$("#id_2").animate({top:""+r+""},50000); //red
	
	
	return

}





///////////////////////////////////////////
function connectionWithWebServer() {
	var url = '/cgi-bin/dropDownGame/' + inJson["svc"]
	var reqObj = new XMLHttpRequest();
	reqObj.open("POST", url, true);
	reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	reqObj.svc = inJson["svc"]; 
	reqObj.onreadystatechange = function(){
		//alert(reqObj.readyState);
		//alert(this.status);
		if (reqObj.readyState == 4 && reqObj.status == 200) {
			console.log("Web Server response Text: "+this.responseText);
			var resObj = JSON.parse(this.responseText);
			
			if (resObj["taskStatus"] == 1) {
				
				if (inJson["action"] == "getFirstPage") {
					//alert("Working");
					var cn = renderFirstPage(resObj);
					$("body").html(cn);
				} else if (inJson["action"] == "getSecondPage") {
					var cn = displayQuestion(resObj["questions"]);
					$("body").html(cn);
					moveDivs();
				} else if (inJson["action"] == "checkForAnswer"){
					var cn = checkAnswer(resObj);
					
				}
			}
		}
	};

	
	var postData = 'inJson='+JSON.stringify(inJson);
	reqObj.send(postData);
	console.log('request=' + postData);


}

