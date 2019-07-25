class Ask{
    private stages = ['about_question','ask_tags','titleDiv','similarity_check', 'guidDiv', 'review'];
    private currentStage = this.stages[0];
    
    public init(){
        this.addNextButtonListener();
        this.addPreviousButtonListener();
    }

    private addPreviousButtonListener(){
        document.getElementById('prevBtn').addEventListener('click',()=>{
            if(this.currentStage == this.stages[1]) this.loadInitialView();
            else if(this.currentStage == this.stages[2]) this.loadTagView();
            else if(this.currentStage == this.stages[3]) this.loadTitleView();
            else if(this.currentStage == this.stages[4]) this.loadSimilarityCheck();
            else if(this.currentStage == this.stages[5]) this.loadDescriptionView();
        })
    }

    

    private addNextButtonListener(){
        document.getElementById('nextBtn').addEventListener('click',()=>{
            if(this.currentStage == this.stages[0]) this.loadTagView();
            else if(this.currentStage == this.stages[1]) this.loadTitleView();
            else if(this.currentStage == this.stages[2]) this.loadSimilarityCheck();
            else if(this.currentStage == this.stages[3]) this.loadDescriptionView();
            else if(this.currentStage == this.stages[4]) this.loadReview();
            else if(this.currentStage == this.stages[5]) this.postQuestion();
        })
    }

    private loadSimilarityCheck(){
        this.changeDisplayOfElementsByClass(this.currentStage,'none');
        this.currentStage = this.stages[3];
        this.changeDisplayOfElementsByClass('similarity_check','block');
    }

    private loadInitialView(){
        this.changeDisplayOfElementsByClass(this.currentStage,'none');
        this.currentStage = this.stages[0];
        this.changeDisplayOfElementsByClass(this.currentStage,'block');
    }

    private loadTagView(){
        this.changeDisplayOfElementsByClass(this.currentStage,'none');
        this.currentStage = this.stages[1];
        this.changeDisplayOfElementsByClass('ask_tags','block');
        document.getElementById('prevBtn').style.display = 'block';
        document.getElementById('image').style.display = 'block';

    }

    private loadTitleView(){
        this.changeDisplayOfElementsByClass(this.currentStage,'none');
        this.currentStage = this.stages[2];
        document.getElementById('image').style.display = 'none';
        this.changeDisplayOfElementsByClass('titleDiv','block');
    }

    private loadDescriptionView(){
        this.changeDisplayOfElementsByClass(this.currentStage,'none');
        this.currentStage = 'guidDiv';
        //document.getElementById('guidDiv').style.removeProperty('display');
        this.changeDisplayOfElementsByClass(this.currentStage,'flex');
        
    }

    private loadReview(){
        this.changeDisplayOfElementsByClass(this.currentStage,'none');
        this.currentStage = 'review';
        this.changeDisplayOfElementsByClass(this.currentStage,'block');
    }

    private postQuestion(){

    }

    private changeDisplayOfElementsByClass(className:string, displayVal:string){
        let elements = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(className);
        for(let i=0;i<elements.length;i++){
            elements[i].style.display = displayVal;
        }
    }
}


new Ask().init();