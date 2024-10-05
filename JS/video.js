//me system
function getTimeString(time){
    const hour = parseInt(time/3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond/60)
    remainingSecond= remainingSecond % 60;
    return `${hour}h ${minute}m ${remainingSecond}s ago`
}



//1: Fetch, Load and Show Categories


//create load categories
const loadCategories = () =>{
    //fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}


const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response) => response.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error))
     
}

// {
//     "category_id": "1001",
//     "category": "Music"
// }
//create Display categories
const displayCategories = (categories) =>{
    const categoryContainer =  document.getElementById('categories');

    categories.forEach((item) => {
        console.log(item);

        //create a button
        const buttonContainer = document.createElement("div")
        buttonContainer.innerHTML=
        `
        <button onclick="loadCategoryVideos(${item.category_id})" class="btn">${item.category}</button>
        `
        //add button to categoryContainer
        categoryContainer.append(buttonContainer);
    })
      
}
loadCategories();





//create load Videos
const loadVideos = () =>{
    //fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
}

// const cardDemo = {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }
//create Display Videos


const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML= "";

    if(videos.length === 0){
        videoContainer.innerHTML = "No content"
        return;
    }
    
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement("div");
        console.log(card);
        card.classList = "card card-compact"
        card.innerHTML=
     `
    <figure class="h-[250px] relative">
      <img
       src=${video.thumbnail}
       class="h-full w-full object-cover"
       alt="Shoes" />
       ${
        video.others.posted_date?.length === 0
        ? ""
         : `<span class="absolute text-white text-xs bg-black rounded-md p-2 right-2 bottom-2 ">${getTimeString(video.others.posted_date)}</span>`
        }
    </figure>
    <div class="px-0 py-3 flex gap-2">
       <div>
        <img class="w-10 h-10 object-cover rounded-full" src=${video.authors[0].profile_picture} />
       </div>
       <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-1">
        <p>${video.authors[0].profile_name}</p>
        ${video.authors[0].verified === true?`<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000">`:""}
        </div>
        <p>${video.others.views}</p>
       </div>
    </div>
        `;
    videoContainer.append(card);
      
    })
}

loadVideos();
// displayCategories();


