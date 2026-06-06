const grid = document.getElementById("menuGrid");
const filters = document.getElementById("filters");

const categories = [
...new Set(menuItems.map(item=>item.category))
];

categories.forEach(category=>{

const btn=document.createElement("button");

btn.innerText=category;

btn.dataset.filter=category;

filters.appendChild(btn);

});

renderMenu(menuItems);

filters.addEventListener("click",e=>{

if(e.target.tagName!=="BUTTON") return;

document.querySelectorAll(".filters button")
.forEach(btn=>btn.classList.remove("active"));

e.target.classList.add("active");

const filter=e.target.dataset.filter;

if(filter==="all"){
renderMenu(menuItems);
}else{
renderMenu(
menuItems.filter(item=>item.category===filter)
);
}

});

document
.getElementById("searchInput")
.addEventListener("input",e=>{

const term=e.target.value.toLowerCase();

renderMenu(
menuItems.filter(item=>
item.name.toLowerCase().includes(term)
)
);

});

function renderMenu(items){

grid.innerHTML="";

items.forEach(item=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${item.image}" class="preview">

<div class="card-content">

<h3>${item.name}</h3>

<div class="price">₹${item.price}</div>

<button class="detailsBtn">
View Details
</button>

</div>

`;

card.querySelector(".preview")
.addEventListener("click",()=>{

document.getElementById("imageModal").style.display="flex";

document.getElementById("previewImage").src=item.image;

});

card.querySelector(".detailsBtn")
.addEventListener("click",()=>{

document.getElementById("detailsModal").style.display="flex";

document.getElementById("detailImage").src=item.image;

document.getElementById("detailTitle").innerText=item.name;

document.getElementById("detailPrice").innerText=
"₹"+item.price;

document.getElementById("detailMaking").innerText=
item.making;

document.getElementById("detailTaste").innerText=
item.taste;

document.getElementById("detailIngredients").innerText=
item.ingredients;

});

grid.appendChild(card);

});

}

document.querySelector(".closeImage")
.onclick=()=>{

document.getElementById("imageModal").style.display="none";

};

document.querySelector(".closeDetails")
.onclick=()=>{

document.getElementById("detailsModal").style.display="none";

};

const music=document.getElementById("bgMusic");

const musicBtn=document.getElementById("musicBtn");

function updateMusicButton(){
  musicBtn.innerText = music.paused ? "🎵 Play Music" : "🔇 Stop Music";
}

window.addEventListener("load", () => {
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      updateMusicButton();
    }).catch(() => {
      updateMusicButton();
    });
  } else {
    updateMusicButton();
  }
});

musicBtn.onclick=()=>{
  if(music.paused){
    music.play();
  } else {
    music.pause();
  }
  updateMusicButton();
};