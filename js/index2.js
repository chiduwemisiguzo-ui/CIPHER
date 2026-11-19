const totop = document.getElementById("totop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        totop.classList.add("active")
    } else {
        totop.classList.remove("active")
    }
})

totop.addEventListener("click", () => {
    window.scrollTo(0, 0)
})
