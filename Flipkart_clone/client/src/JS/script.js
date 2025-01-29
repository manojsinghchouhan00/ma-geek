let translate = 0;

export function right() {
    let image = document.querySelector(".img_slider");
    if (translate < 300) {
        translate += 100
        image.style.transition = "1s";
        image.style.transform = `translateX(${-translate}%)`;
    }
}
export function left() {
    let image = document.querySelector(".img_slider");
    if (translate > 0) {
        translate -= 100
        image.style.transition = "1s";
        image.style.transform = `translateX(${-translate}%)`;
    }
}

export function leftProduct() {
    let leftProductBtn = document.getElementById("elec-Left-Button");
    let rightProductBtn = document.getElementById("elec-Right-Button");
    let eletronic_prod = document.querySelector(".electronic-cont");


    eletronic_prod.style.transition = '0.5s'
    eletronic_prod.style.transform = "translateX(0%)";
    leftProductBtn.style.display = "none";
    rightProductBtn.style.display = "block";
}

export function rightProduct() {
    let leftProductBtn = document.getElementById("elec-Left-Button");
    let rightProductBtn = document.getElementById("elec-Right-Button");
    let eletronic_prod = document.querySelector(".electronic-cont");

    eletronic_prod.style.transition = '0.5s'
    eletronic_prod.style.transform = "translateX(-42%)";
    rightProductBtn.style.display = "none";
    leftProductBtn.style.display = "block";
}
