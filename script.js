document.addEventListener('DOMContentLoaded', fn, false);

function fn() {
    displayAccordeon();
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
    div.style.height = "100vh";
    div.style.backgroundImage = "url(img/" + url + ")";
    div.style.backgroundSize = "cover";
    div.style.backgroundPosition = position;
    div.style.width = i * i / size + "px";
    slide.appendChild(div)
}