const prompt = require('prompt-sync')();



// const getRating = (i) => ["Poor", "Fair", "Good", "Excellent"][i] || "Invalid";

// while (true) {
//     const number = prompt('Enter Your Degree? ');
//     console.log(`Your Input is  ${number}`);
//     const result = getRating(number);
//     if(result){
//         console.log(result);
//         return false;
//     }
//     else {
//         console.log("the input is not the scope please try again");
//     }
// }


// ---
/**
 * challange: 26-03-13: 
 *          create a function that takes a number (from 1 to 7) 
 *          and returns the corresponding day of the week 
 *          (e.g., 1 for Monday, 2 for Tuesday, etc.). 
 *          If the number is outside the range of 1 to 7, 
 *          return "Invalid input".
 */

const workdayFinder = (day) => ["Work", "Weekend"][+(day >4)];

const number = prompt('Enter Day Number? ');
console.log(`Your Input is  ${workdayFinder(number)}`);
