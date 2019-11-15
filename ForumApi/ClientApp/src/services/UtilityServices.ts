
export function createHeader(token:string, contentType?:string){
    return new Headers({
        "Authorization": "Bearer " + token,
        'Content-Type': contentType? contentType: 'application/json',
        'Accept': 'application/json'
    });
}