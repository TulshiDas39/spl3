
var clickRegisteredElements = [];
clickRegisteredElements.push([document.getElementById('search-sm'),
    document.getElementById('search'), "flex"]);
// clickRegisteredElements.push([document.getElementById('search-sm-icon'),
//     document.getElementById('search'), "flex"]);

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
        if (clickRegisteredElements[i][0].contains(e.target)) {
            toogle(clickRegisteredElements[i][1], clickRegisteredElements[i][2]);
            makeInvisible(clickRegisteredElements[i][1]);
            return;
        }

        else if (clickRegisteredElements[i][1].contains(e.target)) {
            makeInvisible(clickRegisteredElements[i][1]);
            return;
        }

    }

    makeInvisible(null);
}

function toogle(elem, displayVal) {
    if (elem.style.display == "none" || elem.style.display == "") elem.style.display = displayVal;
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