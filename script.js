document.addEventListener('DOMContentLoaded', fn, false);

function fn() {
    displayAccordeon();
    showGif()
    hideGif()
}


function displayAccordeon() {
    let slides = document.getElementsByClassName('jerky');
    for (let slide of slides) {
        let position;
        let repeat = parseInt(slide.getAttribute("data-repeat"));
        if (slide.getAttribute("data-direction") == "increase") {
            position = "left";
            for (let i = 1; i < repeat; i++) {
                appendADiv(slide, i, position)
            }
        } else {
            position = "right";
            for (let i = repeat; i > 1; i--) {
                appendADiv(slide, i, position)
            }
        }
    }
}

function appendADiv(slide, i, position) {
    let size = slide.getAttribute("data-size") == "small" ? 2 : 4;

    const regex = / /gi;
    let url = slide.getAttribute("data-image").replace(regex, "\\ ");
    let div = document.createElement("DIV");
    if (window.innerWidth > 400) {
        div.style.height = "100vh";
        div.style.width = i * i / size + "px";
    } else {
        div.style.height = i * i / (size * 3) + "px";
        div.style.width = "100vw";
    }
    div.style.backgroundImage = "url(img/" + url + ")";
    div.style.backgroundSize = "cover";
    div.style.backgroundPosition = position;
    slide.appendChild(div)
}

function hideGif() {
    let anchor_offset;
    let container;
    if (window.innerWidth > 400) {
        anchor_offset = document.getElementsByClassName('stop-gif')[0].getBoundingClientRect().x;
        container = document.getElementsByClassName("container")[0];
    } else {
        anchor_offset = document.getElementsByClassName('stop-gif')[0].getBoundingClientRect().y;
        container = window;
    }

    container.onscroll = function () {
        if ((window.innerWidth > 400 && this.scrollTop > anchor_offset)
            || (window.innerWidth <= 400 && window.scrollY > anchor_offset)) {
            document.getElementById("scroll-gif").classList.add("hidden");
            container.onscroll = null;
        }
    };
}

function showGif() {
    if (window.innerWidth <= 400) {
        document.getElementById("scroll-gif").classList.add("down");
    }
    setTimeout(function () {
        document.getElementById("scroll-gif").classList.remove("hidden");
    }, 500);

}