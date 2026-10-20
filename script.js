const photos = [
  {title:"Quiet Mountain Morning",category:"nature",place:"Nature · 01",id:"photo-1464822759023-fed622ff2c3b"},
  {title:"Lines of the City",category:"architecture",place:"Architecture · 02",id:"photo-1486406146926-c627a92ad1ab"},
  {title:"A Slower Kind of Day",category:"life",place:"Daily life · 03",id:"photo-1470252649378-9c29740c9fa8"},
  {title:"Into the Green",category:"nature",place:"Nature · 04",id:"photo-1441974231531-c6227db76b6e"},
  {title:"Modern Geometry",category:"architecture",place:"Architecture · 05",id:"photo-1511818966892-d7d671e672a2"},
  {title:"Coffee and Calm",category:"life",place:"Daily life · 06",id:"photo-1445116572660-236099ec97a0"},
  {title:"Open Water",category:"nature",place:"Nature · 07",id:"photo-1500375592092-40eb2168fd21"},
  {title:"Concrete Stories",category:"architecture",place:"Architecture · 08",id:"photo-1511818966892-d7d671e672a2"},
  {title:"Golden Hour Walk",category:"life",place:"Daily life · 09",id:"photo-1470770841072-f978cf4d019e"}
];
const gallery=document.querySelector("#gallery"), lightbox=document.querySelector("#lightbox"), lbImg=document.querySelector("#lightboxImg"), caption=document.querySelector("#caption");
let visiblePhotos=[...photos], current=0;
function render(filter="all"){
  visiblePhotos=photos.filter(p=>filter==="all"||p.category===filter);
  gallery.innerHTML=visiblePhotos.map((p,i)=>`<article class="photo-card" tabindex="0" role="button" aria-label="View ${p.title}" data-index="${i}"><img loading="lazy" src="https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=900&q=85" alt="${p.title}"><div class="photo-info"><strong>${p.title}</strong><small>${p.place}</small></div></article>`).join("");
}
function showImage(index){current=(index+visiblePhotos.length)%visiblePhotos.length;const p=visiblePhotos[current];lbImg.src=`https://images.unsplash.com/${p.id}?auto=format&fit=max&w=1600&q=90`;lbImg.alt=p.title;caption.textContent=`${p.title} — ${p.place}`;lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function close(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");document.body.style.overflow=""}
gallery.addEventListener("click",e=>{const card=e.target.closest(".photo-card");if(card)showImage(Number(card.dataset.index))});
gallery.addEventListener("keydown",e=>{const card=e.target.closest(".photo-card");if(card&&(e.key==="Enter"||e.key===" ")){e.preventDefault();showImage(Number(card.dataset.index))}});
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");btn.classList.add("active");render(btn.dataset.filter)}));
document.querySelector("#closeBtn").addEventListener("click",close);
document.querySelector("#prevBtn").addEventListener("click",()=>showImage(current-1));
document.querySelector("#nextBtn").addEventListener("click",()=>showImage(current+1));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)close()});
document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("open"))return;if(e.key==="Escape")close();if(e.key==="ArrowLeft")showImage(current-1);if(e.key==="ArrowRight")showImage(current+1)});
render();
