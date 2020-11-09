export default class FetchData{

    startUrl = 'http://localhost:3000';

    getResource = async url => {
        const res = await fetch(url, {
            mode: 'cors',
        });
        if (!res.ok){
            throw new Error (`Произошла ошибка ${res.status}`);
        }
        return await res.json();
    };
    getUsersInfo = async () => await this.getResource(this.startUrl+'/users');
    getUsersPosts = async () => await this.getResource(this.startUrl + '/posts');
}