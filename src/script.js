document.addEventListener("DOMContentLoaded",()=>{
    const display = document.getElementById("calc-display");
    const mem_display = document.getElementById("memory");

    //Only the buttons that have accept class are allowed.
    //As only +, -, /, *, mod, x^2, 1/x, M+, M- and MS operations are required to be performed.
    const buttons = document.getElementsByClassName("accept");

    //Stores the value displayed 
    let currentval = "";
    
    //To store result in memory
    let memory = "";


    //A funcion to evaluate the expressions 
    function calculate_result () {
        let convertedval = currentval.replaceAll("×","*").replaceAll("÷","/").replaceAll("mod","%");
        try {
            let result = eval(convertedval);
            if (result == Infinity){
                display.value = "Cannot divide by 0";
            }else {
                currentval = result.toString();
                display.value = currentval; 
                return currentval;
            }
        } catch (error) {

            display.value = "Invalid Expression";

        }     
    }


    for(let i=0 ; i<buttons.length;i++){
        const button = buttons[i];
        
        //A flag to make sure dot is present only once in expression
        let dot_clicked = false;

        buttons[i].addEventListener("click",()=>{
            const value= button.innerText; 
            
            if(value == "C" ){
                currentval = "";
                display.value = currentval;
            }
            else if ((value == "+" || value == "-" || value == "×"|| value == "÷") && 
            (currentval.slice(-1)== "+" || currentval.slice(-1)== "-" || currentval.slice(-1)== "×" || currentval.slice(-1)== "÷")){
                currentval = currentval.slice(0,-1);
                currentval = currentval + value;
                display.value = currentval;
            }
            else if (value == "⌫"){
                if(currentval.slice(-3) == "mod"){
                    currentval = currentval.slice(0,-3);
                    display.value = currentval;
                }else {
                    currentval = currentval.slice(0,-1);
                    display.value = currentval;
                }
            } 
            else if (value == "χ2"){
                try {
                    if(isNaN(currentval)){
                        throw new error;
                    }
                    var result = eval(currentval * currentval);
                    currentval = result.toString(); 
                    display.value = currentval;
                } catch (e) {
                    display.value = "Invalid Expression";
                }
                
            }else if (value == "1/x"){
                try {
                    if(isNaN(currentval)){
                        throw new error;
                    }
                    var result = eval(1/currentval);
                    if (result == Infinity){
                        display.value = "Cannot divide by 0";}
                        else {
                            currentval = result.toString(); 
                            display.value = currentval;
                        }
                    
                } catch (e) {
                    display.value = "Invalid Expression";
                }
                
            }
            else if (value == "MS"){
                if(currentval != ""){
                    memory = eval(currentval);
                    mem_display.innerText = memory;   
                }   
            }
            else if (value == "MC") {
                memory = "";
                mem_display.innerText = memory;
            }
            else if (value == "MR") {
                currentval = memory.toString();
                display.value = currentval;
            }
            else if (value == "M+"){
                if (memory !== "") {
                    memory = parseFloat(memory) + parseFloat(currentval);
                    mem_display.innerText = memory;
                }
                
            }
            else if (value == "M-"){
                if (memory !== "") {
                    memory = parseFloat(memory) - parseFloat(currentval);
                    mem_display.innerText = memory;
                }
            }
            else if (value == "="){
                calculate_result();
            }
             
            else {
                currentval = currentval + value; 
                display.value = currentval;
            }
           
        })
    }
})