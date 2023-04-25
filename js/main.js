class Api{
    url = "";
    data = null;

    constructor(newURL){
        this.url = newURL;
    }

   async getData(){
        await fetch(this.url)
            .then(function(response){
                return response.json();
            }).then((data) => {
                this.data = data.episodes;
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
        this.titleElement.innerText = "Collection of Happiness";
    }

    render(){
        this.headerElement.appendChild(this.listElement);
        this.listElement.appendChild(this.logolistElement);
        this.listElement.appendChild(this.titleElement);
        this.logolistElement.appendChild(this.logoElement);

        this.placeToRenderHeader.appendChild(this.headerElement);
    }
}

class main{
    placeToRenderMain;
    leftpanel;
    rightpanel;

    constructor(placeToRenderMain,data){

        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];

        this.mainElement = document.createElement("main");
        this.mainElement.classList = "collection__main";

        this.rightpanel = new rightpanel(this.mainElement,data);

        this.leftpanel = new leftpanel(this.mainElement, this.rightpanel);
    }

    makeCardsFromData(data){
        this.leftpanel.makeCardsFromData(data);
    }

    render(){
        this.placeToRenderMain.appendChild(this.mainElement);
        this.leftpanel.render();
        this.rightpanel.render();
    }
}

class leftpanel{
    mainElement;
    rightpanel;

    constructor(mainElement, rightpanel){
        this.mainElement = mainElement;
        this.rightpanel = rightpanel;
        this.leftsectionElement = document.createElement("section");
        this.leftsectionElement.classList = "collection__sectionleft";

        this.articleElement = document.createElement("article");
        this.articleElement.classList = "collection__article";

        this.cardsElement = document.createElement("ul");
        this.cardsElement.classList = "collection__cards";


        
    }

    makeCardsFromData(data){
        this.cardsElement.innerHTML = "";
        console.log(data);
        for(let i = 0; i < 4; i ++){
            const random = Math.floor(Math.random() * data.length);
    
            this.cardElement = document.createElement("li");
            this.cardElement.classList = "collection__card";
    
            this.cardTitle = document.createElement("p");
            this.cardTitle.classList = "collection__p--titel";
            this.cardTitle.innerText = data[random].title;
    
            this.cardData = document.createElement("p");
            this.cardData.classList = "collection__p--datum";
            this.cardData.innerText = data[random].date;
    
            this.cardImg = document.createElement("img");
            this.cardImg.classList = "episode__preview";
            this.cardImg.src = data[random].img;

            this.rightpanel.changeData(data[random]);
    
            this.cardElement.onclick = () => {
                console.log(data);
                this.rightpanel.changeData(data[random]);
            }
    
            this.cardsElement.appendChild(this.cardElement);
            this.cardElement.appendChild(this.cardTitle);
            this.cardElement.appendChild(this.cardData);
            this.cardElement.appendChild(this.cardImg);
        }
    }
    

    render(){
        this.mainElement.appendChild(this.leftsectionElement);
        this.leftsectionElement.appendChild(this.cardsElement);
    }
}

class rightpanel{
    mainElement;
    leftpanel;

    constructor(mainElement, data){
        this.mainElement = mainElement;
        this.data = data;

        this.rightsection = document.createElement("section");
        this.rightsection.classList = "collection__sectionright";

        this.rightArticle = document.createElement("article");
        this.rightArticle.classList = "collection__episode";

        this.rightFigure = document.createElement("figure");
        this.rightFigure.classList = "collection__figure";

        this.rightP = document.createElement("p");
        this.rightP.classList = "collection__p--titel";

        this.rightDate = document.createElement("p");
        this.rightDate.classList = "collection__p--datum";
        
        this.rightImage = document.createElement("img");
        this.rightImage.classList = "episode__preview";

        this.rightsum = document.createElement("p");
        this.rightsum.classList = "collection__paragraph";

        this.wrapper = document.createElement("div");
        this.wrapper.classList = "collection__wrapper";

        this.source = document.createElement("a");
        this.source.classList = "collection__source";
        this.src = data.url;
        this.source.src = this.source;

        this.audio = document.createElement("audio");
        this.audio.controls = true;
        this.src = data.audio;
        this.audio.src = this.src;
    }

    changeData(data){
        console.log(data);
        this.rightP.innerText = data.title;
        this.rightImage.src = data.img;
        this.rightDate.innerText = data.date;
        this.rightsum.innerText = data.summary;
        this.audio.innerText = "audio";
        this.source.innerText = "source";
        this.audio.src = data.audio;
        this.source.href = data.source;

        this.source.onclick = () => {
            console.log(data);
            this.source = window.open(data.url);
        }
    }

    render(){
        this.mainElement.appendChild(this.rightsection);
        this.rightsection.appendChild(this.rightArticle);
        this.rightArticle.appendChild(this.rightFigure);
        this.rightArticle.appendChild(this.rightsum);
        this.rightArticle.appendChild(this.wrapper);
        this.rightFigure.appendChild(this.rightP);
        this.rightFigure.appendChild(this.rightDate);
        this.rightFigure.appendChild(this.rightImage);
        this.wrapper.appendChild(this.audio);
        this.wrapper.appendChild(this.source);
    }
}



class App{
    header;
    main;

    constructor(){
        this.header = new header("body");

        this.Api = new Api("./data/data.json");
        this.Api
            .getData().then( (data) => {
                this.main = new main("body",data);

                this.main.makeCardsFromData(data);
                this.header.render();
                this.main.render();
            });

        

    }
}

const app = new App();
