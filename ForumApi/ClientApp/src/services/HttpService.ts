
export function get(url: string) {
    return new Promise<any>((resolve, reject) => {
        fetch(url).then(data => {
            return data.json();
        }).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })

}

export function post(url: string, header: Headers, body: object) {
    return new Promise<any>((resolve: any, reject: any) => {

        console.log("fetching data:");
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body),
            headers: header
        }).then((res: Response) => {
            return res.json();
        }).then(data => {
            console.log(data);
            resolve(data);

        }).catch(err => {
            console.log('error fetching question data');
            reject(err);
        });
    });
}

export function put(url: string, header: Headers, body: object) {
    return new Promise<any>((resolve: any, reject: any) => {

        console.log("fetching data:");
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(body),
            headers: header
        }).then((res: Response) => {
            //return res.json();
            resolve("");
        }).catch(err => {
            console.log('error updating answer data');
            reject(err);
        });
    });
}

export function deleteEntity(url:string, header:Headers){
    return fetch(url ,{
        method: 'DELETE',
        headers: header
    }).then(response => {});

}

