
$(document).ready(function() {
    
var display = document.getElementById("disBot");
var displayVals = display.text;
var clicks=0;
var start=true;
var negate=false;
var percentUsed=false;
var points = false;

$(".btn").on('click', function(e){
    
 var clickedButton = e.target.id;
 var clickedClass=e.target.className;
 var value=$(this).text();
 var stringMinus = display.innerHTML.charAt(display.innerHTML.length-1);
 var stringMinusOne = display.innerHTML.substr(0,display.innerHTML.length-1);
  
switch(clickedButton){
                             
        case "equals" :
            calculate();
   
            break;

        case "clearAll":
             if(start===false){
                display.innerHTML="";
            }
            
          $('#disBot').css('font-size','2em');
         $('#disBot').css('padding-top','0px');
             display.innerHTML ="0";
             
           start=true;
          negate=false;
          percentUsed=false;
           points = false;
           $(".btn").css("pointer-events", "auto");
            $(".opps").css("pointer-events", "auto");
              $(".func").css("pointer-events", "auto");
             break;

        case "clearLast":
                    
                      display.innerHTML = stringMinusOne ;

                      if( display.innerHTML.length ===0){
                          display.innerHTML="0";
                           $('#disBot').css('font-size','2em');
                            $('#disBot').css('padding-top','0px');
                          start=true;
                      }
                      if(stringMinus==="."){
                          points=false;
                          start=false;
                      }
                break;

             case "sign":
            changeSign();
             break;

        case "percent":
           processPercent();
            break;

        case "plus": 
            displayOperator("+");
         break;
         
     case "minus": 
         displayOperator("-");
           break;

     case "divide":  
         displayOperator("/");
          break;

         case"multiply":  
             displayOperator("x");
         break;
         
     case "zero":
         processZero();
     break;
         
        case "point":  
            
    if(points===false){
        
       if(stringMinus==="."){
             display.innerHTML=stringMinusOne+".";
             start=false;
            points=true;  
         }else if(stringMinus=== "x" ||
                      stringMinus=== "+" ||
                      stringMinus=== "-" ||
                      stringMinus=== "/"||
                       stringMinus=== ""){
                   
                      display.innerHTML+="0.";
                      start=false;
                      points=true;
                      }else{
             
                     display.innerHTML+=".";
                    start=false;
                     points=true;
            }
                  
                  checkDisplayLength();
      
    } 
       
        break;

        default:
            if(start===true){
                
                  display.innerHTML="";
                  display.innerHTML+=value;
                  start=false; 
                  
                }else if(negate===true&&percentUsed===false){
                  
                       display.innerHTML+=value;
                 start=false;
                                         
            }else if(negate===false&&percentUsed===false&&stringMinus!==")"){
             
               display.innerHTML+=value;
        
            start=false;
            }
     
           
            break;
   }
 
 checkDisplayLength();
});
 
 
function checkDisplayLength(){
var len=display.innerHTML.length;

var displaychars=display.innerHTML.substr(0,17);

    if(display.innerHTML.length>=12 && display.innerHTML.length<=13){
         $('#disBot').css('font-size','1.5em');
        $('#disBot').css('padding-top','5px');
        
    }else if(display.innerHTML.length>=17){
     
        
       $(".btn").css("pointer-events", "none");
         $("#disBot").fadeTo("slow", 0.5);
         display.innerHTML="Character Limit--";
       
        setTimeout(function() {
               
       $("#disBot").fadeTo("fast", 1.0);
               display.innerHTML=displaychars;
            
           $(".btn").css("pointer-events", "auto");
        },1800);
        
    }
     
  }


function displayOperator(value){
  var sign = value;
   var stringMinus = display.innerHTML.charAt(display.innerHTML.length-1);
   var stringMinusOne = display.innerHTML.substr(0,display.innerHTML.length-1);
    
    if(start===true){
              display.innerHTML="";
               display.innerHTML ="0";
            start=true;
    
          }else if(start===false&&negate ===false){

              if(display.innerHTML.charAt(display.innerHTML.length-1)==="+" ||
                    display.innerHTML.charAt(display.innerHTML.length-1)==="-"||
                  display.innerHTML.charAt(display.innerHTML.length-1)==="/"||
                  display.innerHTML.charAt(display.innerHTML.length-1)==="x"
                ){
                  display.innerHTML = stringMinusOne+value ;
                       
                
              }else{
                 display.innerHTML = display.innerHTML+value;
             
                   
                  }    
           
          }else if(start===false&&negate ===true){

           display.innerHTML = display.innerHTML+")"+value ;
        
           negate =false;
        
          }
          points=false;
    percentUsed=false;
    
    checkDisplayLength();
   
}


function changeSign(){

var lastChar=display.innerHTML.charAt(display.innerHTML.length-1);

if(start===true){

display.innerHTML="";
display.innerHTML="(-";
negate=true;
start=false;
  
    
}else if(start===false){
var lastOp=findLastOp(display.innerHTML);
var lastOpValue=display.innerHTML.charAt(lastOp);


      if(lastOp===-1){
        display.innerHTML="(-" + display.innerHTML + ")";
  
        negate=false;
      }else if(lastChar===")"){
         
          processDelNeg(display.innerHTML);
       
      }else if(lastOpValue==="+" || lastOpValue==="-"){
        processPosNeg(display.innerHTML);
       
      }else if(lastOpValue==="x" || lastOpValue==="/"){
        processMultDiv(display.innerHTML);
        
      }
      
}
checkDisplayLength();
}//end of function
    
   function processMultDiv(displayInput){

var lastOp=findLastOp(display.innerHTML);
var lastOpValue=display.innerHTML.charAt(lastOp);
var lastChar=display.innerHTML.charAt(display.innerHTML.length-1);
var firstSlice;
var secondSlice;

    if(lastOpValue===lastChar){
        display.innerHTML=display.innerHTML+"(-";
        negate=true;
      
      }else if(lastOpValue !== lastChar){
   
        firstSlice=display.innerHTML.slice(0,lastOp+1);
        secondSlice=display.innerHTML.slice(lastOp+1,display.innerHTML.length);
        display.innerHTML=firstSlice + "(-" + secondSlice + ")";
        negate =false;
   
      }
      checkDisplayLength();
}   

function processPosNeg(displayInput){

var lastOp=findLastOp(display.innerHTML);
var lastOpValue=display.innerHTML.charAt(lastOp);
var lastChar=display.innerHTML.charAt(display.innerHTML.length-1);
var charBeforeLastOp= display.innerHTML.charAt(lastOp-1);
var firstSlice;
var secondSlice;

    if(lastOpValue===lastChar){
     
      if(lastChar ==="+"){
      
      firstSlice=display.innerHTML.slice(0,lastOp);
      display.innerHTML = firstSlice + '-';
  
      }else if(lastChar ==="-" && charBeforeLastOp === '(' &&display.innerHTML.length===2){
      
      firstSlice=display.innerHTML.slice(0,lastOp-1);
      display.innerHTML=firstSlice + "";
      negate=false;
    
      }else if(lastChar ==="-" && charBeforeLastOp !== '('){
      
      firstSlice=display.innerHTML.slice(0,lastOp);
      display.innerHTML =firstSlice + '+';
      }
      
    }else if (lastOpValue !== lastChar){

      if(lastOpValue==="+"){
      
      firstSlice=display.innerHTML.slice(0,lastOp);
      secondSlice=display.innerHTML.slice(lastOp+1,display.innerHTML.length);
      display.innerHTML =firstSlice + '-' + secondSlice;
         
      }else if(lastOpValue==="-"){
      
          if(charBeforeLastOp==="("){
          
          firstSlice=display.innerHTML.slice(0,lastOp);
          secondSlice=display.innerHTML.slice(lastOp,display.innerHTML.length,);
          display.innerHTML=firstSlice + secondSlice;
            
          }else{
          
          firstSlice=display.innerHTML.slice(0,lastOp);
          secondSlice=display.innerHTML.slice(lastOp+1,display.innerHTML.length);
          display.innerHTML=firstSlice + "+" + secondSlice;
              
          }
      }    
        
    }

}


function processDelNeg(displayInput){
    
 var lastOp=findLastOp(display.innerHTML);
var lastOpValue=display.innerHTML.charAt(lastOp);
var lastChar=display.innerHTML.charAt(display.innerHTML.length-1);
var charBeforeLastOp= display.innerHTML.charAt(lastOp-1);
var firstSlice;
var secondSlice;


    firstSlice=display.innerHTML.slice(0,lastOp-1);
    secondSlice=display.innerHTML.slice(lastOp+1,display.innerHTML.length-1);
 
    display.innerHTML=firstSlice+secondSlice;
    
    
    
    checkDisplayLength();
}

function findLastOp(displaystring){
    var lastOp;
    var lastOps=[];
  
     var displayArray=displaystring.split("");
    var lastmultOp = displayArray.lastIndexOf("x");
    var lastplusOp = displayArray.lastIndexOf("+");
    var lastminusOp = displayArray.lastIndexOf("-");
    var lastdivideOp = displayArray.lastIndexOf("/");
    
  lastOp = Math.max(lastmultOp,lastplusOp,lastminusOp,lastdivideOp);

   return lastOp;

}


function processPercent(){
 
var lastOp = findLastOp(display.innerHTML);
  var firstPart=display.innerHTML.slice(0,lastOp+1);
    var lastPart= display.innerHTML.substr(lastOp+1,display.innerHTML.length);
    var num=display.innerHTML;
    var percent=num/100;
    var percentFormat;
 
 if(percentUsed===false){   
       
if(lastOp===-1 && negate===false &&num.length-1!==")"){
 
         
       if(num<10){
            percentFormat=percent.toPrecision(1);
       }else{
            percentFormat=percent.toPrecision(2);
       }
       
   display.innerHTML=percentFormat;
   percentUsed=true;
       
}else if (negate===false && lastPart.charAt(lastPart.length-1) !==")"){

     var percent=lastPart/100;
     
       if(lastPart<10){
            percentFormat=percent.toPrecision(1);
       }else{
            percentFormat=percent.toPrecision(2);
       }
     
    
     display.innerHTML=firstPart+percentFormat;
   
     percentUsed=true;
  
 }else if(lastPart.charAt(lastPart.length-1)===")"){
           firstPart=display.innerHTML.slice(0,lastOp-1);
           display.innerHTML=firstPart+"0";
           
       }

    }
 
  checkDisplayLength();
}     

function processZero(){
  var stringMinus = display.innerHTML.charAt(display.innerHTML.length-1);
 
 
 if(start===true){
     
        display.innerHTML="";
        display.innerHTML+="0.";
        
        start=false;
        
 }else if(start===false){
 
    if(stringMinus ==="x" ||
            stringMinus ==="+" ||
            stringMinus ==="-" ||
           stringMinus ==="/" 
       ){
 
        display.innerHTML+="0.";
        
    }else if(stringMinus === "0" && stringMinus-1 ==="0"){
        display.innerHTML+=".0";
    }else{
        display.innerHTML+="0";
    }
   
    }

            checkDisplayLength();
   
}

function calculate(){
    
  var str=display.innerHTML;
  var multFilter = str.replace(/x/g,"*");
  var negFilter=multFilter.replace(/\(/g,"");
  var finalFilter=negFilter.replace(/\)/g,"");
  
  var answer = eval(finalFilter) ;
  var rounded=Math.round(answer);
  
  display.innerHTML=rounded;
  
  
  if(display.innerHTML.length<=12){
        $('#disBot').css('font-size','2em');
        $('#disBot').css('padding-top','0px');
      }


checkDisplayLength();
 
 $(".num").css("pointer-events", "none");
 $(".opps").css("pointer-events", "none");
 $(".func").css("pointer-events", "none");
}

  });//end doc ready
  
///////////////TODO  round percents but not the answer