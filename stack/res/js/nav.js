"use strict";
class Nav {
    constructor() {
        this.popUps = [];
        this.currentScreen = 'xl';
    }
    init() {
        this.detectScreen();
        this.initPopUps();
        this.initClickEvent();
        this.windowResizeEvent();
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
            displayType: "flex",
            acceptedScreen: ['sm', 'md']
        });
    }
    initClickEvent() {
        document.onclick = (e) => {
            console.log('document click');
            this.tooglePopups(e);
        };
    }
    tooglePopups(e) {
        for (let i = 0; i < this.popUps.length; i++) {
            if (this.popUps[i].acceptedScreen.indexOf(this.currentScreen) == -1)
                continue;
            if (this.popUps[i].clickElement.contains(e.target)) {
                this.toogle(this.popUps[i].popUpElement, this.popUps[i].displayType);
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
        for (let i = 0; i < this.popUps.length; i++) {
            console.log(this.currentScreen);
            if (this.popUps[i].acceptedScreen.indexOf(this.currentScreen) == -1)
                continue;
            if (this.popUps[i].popUpElement == except)
                continue;
            if (this.popUps[i].popUpElement.style.display != "none")
                this.popUps[i].popUpElement.style.display = "none";
        }
    }
    toogle(elem, displayType) {
        if (elem.style.display == "none" || elem.style.display == "")
            elem.style.display = displayType;
        else
            elem.style.display = "none";
    }
    detectScreen() {
        if (window.matchMedia("(max-width:640px)").matches) {
            if (this.currentScreen != 'sm') {
                console.log('sm screen detected');
                this.currentScreen = 'sm';
                this.changeForSM();
            }
            return;
        }
        if (window.matchMedia("(max-width:790px)").matches) {
            if (this.currentScreen != 'md') {
                this.currentScreen = 'md';
                console.log('md screen detected');
                this.changeForMD();
            }
            return;
        }
        if (window.matchMedia("(max-width:980px)").matches) {
            if (this.currentScreen != 'lg') {
                this.currentScreen = 'lg';
                console.log('lg screen detected');
                this.changeForLG();
            }
            return;
        }
        if (this.currentScreen != 'xl') {
            this.currentScreen = 'xl';
            console.log('xl screen detected');
            this.changeForXL();
        }
    }
    changeForSM() {
    }
    changeForMD() {
    }
    changeForLG() {
        console.log('---changeForLG---');
        document.getElementById('search').setAttribute('style', '');
    }
    changeForXL() {
    }
}
new Nav().init();
//# sourceMappingURL=nav.js.map