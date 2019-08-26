
interface PopUps {
    clickElement: HTMLElement;
    popUpElement: HTMLElement;
    toogleClass: string;
    acceptedScreen: string[];
}

class Nav {

    private popUps: PopUps[] = [];
    private currentScreen: string = 'xl';

    public init(): void {
        this.initPopUps();
        this.initClickEvent();
    }

    private initPopUps(): void {
        this.popUps.push(
            {
                clickElement: document.getElementById('search-sm'),
                popUpElement: document.getElementById('search'),
                toogleClass: "flex",
                acceptedScreen: ['sm', 'md']
            }
        );
    }

    private initClickEvent(): void {
        this.documentClick();
    }

    private documentClick() {
        document.onclick = (e) => {
            console.log('document click');
            this.tooglePopups(e);
        }
    }

    private tooglePopups(e: MouseEvent) {
        for (let i = 0; i < this.popUps.length; i++) {

            if (this.popUps[i].clickElement.contains(<HTMLElement>e.target)) {
                this.toogle(this.popUps[i].popUpElement, this.popUps[i].toogleClass);
                this.makeInvisible(this.popUps[i].popUpElement);
                return;
            }

            else if (this.popUps[i].popUpElement.contains(<HTMLElement>e.target)) {
                this.makeInvisible(this.popUps[i].popUpElement);
                return;
            }

        }

        this.makeInvisible(null);
    }

    private makeInvisible(except: HTMLElement): void {
        let popedElems = document.getElementsByClassName('oped');
        for (let i = 0; i < popedElems.length; i++) {
            console.log(this.currentScreen);
            if (this.popUps[i].popUpElement == except) continue;
            this.popUps[i].popUpElement.style.display = "none";
            this.popUps[i].popUpElement.classList.remove('poped');
            
        }
    }

    private toogle(elem: HTMLElement, displayClass:string): void {

        if(elem.style.display) elem.style.removeProperty('display');
        else elem.style.display = displayClass;
    }

}

new Nav().init();