export default function totalPhoneBill (callsMadeAndSmss,prices){
    var phoneActivities = callsMadeAndSmss.split(',');
    var allPhoneActivities = 0;
    
    for (let i=0; i<phoneActivities.length; i++){
      var listOfAllActivities = phoneActivities[i].trim();
      if(listOfAllActivities.startsWith('call')){
        allPhoneActivities += prices.call;
      }
       else if (listOfAllActivities.startsWith('sms')){
         allPhoneActivities += prices.sms;
       }
    }
    return "R"+allPhoneActivities.toFixed(2);
  }