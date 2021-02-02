import {API_URL,URL_COMICS,URL_CHARACTERS} from "../../constans/api";
import {getDataMarvel} from "../../utils/getDataApi";
import {ROOT_PAGE} from "../../constans/root.js";
import Characters from "../Characters"
import classes from "./Comics.css";

class Comics {
    async render() {
        const data = await getDataMarvel.getData(API_URL + URL_COMICS)
        let item = "";
        data.forEach(({id,title, thumbnail: {path , extension}}) => {
            let img = "";
            const url = API_URL + URL_COMICS + "/" + id + "/" + URL_CHARACTERS;
            if(path.lastIndexOf("image_not_available") == -1) {
                img = path + "." + extension;
                item += `
                <li class="marvel-item" data-url="${url}">
                    <div class="marvel-item__wrap">
                        <h3 class="marvel-item__title">${title}</h3>
                        <span class="marvel-item__img"><img src="${img}"></span>
                    </div>
                </li>
            `    
            }
        })
        let list = `
            <div class="container">
                <ul class="marvel-list">
                    ${item}
                </ul>
            </div>
        `
        ROOT_PAGE.innerHTML = list;

        /* console.log(data) */

    }

    eventListener() {
        const list = document.querySelector(".marvel-list");
        list.addEventListener("click", async (e) => {
            const url = e.target.closest(".marvel-item").dataset.url;
            Characters.render(url)
        })
    }
}

export default new Comics()