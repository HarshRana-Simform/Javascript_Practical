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

        // Convert the symbols to supported operators and functions in javascript
        let convertedval = currentval.replaceAll("×","*").replaceAll("÷","/")
        .replaceAll("mod","%").replace("sqrt(","Math.sqrt(")
        .replaceAll("π","*3.1415").replaceAll("e","*2.71828")
        .replaceAll("log(","Math.log10(").replaceAll("ln(","Math.log(");
        
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
            // Over-rides with current operator if multiple operators inputed
            else if ((value == "+" || value == "-" || value == "×"|| value == "÷") && 
            (currentval.slice(-1)== "+" || currentval.slice(-1)== "-" || currentval.slice(-1)== "×" || currentval.slice(-1)== "÷")){
                currentval = currentval.slice(0,-1);
                currentval = currentval + value;
                display.value = currentval;
            }
            else if (value == "⌫"){
                // To delete the whole word 'mod' in single click
                if(currentval.slice(-3) == "mod"){
                    currentval = currentval.slice(0,-3);
                    display.value = currentval;
                }else {
                    currentval = currentval.slice(0,-1);
                    display.value = currentval;
                }
            } 

            // To evaluate square
            else if (value == "χ2"){
                try {
                    if(isNaN(currentval)){
                        throw new error;
                    }
                    let result = eval(currentval * currentval);
                    currentval = result.toString(); 
                    display.value = currentval;
                } catch (e) {
                    display.value = "Invalid Expression";
                }
              
            // To evaluate the inverse of a result
            }else if (value == "1/x"){
                try {
                    if(isNaN(currentval)){
                        throw new error;
                    }
                    let result = eval(1/currentval);
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

            // Memory store function
            else if (value == "MS"){
                if(currentval != ""){
                    memory = eval(currentval);
                    mem_display.innerText = memory;   
                }   
            }
            // Memory clear function
            else if (value == "MC") {
                memory = "";
                mem_display.innerText = memory;
            }
            // Memory restore
            else if (value == "MR") {
                currentval = memory.toString();
                display.value = currentval;
            }
            // Add to memory
            else if (value == "M+"){
                if (memory !== "") {
                    memory = parseFloat(memory) + parseFloat(currentval);
                    mem_display.innerText = memory;
                }
                
            }
            // Subtract from memory
            else if (value == "M-"){
                if (memory !== "") {
                    memory = parseFloat(memory) - parseFloat(currentval);
                    mem_display.innerText = memory;
                }
            }
            
            // Adding the square root function in place of symbol
            else if(value == "2√x"){
                currentval = currentval + "sqrt(";
                display.value = currentval;
            }

            // Adding the log with base 10 to input string
            else if(value == "log"){
                currentval = currentval + "log(";
                display.value = currentval;
            }

            // Adding log with base e natural log to input string
            else if(value == "ln"){
                currentval = currentval + "ln(";
                display.value = currentval;
            }

            // Evaluates the expression by calling calculate_result
            else if (value == "="){
                calculate_result();
            }
                      
            // Appends the next inputed value to the currentval
            else { 
                    currentval = currentval + value; 
                    display.value = currentval;
                
            }
           
        })
    }
})