const image = document.getElementById("image") as HTMLImageElement;
const imageTitle = document.getElementById("img-title") as HTMLDivElement;
const imageDate = document.getElementById("img-date") as HTMLDivElement;

interface Comic{
    month: string;
    num: number;
    link?: string;
    year: string;
    news?: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
}

async function getId(url: string): Promise<string | undefined>{
    let response = await fetch(url);
    
    if (response.ok){
        let id :string = await response.text();
        return id;
    }else {
        alert("Error HTTP: " + response.status);
        return;
    }
}

async function getImage(): Promise<Comic | undefined>{
    let id :string | undefined = await getId("https://fwd.innopolis.app/api/hw2?email=k.khaysadykov@innopolis.university");
    let url :string = "https://getxkcd.vercel.app/api/comic?num=";
    if (typeof id === "undefined"){
        return;
    }

    url += id;
    let response = await fetch(url);

    if (response.ok){
        let data :Comic = await response.json();
        return data;
    }else {
        alert("Error HTTP: " + response.status);
        return;
    }
}

async function displayImage(): Promise<void>{
    let data :Comic | undefined = await getImage();

    if(data){
        image.src = data.img;
        image.alt = data.alt;
        imageTitle.innerText = "Title: " + data.title;
        let day = data.day;
        let month = data.month;
        let year = data.year;
        var date = new Date(Date.UTC(+year, +month - 1, +day));
        imageDate.innerText = "Date: " + date.toLocaleDateString('en-US');
        console.log(data)
    }
}

displayImage();