const navbar = document.getElementById("navbar")
const gallery = document.querySelector(".gallery")
const miniGallery = document.querySelector(".miniGallery")

window.addEventListener('scroll',()=>{
    window.scrollY > 10 
    ? navShrink(navbar)
    : navBig(navbar)
    

})
miniGallery.addEventListener("wheel",(e)=>{
    e.preventDefault();
    miniGallery.scrollLeft += e.deltaY;
})
gallery.addEventListener("wheel",(e)=>{
    e.preventDefault();
    gallery.scrollLeft += e.deltaY;
})
function navShrink(nav){
    nav.classList.add("shrink")
    nav.classList.remove("py-4")
    nav.classList.remove("py-lg-0")

}
function navBig(nav){
    nav.classList.remove("shrink")
    nav.classList.add("py-4")
    nav.classList.add("py-lg-0")
}
