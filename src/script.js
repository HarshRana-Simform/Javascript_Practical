document.addEventListener("DOMContentLoaded",()=>{
    const display = document.getElementById("calc-display");

    console.log(display);
    const buttons = document.getElementsByClassName("btn");
    let currentval = "";
    for(let i=0 ; i<buttons.length;i++){
        const button = buttons[i];
        buttons[i].addEventListener("click",()=>{
            const value= button.innerText; 
            if(value == "C" ){
                currentval = "";
                display.value = currentval;
            }else {
                currentval = currentval + value; 
                display.value = currentval;
            }
           
        })
    }
})