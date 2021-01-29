document.addEventListener('DOMContentLoaded', fn, false);

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
    if (window.innerWidth > 400) {
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

function hideWelcome() {
    let container;
    if (window.innerWidth > 400) {
        container = document.getElementsByClassName("container")[0];
    } else {
        container = window;
    }
    container.onscroll = function() {
        let currentPos = window.innerWidth > 400 ? container.scrollTop : window.scrollY;
        if (currentPos > 10) {
            document.getElementById("welcome-container").classList.add("hide")
        }

    }
}