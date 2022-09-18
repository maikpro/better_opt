// script is used on onepiece-tube.com
$(document).ready(function() {
    //saveAndGetTest();

    main();
    
});


async function saveAndGetTest(){
    const optStorageManager = new OPTStorageManager();
    optStorageManager.save("maik", "proba");
    const maik = await optStorageManager.get("maik");
    console.log(maik);
} 

async function main(){
    const optObserver = new OPTObserver("folge");
    optObserver.setCurrentFolge();

    optObserver.setFolgenlist();
}