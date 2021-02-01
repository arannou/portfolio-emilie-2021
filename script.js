document.addEventListener('DOMContentLoaded', fn, false);
const screenBreakPoint = 400;
function fn() { 
    displayAccordeon();
    setArrowNavigation();
    hideWelcome();
}


function displayAccordeon() {
    let slides = document.getElementsByClassName('jerky');
    for (let slide of slides) {
        let position;
        let repeat = parseInt(slide.getAttribute("data-repeat"));
        if (slide.getAttribute("data-direction") == "increase") {
            position = "left";
            for (let i = 1; i < repeat; i++) {
                appendADiv(slide, i, position, repeat)
            }
        } else {
            position = "right";
            for (let i = repeat; i > 1; i--) {
                appendADiv(slide, i, position, repeat)
            }
        }
    }

    let inits = document.getElementsByClassName('jerky-init');
    for (let init of inits) {
        const regex = / /gi;
        let url = init.getAttribute("data-image").replace(regex, "\\ ");
        init.style.minWidth = "100px";
        init.style.backgroundSize = "contain";
        init.style.backgroundImage = "url(img/" + url + ")";
    }
}

function appendADiv(slide, i, position, limit) {
    let size = slide.getAttribute("data-size") == "small" ? 50 : 250;

    const regex = / /gi;
    let url = slide.getAttribute("data-image").replace(regex, "\\ ");
    let div = document.createElement("DIV");
    if (window.innerWidth > screenBreakPoint) {
        div.style.height = "100vh";
        div.style.minWidth = ((-size)/(i-limit+1))*2-3.1+ "px";
    } else {
        div.style.height = ((-size)/(i-limit+1))*2-3.1+ "px";
        div.style.minWidth = "100vw";
    }
    div.style.backgroundImage = "url(img/" + url + ")";
    div.style.backgroundSize = "cover";
    div.style.backgroundPosition = position;
    slide.appendChild(div)
}
function navigate(direction) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let container;
    if (isMobile) {
        container = window;
    } else {
        container = document.getElementsByClassName("container")[0];
    }
    const step = 20;
    let currentPos = isMobile ? window.scrollY : container.scrollTop;
    container.scroll(0, currentPos + step*direction);

}
function setArrowNavigation() {
    // keyboard arrows
    window.addEventListener('keydown', function(event) {
        const key = event.key;

        if (key == "ArrowRight") {
            navigate(1);
        }
        if (key == "ArrowLeft") {
            navigate(-1);
        }
    });

    // clickable arrows
    let idRight;
    let idLeft;
    document.getElementById("chevron-right").onmousedown = function() {
        idRight = setInterval(function() {
            navigate(1);
        }, 50)
    }
    document.getElementById("chevron-right").onmouseup = function() {
        clearInterval(idRight)
    }

    document.getElementById("chevron-left").onmousedown = function() {
        idLeft = setInterval(function() {
            navigate(-1);
        }, 50)
    }
    document.getElementById("chevron-left").onmouseup = function() {
        clearInterval(idLeft)
    }
}

function hideWelcome() {
    if (document.getElementById("welcome-container")) {
        let container;
        if (window.innerWidth > screenBreakPoint) {
            container = document.getElementsByClassName("container")[0];
        } else {
            container = window;
        }
        container.onscroll = function() {
            let currentPos = window.innerWidth > screenBreakPoint ? container.scrollTop : window.scrollY;
            if (currentPos > 120) {
                document.getElementById("welcome-container").classList.add("hide")
                container.onscroll = null;
            }

        }
    }
}