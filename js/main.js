class Api {

    data = null;

    async getData(){
        await fetch(this.url)
            .then(function(response){
                return response.json();
            }).then((data) => {
                this.data = data;
            });

        return this.data;
    }


}


class header{
    headerElement;
    listElement;
    titleElement;
    logolistElement;
    logoElement
    placeToRenderHeader;

    constructor(placeToRenderHeader){
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
        this.headerElement = document.createElement("header");
        this.headerElement.classList = "collection";

        this.listElement = document.createElement("ul");
        this.listElement.classList = "collection__list";

        
        this.logolistElement = document.createElement("li");
        this.logolistElement.classList = "collection__listitem--first";

        this.logoElement = document.createElement("i");
        this.logoElement.classList = "collection__logo";

        this.titleElement = document.createElement("li");
        this.titleElement.classList = "collection__listitem--second";
        this.titleElement.innerText = "Collection of Hapiness";
    }

    render(){
        this.headerElement.appendChild(this.listElement);
        this.listElement.appendChild(this.logolistElement);
        this.listElement.appendChild(this.titleElement);
        this.logolistElement.appendChild(this.logoElement);

        this.placeToRenderHeader.appendChild(this.headerElement);
    }
}



class App{
    header;

    constructor(){
        this.header = new header("body");

        
        this.header.render();
    }
}

const app = new App();
