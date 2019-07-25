"use strict";
class Ask {
    constructor() {
        this.stages = ['about_question', 'ask_tags', 'titleDiv', 'similarity_check', 'guidDiv', 'review'];
        this.currentStage = this.stages[0];
    }
    init() {
        this.addNextButtonListener();
        this.addPreviousButtonListener();
    }
    addPreviousButtonListener() {
        document.getElementById('prevBtn').addEventListener('click', () => {
            if (this.currentStage == this.stages[1])
                this.loadInitialView();
            else if (this.currentStage == this.stages[2])
                this.loadTagView();
            else if (this.currentStage == this.stages[3])
                this.loadTitleView();
            else if (this.currentStage == this.stages[4])
                this.loadSimilarityCheck();
            else if (this.currentStage == this.stages[5])
                this.loadDescriptionView();
        });
    }
    addNextButtonListener() {
        document.getElementById('nextBtn').addEventListener('click', () => {
            if (this.currentStage == this.stages[0])
                this.loadTagView();
            else if (this.currentStage == this.stages[1])
                this.loadTitleView();
            else if (this.currentStage == this.stages[2])
                this.loadSimilarityCheck();
            else if (this.currentStage == this.stages[3])
                this.loadDescriptionView();
            else if (this.currentStage == this.stages[4])
                this.loadReview();
            else if (this.currentStage == this.stages[5])
                this.postQuestion();
        });
    }
    // private removeCurrentView(){
    //     if(this.currentStage == this.stages[0]){
    //         this.changeDisplayOfElementsByClass()z
    //     }
    //         else if(this.currentStage == this.stages[1]) this.loadTitleView();
    //         else if(this.currentStage == this.stages[2]) this.loadSimilarityCheck();
    //         else if(this.currentStage == this.stages[3]) this.loadDescriptionView();
    //         else if(this.currentStage == this.stages[4]) this.loadReview();
    //         else if(this.currentStage == this.stages[5]) this.postQuestion();
    // }
    loadSimilarityCheck() {
        this.changeDisplayOfElementsByClass(this.currentStage, 'none');
        this.currentStage = this.stages[3];
        this.changeDisplayOfElementsByClass('similarity_check', 'block');
    }
    loadInitialView() {
        this.changeDisplayOfElementsByClass(this.currentStage, 'none');
        this.currentStage = this.stages[0];
        this.changeDisplayOfElementsByClass(this.currentStage, 'block');
    }
    loadTagView() {
        this.changeDisplayOfElementsByClass(this.currentStage, 'none');
        this.currentStage = this.stages[1];
        this.changeDisplayOfElementsByClass('ask_tags', 'block');
        document.getElementById('prevBtn').style.display = 'block';
        document.getElementById('image').style.display = 'block';
    }
    loadTitleView() {
        this.changeDisplayOfElementsByClass(this.currentStage, 'none');
        this.currentStage = this.stages[2];
        document.getElementById('image').style.display = 'none';
        this.changeDisplayOfElementsByClass('titleDiv', 'block');
    }
    loadDescriptionView() {
        this.changeDisplayOfElementsByClass(this.currentStage, 'none');
        this.currentStage = 'guidDiv';
        //document.getElementById('guidDiv').style.removeProperty('display');
        this.changeDisplayOfElementsByClass(this.currentStage, 'flex');
    }
    loadReview() {
        this.changeDisplayOfElementsByClass(this.currentStage, 'none');
        this.currentStage = 'review';
        this.changeDisplayOfElementsByClass(this.currentStage, 'block');
    }
    postQuestion() {
    }
    changeDisplayOfElementsByClass(className, displayVal) {
        let elements = document.getElementsByClassName(className);
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = displayVal;
        }
    }
}
new Ask().init();
//# sourceMappingURL=ask.js.map