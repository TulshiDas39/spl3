
class Answer{

    public init(){
        this.setInputListenerInAnswerEditor();
    }

    private setInputListenerInAnswerEditor(){
        document.getElementById('answer_editor').oninput = ()=>{
            let text = (<HTMLInputElement>document.getElementById('answer_editor')).value;
            this.showFormatedAnswer(text);
        }
    }

    private addBoldListener(){
        
    }

    private addItalicListener(){
        
    }

    private addUnderLineListener(){
        
    }

    private addLinkListener(){
        
    }

    private addNewLineListener(){
        
    }

    private addOrderListListener(){
        
    }
    private addUnorderListListener(){
        
    }

    private addImageListener(){
        
    }

    private addHeadingener(){
        
    }

    private showFormatedAnswer(text:string){
        let elem = document.getElementById('answer_display');
        elem.innerHTML = this.getHtml(text);
    }

    private getHtml(text:string):string{

    }
}

new Answer().init();