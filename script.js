const image = document.getElementById("image");
const imageTitle = document.getElementById("img-title");
const imageDate = document.getElementById("img-date");

async function getId(){
    const url = "https://fwd.innopolis.app/api/hw2?email=k.khaysadykov@innopolis.university"
    let response = await fetch(url);
    
    if (response.ok){
        let id = await response.text();
        return id;
    }else {
        alert("Error HTTP: " + response.status);
        return;
    }
    
}

async function getImage(){
    let id = await getId();
    let url = "https://getxkcd.vercel.app/api/comic?num="
    if (id == undefined){
        return;
    }

    url += id;
    let response = await fetch(url);

    if (response.ok){
        let json = await response.json();
        return json;
    }else {
        alert("Error HTTP: " + response.status);
        return;
    }
}

async function displayImage(){
    let json = await getImage();

    image.src = json.img;
    image.alt = json.alt;
    imageTitle.innerText = "Title: " + json.title;
    let day = json.day;
    let month = json.month;
    let year = json.year;
    var date = new Date(Date.UTC(year, month, day));
    imageDate.innerText = "Date: " + date.toLocaleDateString();
}

displayImage();