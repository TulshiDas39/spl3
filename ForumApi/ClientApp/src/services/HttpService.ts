export const httpService = {
    get(url: string, headers?: Headers): Promise<any> {
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }).then(res => {
            if (!res.ok) throw res;
            return res.json();
        });

    },
    post(url: string, body: object, header?: Headers) {
        console.log("fetching data:");
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body),
            headers: header
        }).then((res: Response) => {
            console.log(res);
            if (!res.ok) throw res;
            return res.json();
        });
    },
    put(url: string, body: object, header?: Headers) {

        console.log("fetching data:");
        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(body),
            headers: header
        }).then((res: Response) => {
            //return res.json();
            if (!res.ok) throw res;
        });
    },
    deleteEntity(url: string, header: Headers) {
        return fetch(url, {
            method: 'DELETE',
            headers: header
        }).then(res => {
            if (!res.ok) throw res;
        });

    }
}

