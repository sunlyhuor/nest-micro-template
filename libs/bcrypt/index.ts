import * as bcrypt from "bcrypt"

const saltOrRound = 10

export async function hash(password:string){
    return await bcrypt.hash( password, saltOrRound )
}

export async function compare(password:string, hash:string):Promise<boolean>{
    return await bcrypt.compare(password, hash)
}