
interface PopUps {
    clickElement: HTMLElement;
    popUpElement: HTMLElement;
    displayType: string;
    acceptedScreen: string[];
}

class Nav {

    private popUps: PopUps[] = [];
    private currentScreen: string = 'xl';

    public init(): void {
        this.detectScreen();
        this.initPopUps();
        this.initClickEvent();
        this.windowResizeEvent();

    }

    private windowResizeEvent():void{
        window.onresize = ()=>{
            this.detectScreen();
        }
    }

    private initPopUps(): void {
        this.popUps.push(
            {
                clickElement: document.getElementById('search-sm'),
                popUpElement: document.getElementById('search'),
                displayType: "flex",
                acceptedScreen: ['sm', 'md']
            }
        );
    }

    private initClickEvent(): void {
        document.onclick = (e) => {
            console.log('document click');
            this.tooglePopups(e);
        }
    }

    private tooglePopups(e: MouseEvent) {
        for (let i = 0; i < this.popUps.length; i++) {

            if (this.popUps[i].acceptedScreen.indexOf(this.currentScreen) == -1) continue;

            if (this.popUps[i].clickElement.contains(<HTMLElement>e.target)) {
                this.toogle(this.popUps[i].popUpElement, this.popUps[i].displayType);
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
        for (let i = 0; i < this.popUps.length; i++) {
            console.log(this.currentScreen);
            if (this.popUps[i].acceptedScreen.indexOf(this.currentScreen) == -1) continue;
            if (this.popUps[i].popUpElement == except) continue;
            if (this.popUps[i].popUpElement.style.display != "none")
                this.popUps[i].popUpElement.style.display = "none";
        }
    }

    private toogle(elem: HTMLElement, displayType: string): void {
        if (elem.style.display == "none" || elem.style.display == "") elem.style.display = displayType;
        else elem.style.display = "none";
    }

    private detectScreen(): void {

        if (window.matchMedia("(max-width:640px)").matches) {
            if(this.currentScreen != 'sm'){
                console.log('sm screen detected');
                this.currentScreen = 'sm';
                this.changeForSM();
            }
            return;
        }

        if (window.matchMedia("(max-width:790px)").matches) {
            if(this.currentScreen != 'md'){
                this.currentScreen = 'md';
                console.log('md screen detected');
                this.changeForMD();
            }
            return;
        }

        if (window.matchMedia("(max-width:980px)").matches) {
            if(this.currentScreen != 'lg'){
                this.currentScreen = 'lg';
                console.log('lg screen detected');
                this.changeForLG();
            }
            
            return;
        }

        if(this.currentScreen != 'xl'){
            this.currentScreen = 'xl';
            console.log('xl screen detected');
            this.changeForXL();
        }
        
    }

    private changeForSM(): void {
        
    }

    private changeForMD(): void {
        
    }

    private changeForLG(): void {
        console.log('---changeForLG---');
        document.getElementById('search').setAttribute('style','');
    }

    private changeForXL():void{

    }

}

new Nav().init();