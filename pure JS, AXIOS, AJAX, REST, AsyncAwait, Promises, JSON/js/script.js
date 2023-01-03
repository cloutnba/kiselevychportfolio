"use script";

import authorization from "./modules/authorization.js";
import {modal} from "./modules/modal.js";
import {visit} from "./modules/visit.js";
import filter from "./modules/filtration.js";


const headerBtn = document.querySelector("#header-btn");
const event = () => {
    headerBtn.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-login")) {
            authorization.signin(e.target);
            return event();
        } else {
            modal.renderForm();
        }
    });
}

if (localStorage.getItem("token")) {
    headerBtn.textContent = "Створити візит";
    headerBtn.setAttribute("data-bs-target", "#modal-visit");
    visit.renderAllVisits();
    filter.render();
    event();
} else {
    headerBtn.textContent = "Війти";
    headerBtn.classList.add("btn-login");
    event();
}