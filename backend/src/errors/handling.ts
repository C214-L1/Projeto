export function DuplicateKeyError(err: any){
    const key = Object.keys(err.keyValue)
    
    return {
        status: 409,
        message: `An account with that ${key} already exists.`
    }
}