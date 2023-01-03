import {visit, visitCardiologist, visitDentist, visitTherapist} from "./visit.js";

class Modal {
    constructor() {
    }

    renderForm(data = "", type = "add", card = "") {
        const {doctor: editDoctor = "default", id} = data;
        console.log(data)
        $("#modal-visit").modal("show")
        const visitBody = document.querySelector("#visit-body");
        const form = document.createElement("form");
        form.classList.add(".form-visit");
        visitBody.append(form);
        const select = document.querySelector("#doctor");
        select.selectedIndex = 0;
        select.disabled = false;
        const close = document.querySelector("#close-visit");
        let addDoctor = "";

        if (type === "edit") {
            this.fillInput(form, data);
            select.value = editDoctor;
            select.disabled = true;
            document.querySelector("#btn-submit-visit").textContent = "Змінити запис";
        } else if (type === "add") {
            select.addEventListener("change", (e) => {
                const selectOption = e.target.value;
                if (selectOption !== "default") {
                    if (form.hasChildNodes()) {
                        form.replaceChildren()
                    }
                    this.selectorSwitch(selectOption, form);
                }
                addDoctor = select.value;
            });
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            select.selectedIndex = 0;
            $("#modal-visit").modal("hide")
            form.remove();
            const doctor = type === "add" ? addDoctor : editDoctor;
            this.submit({data: e.target, doctor: doctor, id: id}, type, card);
        });
        close.addEventListener("click", () => {
            select.selectedIndex = 0;
            form.remove();
            $("#modal-visit").modal("hide")
        });
        $("#modal-visit").on("hide.bs.modal", () => {
            select.selectedIndex = 0;
            form.remove();
        })
    }

    fillInput(form, data) {
        const {doctor, ...restInfo} = data;
        this.selectorSwitch(doctor, form);
        [...form].forEach((e) => {
            if (e.type !== "submit") {
                for (const key in restInfo) {
                    if (e.name === key) {
                        e.value = restInfo[key];
                    }
                }
            }
        })
    }

    selectorSwitch(selectOption, form) {
        switch (selectOption) {
            case "Кардіолог":
                visitCardiologist.renderInputs(form);
                break;
            case "Стоматолог":
                visitDentist.renderInputs(form);
                break;
            case "Терапевт":
                visitTherapist.renderInputs(form);
                break;
        }
    }

    submit(form, type, card = "") {
        const {data: elements, doctor, id} = form;
        const formElements = [...elements].filter(({type}) => type !== "submit");
        const data = {"Лікар": doctor, id};
        formElements.forEach(({name, value}) => {
            data[name] = value.trim();
        });
        elements.reset();
        document.body.style.overflow = "";
        const backdrop = document.body.querySelector(".modal-backdrop");
        backdrop.remove();
        switch (type) {
            case "add":
                visit.postVisit(data);
                break;
            case "edit":
                visit.updateVisit(data, card);
                break;
        }
    }
}

export const modal = new Modal();