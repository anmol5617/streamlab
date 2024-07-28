export const  timeInHour=(num)=>{ 
    var hours = Math.floor(num / 60);  
    var minutes = num % 60;
    if (minutes + ''.length < 2) {
      minutes = '0' + minutes; 
    }
    return hours+'h ' + minutes+'m';
}