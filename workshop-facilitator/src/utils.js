/*
Returns a random four digit number to be used as the
code to join a workshop room
Range: [1000, 10000)
*/
export default function generateRandomCode(){
    return Math.floor(1000 + Math.random() * 9000);
}