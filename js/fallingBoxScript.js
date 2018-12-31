var positionAdjusterObj = [];
////////////////////////////////////////////////////////
function container(quesObj,speed) { //[{key:value},{key:value},{key:value},...]
	//alert("ffffffffffffffffffffff");
	var cnn = '';
	cnn += '<div id="sideBar"><p>Score: <input type="text" ></input></p></div>';
	cnn += '<div id="gameScreen"></div>';
	cnn += '';
			
	$("body").html(cnn);
	document.getElementById("gameScreen").style = 'height: ' + (window.innerHeight-10)+ 'px;'
	document.getElementById("sideBar").style = 'height: ' + (window.innerHeight/3)+ 'px;'
	
	///////////////////////////Populating box///////////////////////////////////////
	
	

	function CreateDivBox(top,left,quesObj,speed){
		
		this.a_top = top;
		this.a_left = left;  
		this.create = function() {
			alert(quesObj.length);
			for (var i = 0; i < quesObj.length; i++){
				alert("ffffffffffffffffffffff");
				this.a_left = getRndInteger(0, 100-30); //randomly choice where the box apear horizontally 20% to 100%
				//alert(Object.keys(quesObj)[i]);
				var myNewDiv = new BoxObj(i,this.a_top,this.a_left,Object.keys(quesObj)[i],quesObj[i]); // pass resObj as argument
				this.a_top -= getRndInteger(50,80);
				
				window.document.getElementById("gameScreen").innerHTML += myNewDiv.createDiv;  // create all the box
				positionAdjusterObj[i] = new PositionAdjuster(myNewDiv.top,myNewDiv.left,myNewDiv.idName,.5,speed);
				alert("idName ", myNewDiv.idName  );
		
			}
			
		
			
				var r = setInterval( function() {positionAdjusterObj[0].fallDown()}, speed);
				//r = setInterval( function() {positionAdjusterObj[1].fallDown()}, speed);
				//r = setInterval( function() {positionAdjusterObj[2].fallDown()}, speed);
				//r = setInterval( function() {positionAdjusterObj[3].fallDown()}, speed);
				//r = setInterval( function() {positionAdjusterObj[4].fallDown()}, speed);
				//r = setInterval( function() {positionAdjusterObj[5].fallDown()}, speed);
			//	var r = setInterval( function() {positionAdjusterObj[6].fallDown()}, speed);
				//var r = setInterval( function() {positionAdjusterObj[7].fallDown()}, speed);
				//var r = setInterval( function() {positionAdjusterObj[8].fallDown()}, speed);
				//var r = setInterval( function() {positionAdjusterObj[9].fallDown()}, speed);
			
			return;
		}
			
		
	}
	function BoxObj(idName,b_top, b_left,quesId,especificQuesObj){ // add resObj as argument, change the idName with the id from DB auto increment
		
		var cn = '';
		var ques_id = "";
		var quesNum = 1;
		
		ques_id = "id_"+quesId+"";
		q_txt = especificQuesObj["question"];
		c_lst = especificQuesObj["choice_list"];

		cn += '<div class="auto_div" id='+ques_id+'" style="position: absolute;';
		cn += ' top: '+b_top+'%; left: '+b_left+'%; background-color: green;">';
		cn += '<p>'+quesNum+'.) '+q_txt+'</p>';
		cn += '<p style="padding-left: 20px;>';
		for (var j in c_lst) {
			cn += '<input type="radio" name='+idKey+' value="'+c_lst[j]["choice_label"]+'" '+s2+'/>'+c_lst[j]["choice_label"]+'. '+c_lst[j]["choice_text"]+'</br>';
			//cn += '';
		}
			
		cn += '</p>';
		cn += '</div>';
			

		
		
		this.createDiv = cn;
		
		this.idName = key;
		this.top = b_top;
		this.left = b_left;

	}
	
	
	var createDivBoxObj = new CreateDivBox(-30, -30,quesObj,speed); // add resObj as argument
	createDivBoxObj.create();
	
	

	//*******************Populating box end************************//

	function PositionAdjuster(currentTop, currentLeft,divId,addNumpx,speed){
		
		this.currentTop = currentTop;
		this.currentLeft = currentLeft;
		this.divId = divId; // demo2
		this.style1 = "";
		this.addNumpx = addNumpx 
		//this.mySetInterval = //alert("it's coming here");//setInterval(fallDown(), speed);
		this.push = function(){
			return this.currentTop + this.addNumpx; 
		}
		this.fallDown = function() {
			
			this.style1 = 'top: '+this.currentTop+'%; left: '+this.currentLeft+'%;';
			//alert(this.t);
			 
			if (this.currentTop < 100-30){ // limit to the window height;
				this.currentTop = this.push();
				//	alert(this.t);
				//	alert(this.style1);
				document.getElementById(this.divId).style = this.style1;
				//document.getElementById(this.divId).innerHTML = this.currentTop;
			} 
			return;
		}
	}

	function pushFromTopBy(currtopPx, addNumPx) {
		return currtopPx + addNumPx;   
		
	} 

}
