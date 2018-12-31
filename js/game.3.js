var inJson = {};
var pageId = "";
var action = "getFirstPage";
var timeStamp = "";
var score = 0;

$(document).ready(function(){
    var cn = '<h1>HIIIIIIIIIIIIIII!!!</h1>'
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
/*Render the second page*/
function renderSecondPage(questionsToDisplay) {
	var cn ='';
	cn += '<div class="grid">'
		cn += '<div class="header">'
			cn += 'Header'
			cn += '<img src="image/zulatech-logo.PNG" alt="zulatech logo">'
		cn += '</div>'
		cn += '<div class="mainBody">'
			cn += '<div class="sideBar">'
				
				cn += '<div class="backArrow">'
					cn += '<a class="back-arrow" href="n/a">'
						cn += '<img src="image/back-arrow.PNG" alt="back arrow">'
						cn += '<p>Back</p>'
					cn += '</a>'
				cn += '</div>'
				
				cn += '<div class="score">'
					cn += '<p>SCORE<p>'
					cn += '<p id="score-value">0<p>'	
				cn += '</div>'	
				cn += '<div class="level">'
					cn += '<p>LEVEL<p>'
					cn += '<p>'+inJson["level"]+'<p>'
					
				cn += '</div>'
				
			cn += '</div>'

			cn += '<div id="re" class="gameScreen">Game Screen'
				cn += '<img src="image/game.jpg" alt="placeHoler picture">'
			cn += '</div>'
				
			cn += '<div class="blankSpace">Blank Space</div>'
			
	
		cn += '</div>'
		cn += '<div class="footer">Footer</div>'
	cn += '</div>'

	return cn;
    //displayQuestion(questionsToDisplay);
};

//////////////////////////////////////////
/*EventHandler when the button with class name 'btn' is clicked*/
$(document).on('click','.btn', function(event){
    event.preventDefault();
    /*buttonId will hold the the current id value*/
    var buttonId = $(this).attr("id");
    if (buttonId == "2ndPage") {
                 
        if (inJson["level"] == ""){
            alert("You must select level!!!");        
        } else {
            /*retrieve the level selected by player and store it as value to the key 'level' in inJson */
            inJson["level"] = $("select[name='levelObj']").val()//get selcted level by player     

            //alert(inJson["level"]);
            inJson["action"] = "getSecondPage";
            //inJson["timeStamp"] = getTimeStamp();
            console.log('After level been selected, inJson='+JSON.stringify(inJson));
            /*We have to invoke this function to communicate with our web server.
            Why? because we will request to send us the questons for the inJson["level"]*/
            connectionWithWebServer();

        }
    }

    
});
///////////////////////////////////////////////
/*This function trim by removing whitespace from input of player Answer.*/
function trimPlayerAnswer(playerAnswer) {

    var trimedStr = playerAnswer.trim();
    console.log("***************************** trimedStr ==> ",trimedStr);
    return trimedStr;
}
/////////////////////////////////////////////////////
/*This function check if the payer answer is correct or incorrect.
It has an argument of resObj, that is the object that the web server respone back when 
requested to check answer. */
function checkAnswer(resObj){

    buttonId = Object.keys(inJson["playerAnswerObj"])[0];
    playerAnswer = inJson["playerAnswerObj"][buttonId];
    

    var questionStat = '';
    if (resObj["answerStatusFor_" + buttonId + ""] == "Correct") {
        questionStat = '===> Your answer is CORRECT :):)';
	score += 1;
    } else if (resObj["answerStatusFor_" + buttonId + ""] == "Incorrect") {
        questionStat = '===> Your answer is INCORRECT :(:(';
	if (score > 0) {	
	    score -= 1;
	}
    } else {
        questionStat = resObj["answerStatus"];
    }
        
    $('#' + buttonId + '').html(questionStat);
    window.document.getElementById("score-value").innerHTML = score;

    
    return "";

}
///////////////////////////////////////////

/*EventHandler when one of the falling box is clicked*/
$(document).on('click','.auto_div', function(event){
    event.preventDefault();
    
    var buttonId = $(this).attr("id");
    
    console.log("ButtonId ====> ", buttonId);
    //:checked
    var playerAnswer = $("input[name='" + buttonId + "']:checked").val();
    /*This if-statment limit so that only when the player select the 
    radio button check is when the program go to the server to check for the player answer*/
    if (playerAnswer != "" && playerAnswer != undefined) { 
        
        alert("playerAnswer: " + playerAnswer);
       /*save the player answer and also the box id in the payerAnswerObj
       so that will be easy when trying to check answer in web server.
       This inJson is the json that will be send to our web server as a request to 
       check the answer of the player answer.*/
        inJson["playerAnswerObj"] = {["" + buttonId + ""]:playerAnswer};
        inJson["action"] = "checkForAnswer";

        /*We will hide the falling box, right after the player has checked one of the radio button*/
        //$("#" + buttonId).hide();
        

        console.log('checkAnswer Button id=[' + buttonId + '] is pressed');
        connectionWithWebServer();
    }
});

/////////////////////////////////////////
/*questionsToDisplay comes from web server as json respond.
*   questionsToDisplay ==> format is below
{   "1": {
        "choice_list" : [
            {
                "choice_label": "A",
                "choice_text": "ls-ltr"
            }
            {
                "choice_label": "B",
                "choice_text": "cp"
            }
            {
                "choice_label": "C",
                "choice_text": "rm"
            }
            {
                "choice_label": "D",
                "choice_text": "cd"
            }
        ],
        "question":"What is the command used to change directory?"
    }
    "2": { ..  }
    "3": { ..  }
    ....
    "[questionsToDisplay.length]": { ..  }
}

*/
function displayQuestion(questionsToDisplay) {
    var cn = '';/*cn is variable that store all the html text. cn is also 
        what this function will return and will be posted into the body of the second page */
    var number_of_box = Object.keys(questionsToDisplay).length;
   
    alert("number_of_box: " + number_of_box);
    var questionText = ""; /*questionText store the actual question text*/
    var choiceList = []; /*choiceList store the positble answer(multiple choice) for the question*/
    var pushTopBy =  0; /*This will usually be set to zero or -1*height of the div box*/
    var pushLeftBy = 0; /*The pixel that the div box will be pushed to the right by so that all of the
                        div box could apear randomly on the screen*/
    for (var i = 0; i < number_of_box; i++) {
        /* quesId is the id of the current question (also later it 
        * will be used to create the id of div box(id_[quesId]) 
        */

        var quesId = Object.keys(questionsToDisplay)[i];
        //alert("Number of box will be: " + questionsToDisplay.length);
       
        var boxId = ""; /*This will be placeholder for each div box id*/
        var boxNum = i + 1;  /*This will be the number of the box: 1,2, ... number_of_box*/  
            
        boxId = "id_" + quesId + "";/*concatenate 'id_' with the question id that came from the web server*/
        questionText = questionsToDisplay[quesId]["question"]; 
        choiceList = questionsToDisplay[quesId]["choice_list"];

        pushTopBy = 0;
        pushLeftBy = getRndInteger(100, viewportwidth-500);
        cn += '<div class="auto_div" id=' + boxId + ' style="position: absolute; display: none;';
        cn += ' top: ' + pushTopBy + 'px; left: ' + pushLeftBy + 'px; background-color: green;">';
        cn += '<p>' + boxNum + '.) ' + questionText + '</p>';
        cn += '<p style="padding-left: 20px;">';
        for (var j in choiceList) {
            cn += '<input type = "radio" name = "' + boxId + '" value = "' + choiceList[j]["choice_label"] + '" />'
            + choiceList[j]["choice_label"] + '. ' + choiceList[j]["choice_text"] + '</br>';
            //cn += '';
        }
                
        cn += '</p>';
        cn += '</div>';
    } /*for loop ends here*/

    return cn;

} /*displayQuestion() ends here*/

/*This JavaScript function always returns a random number between min and max (both included)*/
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function doAnimation() {
    /*divBox is collection of all the div box that has 'box' as thier class name*/
    var divBox = window.document.getElementsByClassName("auto_div");
    alert("divBox length: " + divBox.length);
    // alert("The draw function will be invoked");
    /*Randomly, the draw() function will make all the div box fall down to the bottom of the page.*/
    draw(divBox, getRndInteger(0, divBox.length - 1));
    alert(" viewportwidth x viewportheight: " + viewportwidth + " x " + viewportheight );

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
            console.log("Web Server response Text: " + this.responseText);
            var resObj = JSON.parse(this.responseText);
            
            if (resObj["taskStatus"] == 1) {
                
                if (inJson["action"] == "getFirstPage") {
                    //alert("Working");
                    var cn = renderFirstPage(resObj);
                    $("body").html(cn);
                } else if (inJson["action"] == "getSecondPage") {
		   var cn = renderSecondPage(resObj["questions"]);
		   $("body").html(cn);
                   cn = displayQuestion(resObj["questions"]);
		 /*  window.document.getElementsByClassName("gameScreen").innerHTML += cn;   */        
                    window.document.body.innerHTML += cn;
                    doAnimation();
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


