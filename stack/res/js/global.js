
var clickRegisteredElements = [];
clickRegisteredElements.push([document.getElementById('search-sm-btn'),
    document.getElementById('search-down'), "flex"]);
clickRegisteredElements.push([document.getElementById('search-sm-icon'),
    document.getElementById('search-down'), "flex"]);

// document.getElementById('search-sm-btn').addEventListener('click',()=>{
//     console.log('clicked');
//     let elem = document.getElementById('search-down');
//     console.log(elem.style.display);
//     if(elem.style.display == "none"){
//         elem.style.display = "flex";
//     } 
//     else if(elem.style.display != "none") elem.style.display = "none";
// })

document.onclick = function (e) {
    console.log('document click');
   // debugger;
    tooglePopups(e);
}

function tooglePopups(e) {
    //debugger;
    for (let i = 0; i < clickRegisteredElements.length; i++) {
        if (e.target == clickRegisteredElements[i][0]) {
            toogle(clickRegisteredElements[i][1], clickRegisteredElements[i][2]);
            makeInvisible(clickRegisteredElements[i][1]);
            return;
        }

        else if (e.target == clickRegisteredElements[i][1]) {
            makeInvisible(i);
            return;
        }

    }

    makeInvisible(null);
}

function toogle(elem, displayVal) {
    if (elem.style.display == "none") elem.style.display = displayVal;
    else elem.style.display = "none";
}
function makeInvisible(except) {
    for (let i = 0; i < clickRegisteredElements.length; i++) {
        if (clickRegisteredElements[i][1] == except) continue;
        if (clickRegisteredElements[i][2] != "none")
            clickRegisteredElements[i][1].style.display = "none";
    }
}

// function toogleSearchBox(e){
//     console.log('toogleSearch');
//     let searchElem = document.getElementById('search');
//     if(document.getElementById('searchBox').style.display == "none"){
//         console.log('searchBox is none');
//           if(e.target == searchElem){
//               if(document.getElementById('search-down').style.display == "none"){
//                 document.getElementById('search-down').style.display == "flex";
//               }
//               else document.getElementById('search-down').style.display == "none";
//           }
//           else document.getElementById('search-down').style.display == "none";
//     }
// }