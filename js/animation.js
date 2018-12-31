var numList = [];
var boxId = "";

// This function drop random box from the top to the bottom of the page.
function draw(divBox, index) {
    // Base case, help to exit the function when all the box has fall down to the bottom of the page
	
    if (numList.length == divBox.length) {
        alert("Function is exiting now");
        return;
    } else {

        if (divBox[index] != null && index < (divBox.length) && index >= 0) {

            numList.push(index);
          //  alert("numList is: " + numList);
            boxId = divBox[index].id;
          //  alert(boxId + " will drop next...");
	    $('#'+boxId+'').css({"background-color": "Green", "display": "block"});
                
            $('#'+boxId+'').animate({top: "" + viewportheight - 100 + "px"},30000, 
                /* This function will be invoked after one box has falled down*/
                function () {      
                // the if statament prevent to have no more animation if all the box has been droped     
                if (numList.length != divBox.length) { 
                         // random index
                    var newIndex = getRndInteger(0, divBox.length - 1);
              //      alert("newIndex is: " + newIndex);
              //      alert("Has the index been called: " + hasItBeenCalled(newIndex));
                    while (hasItBeenCalled(newIndex) == true) {

                        newIndex = getRndInteger(0, divBox.length - 1);
                //        alert("inside while loop newIndex is: " + newIndex);
               //         alert("Has the index been called: " + hasItBeenCalled(newIndex));
                    }
                    // recursitve call, with new index or new box to drop
              //      alert("The draw function is been invoked");
                    draw(divBox, newIndex);
                } else {
                    alert("All Box has been droped to the bottom of the page.");
                }
               

            
            });
        
        } /* if ends here*/ 
    }/*else ends here*/  
} /*draw() function ends here*/

// This function checks if a box has already fall down to the bottom of the page. 
// Everytime a box fall down the draw function add the box index into array called numList.
// so this function return true if the index is found to be in numList and false otherwise.
function hasItBeenCalled(index) {
    if (numList.length == 0) {
        return false;
    }
    for (var i = 0; i < numList.length; i++) {
        if (numList[i] == index) {
            return true;
        }
    }
    
    return false;
    
    
}



/*This JavaScript function always returns a random number between min and max (both included)*/
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


