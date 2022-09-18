class OPTObserver {
    constructor(urlPath){
        this.urlPath = urlPath;
        this.currentFolge = -1;
    }

    parseFolge(url){
        const urlSplitted = url.split("/");
        this.currentFolge = urlSplitted[urlSplitted.length-1].split("-")[0];
    }

    setCurrentFolge(){
        console.log(`OPTObserver is watching url '${this.urlPath}'`);
        const currentUrl = window.location.href;
        if(currentUrl.includes(this.urlPath)){
            this.parseFolge(currentUrl);
            OPTStorageManager.save("currentFolge", this.currentFolge);
        }
    }
    /**
     * go to optube episode site and fill episode list
     */
    setFolgenlist(){
        const currentUrl = window.location.href;
        if(currentUrl.includes("episoden-streams")){
            const arr = $(".mediaitem");
            const folgenList = [];
            arr.each(function( index ) {
                const folgeName = $( this ).text().split("\n")[2].trim();
                let isFiller = false;
                let isNew = false;

                // Fillerfolge markieren
                const childNodes = $( this ).children('td').eq(1)[0].childNodes
                if(childNodes.length === 2){
                    const fillerMarker = childNodes[1].currentSrc;
                    if(fillerMarker.includes("filler.gif")){
                        isFiller = true;
                    }

                    if(fillerMarker.includes("new.gif")){
                        isNew = true;
                    }
                }
                const nr = index + 1;
                const folgeObj = {
                    nr,
                    name: folgeName,
                    isFiller,
                    isNew
                }

                //OPTStorageManager.localSave("folge-" + nr, folgeObj);
                folgenList.push(folgeObj);
            });

            OPTStorageManager.localSave("folgenList", folgenList);
        }
    }
}