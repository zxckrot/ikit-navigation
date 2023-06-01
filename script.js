"use strict";

document.addEventListener("DOMContentLoaded", (event) => {

    var name = document.querySelector('#checkinput');
    var regex = /[А-яЁёA-Za-z | \W | _]/g;

    name.oninput = function () {

        if (this.value.match(regex)) {
            this.value = this.value.replace(regex, '');
            document.querySelector(".msg-error").textContent = "Пожалуйста, используйте только цифры"
        } else {
            document.querySelector(".msg-error").textContent = "";
        }
    }



    const floorTitle = document.querySelector(".floor-title"),
        floorList = document.querySelector(".floor-list"),
        floorItems = document.querySelectorAll(".floor-item"),
        searchForm = document.querySelector(".search-form");

    function show() {
        floorList.classList.remove("hide");
        floorList.classList.add("show");
    }

    function hide() {
        floorList.classList.remove("show");
        floorList.classList.add("hide");
    }

    function fillBackGround(numFloor) {
        floorItems.forEach(elem => {
            if (parseInt(elem.getAttribute("data-value")) === numFloor) {
                elem.style.backgroundColor = "#1070FF";
            } else {
                elem.style.backgroundColor = "transparent";
            }
        })        
    }

    function changeIconArrow(nav) {
        let icon = document.createElement("i");
        icon.classList.add("floor", "fa-solid", "floor-icon", `fa-caret-${nav}`);
        floorTitle.removeChild(document.querySelector("i"));
        floorTitle.appendChild(icon);
    }

    function getMap(numFloor) {
        if (+numFloor > 5 || +numFloor < 0) {
            document.querySelector(".floor-number").textContent = `${numFloor} этажа не существует`;
            document.querySelector(".floor-map").textContent = "Ошибка, карта не найдена";
            document.querySelector(".floor-btn").textContent = "Выберите этаж";
            floorItems.forEach(item => item.style.backgroundColor = "transparent");
            return;
        }

        document.querySelector(".msg-error").textContent = "";

        document.querySelector(".floor-number").textContent = `${numFloor} этаж`;
        document.querySelector(".floor-btn").textContent = `Этаж ${numFloor}`;

        let img = document.createElement("img");
        img.onload = function () {
            document.querySelector(".floor-map").textContent = "";
            document.querySelector(".floor-map").append(img);
        }
        img.onerror = function () { document.querySelector(".floor-map").textContent = "Ошибка, карта не найдена"; };
        img.src = `./img/${numFloor}floor.png`;

        fillBackGround(numFloor);
    }

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (document.querySelector(".num-cab").value.length < 3) {            
            document.querySelector(".msg-error").textContent = "Цифр должно быть 3";            
        } else {
            getMap(+document.querySelector(".num-cab").value[0]);

            searchForm.reset();
        }

    });

    if (window.matchMedia("(max-width: 750px)").matches) {
        hide();
        floorTitle.style.display = "flex";
        Array.from(floorItems).map(item => {
            item.style.borderRight = "1px solid black";
            item.style.borderBottom = "0";
        });
        floorItems[0].style.borderTopLeftRadius = "8px";
        floorItems[0].style.borderTopRightRadius = "8px";
        floorItems[floorItems.length - 1].style.borderBottomLeftRadius = "8px";
        floorItems[floorItems.length - 1].style.borderBottomRightRadius = "8px";
        floorItems[floorItems.length - 1].style.borderBottom = "1px solid black";

        floorTitle.addEventListener("click", (e) => {
            if (floorList.classList.contains("hide")) {
                show();

                changeIconArrow("up");

                floorTitle.style.borderColor = "#1070FF";
                document.querySelector(".floor-icon").style.color = "#1070FF";
            } else if (floorList.classList.contains("show")) {
                hide();

                changeIconArrow("down");

                floorTitle.style.borderColor = "black";
            }
        })

        floorItems.forEach((item, ind) => {

            item.addEventListener("click", (e) => {
                show();

                getMap(parseInt(item.getAttribute("data-value")));
            })

            item.addEventListener("mouseover", e => {
                if (e.target.style.backgroundColor === "" || e.target.style.backgroundColor === "transparent") {
                    item.style.backgroundColor = "darkgray";
                }
            })

            item.addEventListener("mouseout", e => {
                if (e.target.style.backgroundColor === "darkgray") {
                    item.style.backgroundColor = "darkgray";
                    item.style.backgroundColor = "transparent";
                }
            })


        })

        document.addEventListener("click", e => {
            if (floorList.classList.contains("show") && (e.target.className === "floor-item") || !e.target.classList.contains("floor")) {
                hide();
                floorTitle.style.borderColor = "black";

                changeIconArrow("down");
            }
        })
    } else {
        floorItems.forEach((item, ind) => {
            item.addEventListener("click", (e) => {
                document.querySelector(".floor-btn").textContent = item.textContent;

                getMap(parseInt(item.getAttribute("data-value")));
            })

            item.addEventListener("mouseover", e => {
                if (e.target.style.backgroundColor === "" || e.target.style.backgroundColor === "transparent") {
                    item.style.backgroundColor = "darkgray";
                }
            })

            item.addEventListener("mouseout", e => {
                if (e.target.style.backgroundColor === "darkgray") {
                    item.style.backgroundColor = "darkgray";
                    item.style.backgroundColor = "transparent";
                }
            })


        })
    }




});
