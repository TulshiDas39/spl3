"use strict";
class Nav {
    constructor() {
        this.popUps = [];
        this.currentScreen = 'xl';
        this.vanishingPopups = false;
        // private changeForSM(): void {
        // }
        // private changeForMD(): void {
        // }
        // private changeForLG(): void {
        //     console.log('---changeForLG---');
        //     document.getElementById('search').setAttribute('style', '');
        // }
        // private changeForXL(): void {
        // }
    }
    init() {
        //this.detectScreen();
        this.initPopUps();
        this.initClickEvent();
        // this.windowResizeEvent();
    }
    windowResizeEvent() {
        window.onresize = () => {
            this.detectScreen();
        };
    }
    initPopUps() {
        this.popUps.push({
            clickElement: document.getElementById('search-sm'),
            popUpElement: document.getElementById('search'),
            toogleClass: "flex",
            acceptedScreen: ['sm', 'md']
        });
    }
    initClickEvent() {
        this.documentClick();
        // this.searchSmClicked();
    }
    // private searchSmClicked(){
    //     document.getElementById('search-sm').addEventListener('click',()=>{
    //         console.log('search sm btn clicked');
    //         document.getElementById('search').style.display = "flex";
    //         this.addPopedTag('search');
    //     })
    // }
    // private addPopedTag(id:string){
    //     setTimeout(() => {
    //         let elem = document.getElementById(id);
    //         if(elem.style.display != "none") elem.classList.add('poped');
    //     }, 500);
    // }
    documentClick() {
        document.onclick = (e) => {
            console.log('document click');
            //this.vanishPopups(e);
            this.tooglePopups(e);
        };
    }
    // private vanishPopups(e: MouseEvent) {
    //     let popedElem = document.getElementsByClassName('poped');
    //     for (let i = 0; i < popedElem.length; i++) {
    //         let elem = <HTMLElement>popedElem[i];
    //         if (e.target != elem) {
    //             elem.style.removeProperty('display');
    //             elem.classList.remove('poped');
    //         }
    //     }
    // }
    tooglePopups(e) {
        for (let i = 0; i < this.popUps.length; i++) {
            // if (this.popUps[i].acceptedScreen.indexOf(this.currentScreen) == -1) continue;
            if (this.popUps[i].clickElement.contains(e.target)) {
                this.toogle(this.popUps[i].popUpElement, this.popUps[i].toogleClass);
                this.makeInvisible(this.popUps[i].popUpElement);
                return;
            }
            else if (this.popUps[i].popUpElement.contains(e.target)) {
                this.makeInvisible(this.popUps[i].popUpElement);
                return;
            }
        }
        this.makeInvisible(null);
    }
    makeInvisible(except) {
        let popedElems = document.getElementsByClassName('oped');
        for (let i = 0; i < popedElems.length; i++) {
            console.log(this.currentScreen);
            //if (this.popUps[i].acceptedScreen.indexOf(this.currentScreen) == -1) continue;
            if (this.popUps[i].popUpElement == except)
                continue;
            this.popUps[i].popUpElement.style.display = "none";
            this.popUps[i].popUpElement.classList.remove('poped');
        }
    }
    toogle(elem, displayClass) {
        if (elem.style.display)
            elem.style.removeProperty('display');
        else
            elem.style.display = displayClass;
        // if (elem.style.display == "none" || elem.style.display == "") elem.style.display = displayType;
        // else elem.style.display = "none";
    }
    detectScreen() {
        if (window.matchMedia("(max-width:640px)").matches) {
            if (this.currentScreen != 'sm') {
                console.log('sm screen detected');
                this.currentScreen = 'sm';
                //this.changeForSM();
            }
            return;
        }
        if (window.matchMedia("(max-width:790px)").matches) {
            if (this.currentScreen != 'md') {
                this.currentScreen = 'md';
                console.log('md screen detected');
                //this.changeForMD();
            }
            return;
        }
        if (window.matchMedia("(max-width:980px)").matches) {
            if (this.currentScreen != 'lg') {
                this.currentScreen = 'lg';
                console.log('lg screen detected');
                //this.changeForLG();
            }
            return;
        }
        if (this.currentScreen != 'xl') {
            this.currentScreen = 'xl';
            console.log('xl screen detected');
            //this.changeForXL();
        }
    }
}
new Nav().init();
//# sourceMappingURL=nav.js.map