document.addEventListener('DOMContentLoaded', fn, false);

function fn() {
    displayAccordeon();
    setArrowNavigation();
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

function setArrowNavigation() {
    let container;
    if (window.innerWidth > 400) {
        container = document.getElementsByClassName("container")[0];
    } else {
        container = window;
    }
    const step = 20;

    // keyboard arrows
    window.addEventListener('keydown', function(event) {
        const key = event.key;
        let currentPos = window.innerWidth > 400 ? container.scrollTop : window.scrollY;
        
        if (key == "ArrowRight") {
            container.scroll(0, currentPos + step);
        }
        if (key == "ArrowLeft") {
            container.scroll(0, currentPos - step);
        }
    });

    // clickable arrows
    let idRight;
    let idLeft;
    document.getElementById("chevron-right").onmousedown = function() {
        idRight = setInterval(function() {
            let currentPos = window.innerWidth > 400 ? container.scrollTop : window.scrollY;
            container.scroll(0, currentPos + step);
        }, 50)
    }
    document.getElementById("chevron-right").onmouseup = function() {
        clearInterval(idRight)
    }

    document.getElementById("chevron-left").onmousedown = function() {
        idLeft = setInterval(function() {
            let currentPos = window.innerWidth > 400 ? container.scrollTop : window.scrollY;
            container.scroll(0, currentPos - step);
        }, 50)
    }
    document.getElementById("chevron-left").onmouseup = function() {
        clearInterval(idLeft)
    }


}