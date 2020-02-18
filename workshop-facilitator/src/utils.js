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

/*
Thinking of
-.PDF (website and file): https://www.orimi.com/pdf-test.pdf, or pdf-test.pdf
- google Slides: docs.google.com/presentation/ , seems like you can't download them
- powerpoint: end in .ppt extension , online hard to distinguish depending on where you store it, (drive, dropbox...)
- google Docs: docs.google.com/document/ , can only downlaod as pdf or docx
- microsoft Docs: .docx exetension
- plain text: .txt (not sure if anyone actaully uses this in a workshop)

*/
export function extractFileOrURLType(file){
    //assume ppl won't name file "https://" or "http://", if that's even allowed
    if(file.indexOf("https://") > 0 || file.indexOf("http://") > 0){
        if(file.indexOf(".pdf") > 0){
            return "pdf";
        }else if(file.indexOf("presentation" > 0)){
            return "slides";
        }else if(file.indexOf("document") > 0){
            return "docs";
        }else{
            return "unknown";
        }
    }else{
        if(file.indexOf(".ppt") > 0){
            return "powerPoint";
        }else if(file.indexOf(".docx") > 0){
            return "wordDoc";
        }else if(file.indexOf(".pdf") > 0){
            return "pdf";
        }else if(file.indexOf(".txt") > 0){
            return "text";
        }else{
            return "unknown";
        }
    }

}

export default {generateRandomCode, extractFileOrURLType};
