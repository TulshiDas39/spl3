export class Utility{
    private static digitBn = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];

    public static convertToBengaliText(value:number){
        console.log(value);
        if(!value) return Utility.digitBn[0];
        
        let sEn = String(value);
        let sBn="";
        for(let i = 0; i < sEn.length; i++){
            sBn = sBn + Utility.digitBn[parseInt(sEn[i])];
        }
        console.log('done');
        return sBn;
    }
}