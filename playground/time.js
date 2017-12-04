// Jan 1st 1970 00:00:00 am = 0 miliseconds
// +ve no. = future
// -ve no. = past
const moment=require('moment');

 let date=moment();
 date.add(1,'year').subtract(10,'days');
 console.log(date.format('MMM Do, YYYY'));

 let date2=moment();
 console.log(date.format('h:mm a'));
let someTimestamp=moment().valueOf();
console.log(someTimestamp);