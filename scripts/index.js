// handling modal 
let formContainer = document.querySelector(".form-container")
let contactBtn = document.querySelector("#contact-btn")
let crossBtn = document.querySelector("#cross-modal")
contactBtn.addEventListener("click", function (e) {
    formContainer.style.display = "grid"
})
crossBtn.addEventListener("click", function(e) {
    formContainer.style.display = "none"
})

// carousal

let track = [true, false, false]
let scrollDotWrapperList = document.querySelectorAll(".scroll-dot-wrapper")
let scrollDotList = document.querySelectorAll(".scroll-dot")

function getTrueIndex () {
    let ans = -1
    track.forEach((e, index) => {
        if (e === true) {
            console.log("index - bahar aa - ", index)
            ans = index;
        }
    })
    return ans
}
function removeClass(ele) {
    if (ele.classList.contains("one-left-shift")) {
        ele.classList.remove("one-left-shift")
    }
    if (ele.classList.contains("two-left-shift")) {
        ele.classList.remove("two-left-shift")
    }
    if (ele.classList.contains("one-right-shift")) {
        ele.classList.remove("one-right-shift")
    }
    if (ele.classList.contains("two-right-shift")) {
        ele.classList.remove("two-right-shift")
    }
}
let last_val = 0
function updatePostion (pos) {
    // pos defines relative position from current element
    // -1 means one image and images will go to right and 1 means image will go toward left and only one will go
    let win_width = window.innerWidth
    let margin = win_width*0.01; // 1vw margin
    let image = document.querySelector(".about-us-two > div > div > img")
    let image_width = image.offsetWidth
    let image_div = document.querySelector(".about-us-two > div")
    console.log(image_width*100/win_width)
    if (pos < 0) {
        pos = -1*pos
        let shift = last_val + (pos*(image_width + margin) + margin)
        console.log(shift)
        image_div.style.transform = `translateX(${shift}px)`
        last_val = shift       
    }else {
        let shift = last_val - (pos*(image_width + margin) + margin)
        console.log(shift)
        image_div.style.transform = `translateX(${shift}px)`
        last_val = shift
    }
}
scrollDotList.forEach((ele) => {
    ele.addEventListener("click", function(e) {
        let curr_true = getTrueIndex()
        console.log("curr_truwval - ", curr_true)

        let next_true = Number(ele.ariaLabel)
        if (curr_true != next_true) {
            track[curr_true] = false
            track[next_true] = true
            updatePostion(next_true-curr_true)
            console.log(track)
            scrollDotList[curr_true].classList.remove("scroll-active")
            scrollDotWrapperList[curr_true].classList.remove("scroll-border")
            scrollDotList[next_true].classList.add("scroll-active")
            scrollDotWrapperList[next_true].classList.add("scroll-border")
        }        
    })
})

// div content change on image hover
let flip_div = document.querySelectorAll("#about-us-image-wrapper > div")
flip_div.forEach((flip_item) => {
    flip_item.addEventListener("mouseenter", function (e) {
        flip_item.children[0].style.display = "none"
        flip_item.children[1].style.display = "flex"

    })
    flip_item.addEventListener("mouseleave", function (e) {
        flip_item.children[1].style.display = "none"
        flip_item.children[0].style.display = "flex"

    })
})

// our project image change section
let our_pro_article = document.querySelectorAll(".more-detail-two > article > img")
let our_pro_child_div = document.querySelectorAll(".more-detail-two > article > div > span")
let image_arr = [true, false, false]
let image_state_index = 0
function updateImage (i) {
    our_pro_article.forEach(img => {
        img.style.display = "none"
    })
    our_pro_article[i].style.display = "block"
    our_pro_child_div.forEach((div) => {
        if(div.classList.contains("pink-span")){
            div.classList.remove("pink-span")
        }

    })
    our_pro_child_div[i].classList.add("pink-span")
}
console.log(our_pro_article)
our_pro_child_div.forEach((ele) => {
    ele.addEventListener("click", function (e) {
        image_state_index = Number(ele.ariaLabel)
        updateImage(image_state_index)
    })
})