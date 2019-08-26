"use strict";
class Nav {
    constructor() {
        this.popUps = [];
        this.currentScreen = 'xl';
    }
    init() {
        this.initPopUps();
        this.initClickEvent();
    }
    initPopUps() {
        this.popUps.push({
            clickElement: document.getElementById('search-sm'),
            popUpElement: document.getElementById('search'),
            toogleClass: "flex"
        });
    }
    initClickEvent() {
        this.documentClick();
    }
    documentClick() {
        document.onclick = (e) => {
            console.log('document click');
            this.tooglePopups(e);
        };
    }
    tooglePopups(e) {
        for (let i = 0; i < this.popUps.length; i++) {
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
            let elem = popedElems[i];
            console.log(this.currentScreen);
            if (elem == except)
                continue;
            elem.style.display = "none";
            elem.classList.remove('poped');
        }
    }
    toogle(elem, toogleClass) {
        if (elem.style.display)
            elem.style.removeProperty('display');
        else
            elem.style.display = toogleClass;
    }
}
new Nav().init();
//# sourceMappingURL=nav.js.map