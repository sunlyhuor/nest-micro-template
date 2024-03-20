/**
 * Remove white space and add underscore with text
 * @param text 
 * @returns 
 */
export function removeWhiteSpaceAddUnderscore(text:string){
    let texts:Array<string> = text.split(" ")
    let re = "";
    texts.forEach( (t, i) => {
        if( t ){
            if( i == texts.length - 1  ){
                re += t
            }else{
                re += (t + "_" )
            }
        }
    } )

    return re
}

/**
 * Remove whitespace from text
 * @param text 
 * @returns 
 */
export function removeWriteSpace(text:string){
    let texts:Array<string> = text.split(" ")
    let re = "";
    texts.forEach( (t, i) => {
        if( t ){
            re += (t )
        }
    } )

    return re
}