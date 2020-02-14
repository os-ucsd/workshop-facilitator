/*
@params None
@desc Calculates a random four digit number to be used as the
code to join a workshop room
Range: [1000, 10000)
@return int roomCode
*/
export function generateRandomCode(){
    return Math.floor(1000 + Math.random() * 9000);
}

/*
@params String file/URL name
@desc Decides what type of file or URL was passed into
the function (PDF, Google Slides, Google Docs, etc.)
@return String type of file
*/
export function extractFileOrURLType(file){

}

export default {generateRandomCode, extractFileOrURLType};