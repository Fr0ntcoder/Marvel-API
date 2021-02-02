import {getDataMarvel} from "../../utils/getDataApi";
import {ROOT_MODAL} from "../../constans/root.js";
import img from './img/close.svg';
import classes from "./Characters.css";

class Characters {
    renderContent(data) {
        ROOT_MODAL.classList.remove("show")
        ROOT_MODAL.classList.add("show")
        ROOT_MODAL.innerHTML = ""
        let item = "";
        data.forEach(({name,thumbnail: {path,extension}}) => {
            let img = path + "." + extension;
            item+= `
                <li class="characters-item">
                    <div class="characters-item__wrapper">
                        <span class="characters-item__img" style="background-image: url(${img})">
                        </span>
                        <h3 class="characters-item__title">${name}</h3>
                    </div>
                </li>
            `
        });
        const list = `
                <span class="modal-close"><img src="${img}"></span>
                <div class="container">
                    <ul class="characters-list">
                        ${item}
                    </ul>
                </div>
        `;

        ROOT_MODAL.innerHTML = list;
        if(data.length >= 9) {
            const modalList = ROOT_MODAL.querySelector(".characters-list");
            const listHeight = modalList.children[0].offsetHeight;
            modalList.style.height = listHeight * 2 + 70 + "px";
        }
        ROOT_MODAL.querySelector(".modal-close").addEventListener("click",this.eventListener)
    }
    renderNotification() {
        ROOT_MODAL.classList.remove("show")
        ROOT_MODAL.classList.add("show")
        ROOT_MODAL.innerHTML = ""
        let item = `
            <span class="modal-close"><img src="${img}"></span> 
            <div class="modal-not">
                <span class="modal-not__text">Нет контента</span> 
            </div>
        `;

        ROOT_MODAL.innerHTML = item;
        ROOT_MODAL.querySelector(".modal-close").addEventListener("click",this.eventListener)
    }
    eventListener() {
        this.closest("#modal").classList.remove("show")
        ROOT_MODAL.innerHTML = "";
    }
    async render(url) {
        const data = await getDataMarvel.getData(url);
        data.length ? this.renderContent(data) : this.renderNotification();
        console.log(data)
    }
}

export default new Characters()