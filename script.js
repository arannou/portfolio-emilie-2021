document.addEventListener('DOMContentLoaded', fn, false);
const screenBreakPoint = 400;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function fn() { 
    displayAccordeon();
    setArrowNavigation();
    hideWelcome();
    if (isMobile) {
        document.body.classList.add("mobile")
    }
    showDesktopOrMobileWelcome()
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
    div.style.height = "100vh";
    div.style.minWidth = ((-size)/(i-limit+1))*2-3.1+ "px";
    div.style.backgroundImage = "url(img/" + url + ")";
    div.style.backgroundSize = "cover";
    div.style.backgroundPosition = position;
    slide.appendChild(div)
}

function navigate(direction) {
    let container = document.getElementsByClassName("container")[0];;
    const step = 20;

    if (isMobile) {
        container.scroll(container.scrollLeft + step*direction, 0);
    } else {
        container.scroll(0, container.scrollTop + step*direction);
    }

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
    let eventPrefix = isMobile ? "touch" : "mouse";
    let eventSuffixStart = isMobile ? "start" : "down";
    let eventSuffixEnd = isMobile ? "end" : "up";
    document.getElementById("chevron-right").oncontextmenu = function() { return false;}
    document.getElementById("chevron-left").oncontextmenu = function() { return false;}
    document.getElementById("chevron-right").addEventListener(eventPrefix+eventSuffixStart, function() {
        idRight = setInterval(function() {
            navigate(1);
        }, 50)
    });
    document.getElementById("chevron-right").addEventListener(eventPrefix+eventSuffixEnd, function() {
        clearInterval(idRight)
    });

    document.getElementById("chevron-left").addEventListener(eventPrefix+eventSuffixStart, function() {
        idLeft = setInterval(function() {
            navigate(-1);
        }, 50)
    });
    document.getElementById("chevron-left").addEventListener(eventPrefix+eventSuffixEnd, function() {
        clearInterval(idLeft)
    });
}

function hideWelcome() {
    let container = document.getElementsByClassName("container")[0];

    container.onscroll = function() {
        let currentPos = !isMobile ? container.scrollTop : container.scrollLeft;
        let welcome = document.getElementById("welcome-container");
        if (welcome && currentPos > 120) {
            welcome.classList.add("hide")
            if (!isMobile) {
                container.onscroll = null;
            }
        }
        if (isMobile & currentPos > 200) {
            let chevrons = document.getElementsByClassName("chevron");
            for (let c of chevrons) {
                c.classList.add("hide")
                setTimeout(function(){ c.style.display = "none"; }, 3000);
            }
        }
        
    }
    
}

function showDesktopOrMobileWelcome() {
    if (!isMobile) {
        content = document.getElementsByClassName("welcome-mobile");
    } else {
        content = document.getElementsByClassName("welcome-desktop");
    }
    for (let c of content) {
        c.style.display = "none"
    }
}