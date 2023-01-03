import request from "./request.js";
import {visit} from "./visit.js";
import filter from "./filtration.js";
class Authorization {
    signin(btn) {
        const form = document.querySelector("#form-sigIn");

        const popUp = document.createElement("div");
        popUp.classList.add("alert", "alert-danger", "text-center");
        popUp.role = "alert";
        popUp.textContent = "Wrong email or password";

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = {};
            const formElements = [...e.target].filter(
                ({type}) => type !== "submit"
            );
            formElements.forEach(({id, value}) => {
                data[id] = value;
            });
            const {email, password} = data;

            await request.authorization(email, password)
                .then(({data}) => {
                    const formSignIn = document.getElementById("signIn");
                    formSignIn.classList.remove("show");
                    formSignIn.setAttribute("aria-hidden", "true");
                    formSignIn.removeAttribute("aria-modal");
                    formSignIn.removeAttribute("role");
                    formSignIn.setAttribute("style", "display: none");

                    const backdrop = document.body.querySelector(".modal-backdrop");
                    backdrop.remove();
                    localStorage.setItem("token", data);
                    btn.textContent = "Створити візит";
                    btn.classList.remove("btn-login");
                    btn.setAttribute("data-bs-target", "#modal-visit");
                    filter.render();
                    visit.renderAllVisits();
                })
                .catch(() => {
                    if (![...e.target.childNodes].includes(popUp)) {
                        e.target.append(popUp);
                    }
                });
        });
    };
}

const signin = new Authorization();
export default signin;
