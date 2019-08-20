
document.getElementById('btn').addEventListener('click', ()=>{
    console.log('clicked');
    let elem = document.getElementById('test');
    console.log(elem.style.display);
    if(elem.style.display == "none") elem.style.display = "block";
    else if(elem.style.display == "block") elem.style.display = "none";
    
})