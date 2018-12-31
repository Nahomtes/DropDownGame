////////////////////////////////////
function getInputhtml(listHash){

	var cn = '<input class="'+listHash[0]+'" name="'+listHash[0]+'" type="'+listHash[1]+'" placeholder="'+listHash[2]+'" required=""></input>';
	return cn;
}
////////////////////////////
function getSelector(name, optHash){

	var cn = '<select class="serviceSelect" name='+name+' required>';
	cn += '<option value="" >-- selected</option>';
	for(var key in optHash) {
		cn += '<option value='+key+'>'+optHash[key]+'</option>';
	}
	cn += '</select>';
	return cn;

}
///////////////////////////////////////////////////////////
function rndrTable(inObj){
   
	var table='<table width=100% border=1>';
	for(var i in inObj){
		table += '<tr>';           
		for(var j in inObj[i]){
			table += '<td>' + inObj[i][j] + '</td>';
		}
		table += '</tr>';
	}
	table += '</table>';
	return table;
}

///////////////////////////////////////////////////////////
function rndrTableForm(objList){
	
	var table='<table width=100% border=1>';
	for(var i in objList){
		table += '<tr>';
		table += '<td>' + objList[i]["label"] + '</td>';
		var tmpObj = {"name":objList[i]["field"], "type":"text", "value":objList[i]["value"]};
		var txtBox = rndrHtmlElement(tmpObj);
		table += '<td>' + txtBox + '</td>';
		table += '</tr>';
	}
	table += '</table>';
	return table;
}


///////////////////////////////////////////////////////////
function rndrHtmlElement(inObj){

	var elm = '<input ';
	for(var att in inObj){
		elm += att + '=' + inObj[att] + ' ';
	}
	elm += '>';
	return elm;
}
/////////////////////////This function is used in crime.html////////////////////////////
function displayStatus(inObj){
	var pstyle = '"color: blue"';
	var cn = '<p>';
	var fname = inObj["fname"];
	var lname = inObj["lname"];
	if (fname != "" || lname != ''){

		if (inObj["fnamestatus"] || inObj["lnamestatus"]){
			cn += ''+fname+ ' is guilty';
		} else {
			cn += ''+lname+ ' is <span style="color: blue">not</span> guilty';
		}
	} else {
		cn += 'Please put your name on the box to see your results :)'	
	}
		
	cn += '</p>';

	return cn;
  
}
/////////////////////////////////////////////////////////
function displayquestion(quesObj){
	var cn ='';
	var counter = 0; 
	var s1= 'position: absolute; width:400px; height:200px; border: 3px dashed red;';
	var n = quesObj.length;
	for (var i=0; i <n; i++){
		var l =i * 410;
		var t = 0;
		var s2 = s1 + 'left:' + l +'px;' + 'top:' + t + 'px;';
		 
		cn += '<div class="question" style="'+s2+'">'+quesObj[i][1]+'</div>';
	}
	return cn;

		//cn += '<p>' + quesObj[i][1] +'<input type="text" name="answer_'+quesObj[i][0]+'" placeholder="Answer here..."/></p></br>'
		//cn +='<p id="answer_'+quesObj[i][0]+'"></p>'
		//cn += '</br><button type="submit" class="checkAnswer" id="answer_'+resObj[key][keyList][0]+'">Check Answer for # '+counter+' </button>'
		//cn += '</div>'
		
}
function displayQuestion(quesObj) {


	var cn ="";
	
	var s2 = 'style="padding: 5px;"';
	var n = quesObj.length
	var textHolder = [];
	var quesNum = 1;
	var idKey = ""	
	for (var i in quesObj){
		
		q_id = i;
		q_txt = quesObj[i]["question"];
		c_lst = quesObj[i]["choice_list"];
		var s1= 'style="border: 1px solid"';
		idKey = 'id_'+q_id+'';

		cn += '<div class="auto_div" id='+idKey+' '+s1+ '>';
		cn += '<form>';
		cn += '<p>'+quesNum+'.) '+q_txt+'</p>';
		cn += '<p style="padding-left: 20px;">'
		quesNum++;
		
		for (var j in c_lst) {
			cn += '<input type="radio" name='+idKey+' value="'+c_lst[j]["choice_label"]+'" '+s2+'/>'+c_lst[j]["choice_label"]+'. '+c_lst[j]["choice_text"]+'</br>';
			
		}
		cn += '</p>';
		cn += '</form>'
		cn += '</div>'
		
		textHolder[textHolder.length] += {idKey:cn}
	}
	console.log('textHolder =====> '+JSON.stringify(textHolder))
	//container(textHolder);
	return cn;
}







