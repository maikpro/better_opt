class OPTStorageManager {
    constructor(){}

    static save(key, value){
        let obj = {};
        obj[key] = value;
        chrome.storage.sync.set(obj, function() {
            console.log("[SYNC SET] Value with key '" + key  + "' is set to " + value);
        });
    }

    static localSave(key, value){
        let obj = {};
        obj[key] = value;
        chrome.storage.local.set(obj, function() {
            console.log("[LOCAL SET] Value with key '" + key  + "' is set to " + value);
        });
    }

    static async get(key){
        let promise = new Promise((resolve, reject) => {
            chrome.storage.sync.get([key], function(result) {
                //console.log("[SYNC GET] Value is: " + result[key]);
                resolve(result[key]);
            });
        });

        let result = await promise;


        return result;
    }

    static async getLocal(key){
        let promise = new Promise((resolve, reject) => {
            chrome.storage.local.get([key], function(result) {
                //console.log("[LOCAL GET] Value is: " + result[key]);
                resolve(result[key]);
            });
        });

        let result = await promise;


        return result;
    }

    
    /**
     * use my nodejs webcrawler and get all episode infos from REST Api
     */
    static async setFolgenFromServer(){
        return fetch("https://optapi-wekkl.ondigitalocean.app/api/episodes").then((response) => {
            return response.json();
        })
        .catch(function (err) {
            console.log("Unable to fetch -", err);
        });
    }
}