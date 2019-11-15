export class Utility{
    private static digitBn = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];

    public static convertToBengaliText(value:number){
        console.log(value);
        let isNegative = false;
        if(!value) return Utility.digitBn[0];
        if(value<0) {
            value *= -1;
            isNegative=true;
        }
        
        let sEn = String(value);
        let sBn="";
        for(let i = 0; i < sEn.length; i++){
            sBn = sBn + Utility.digitBn[parseInt(sEn[i])];
        }
        console.log('done');
        if(isNegative) sBn = "-"+sBn;
        return sBn;
    }
}