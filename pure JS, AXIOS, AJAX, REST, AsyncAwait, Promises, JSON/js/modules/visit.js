import request from "./request.js";
import {modal} from "./modal.js";

class Visit {
    constructor() {
        this.root = document.querySelector("#root");
    }

    renderInputs(form) {
        this.btn = document.createElement("button");
        this.btn.classList.add("w-100", "mb-2", "btn", "btn-lg", "rounded-3", "btn-primary");
        this.btn.id = "btn-submit-visit";
        this.btn.type = "submit";
        this.btn.textContent = "Додати візит";

        const formContainer = document.querySelector("#form-visit").content.cloneNode(true);
        form.append(formContainer)

    }

    renderContainer() {
        const cardsContainer = document.querySelector("#visit-cards").content.cloneNode(true);
        this.root.append(cardsContainer);
        this.visitContent = document.querySelector("#visit-content")
    }

    renderAllVisits() {
        this.renderContainer();
        request.send({
            url: "https://ajax.test-danit.com/api/v2/cards",
        }).then(({data}) => {
            if (data.length === 0) {
                this.zeroVisits = document.createElement("p");
                this.zeroVisits.innerText = 'Візити відсутні. \n Щоб додати візит натисніть "Створити візит"';
                this.visitContent.append(this.zeroVisits);
            } else {
                data.forEach((data) => {
                    this.renderVisit(data)
                });
            }
        })
            .catch((err) => {
                console.log(err)
            });
    }

    renderVisit({"Лікар": doctor, "Пацієнт": patient, ...restInfo}) {
        if ([...this.visitContent.children].includes(this.zeroVisits)) {
            this.zeroVisits.classList.add("hidden");
        }
        const colTag = document.createElement("div");
        colTag.dataset.urgency = restInfo["Терміновість"];
        colTag.dataset.reason = restInfo["Ціль візиту"];
        colTag.dataset.desc = restInfo["Стислий опис проблеми"];

        colTag.classList.add("col", "card-container");
        const cardTag = document.createElement("div");
        cardTag.className = "card";
        const cardBodyTag = document.createElement("div");
        cardBodyTag.className = "card-body";

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-group", "mb-3");

        const del = document.createElement("button");
        del.type = "button";
        del.classList.add("btn", "btn-sm", "btn-outline-danger");
        del.textContent = "Видалити";
        btnContainer.prepend(del);

        const edit = document.createElement("button");
        edit.type = "button";
        edit.classList.add("btn", "btn-sm", "btn-outline-secondary");
        edit.textContent = "Змінити";
        btnContainer.prepend(edit);

        const patientName = document.createElement("h3");
        patientName.classList.add("card-text");
        patientName.textContent = `Пацієнт: ${patient}`;
        cardBodyTag.append(patientName);

        const doctorTag = document.createElement("p");
        doctorTag.classList.add("card-text");
        doctorTag.textContent = `Лікар: ${doctor}`;
        cardBodyTag.append(doctorTag);

        const showMore = document.createElement("button");
        showMore.type = "button";
        showMore.classList.add("btn", "btn-outline-primary", "mb-3");
        showMore.textContent = "Показати більше";
        cardBodyTag.append(showMore);

        cardBodyTag.prepend(btnContainer);
        cardTag.append(cardBodyTag);
        colTag.append(cardTag);
        this.visitContent.append(colTag);

        const moreInfo = document.createElement("div");
        moreInfo.classList.add("bg-light", "hidden");
        for (let key in restInfo) {
            const info = document.createElement("p");
            info.classList.add("card-text");
            info.textContent = `${key}: ${restInfo[key]}`;
            moreInfo.append(info);
        }
        cardBodyTag.append(moreInfo);
        let flag = true;
        showMore.addEventListener("click", () => {
            if (flag) {
                this.openMore(moreInfo)
            } else {
                this.hideMore(moreInfo);
            }
            flag = !flag;
        });
        edit.addEventListener("click", () => {
            modal.renderForm({doctor, "Пацієнт": patient, ...restInfo}, "edit", colTag);
        })
        del.addEventListener("click", () => {
            this.delVisit(restInfo.id, colTag);
        })
    }

    postVisit(data) {
        request.send({
            method: "POST",
            url: "https://ajax.test-danit.com/api/v2/cards",
            data: data,
        })
            .then(({data}) => {
                this.renderVisit(data);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    updateVisit(data, card) {
        const {id, ...restData} = data
        request.send({
            method: "PUT",
            url: `https://ajax.test-danit.com/api/v2/cards/${id}`,
            data: restData,
        })
            .then(({data}) => {
                console.log(data)
                card.dataset.urgency = data["Терміновість"];
                card.dataset.reason = data["Ціль візиту"];
                card.dataset.desc = data["Стислий опис проблеми"];
                card.querySelectorAll(".card-text").forEach((e) => {
                    const text = e.textContent.split(":");
                    for (const key in data) {
                        if (text[0].trim() === key) {
                            text[1] = " " + data[key];
                            e.textContent = text.join(":");
                            return;
                        }
                    }
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    openMore(info) {
        info.classList.remove("hidden");
    }

    hideMore(info) {
        info.classList.add("hidden");
    }

    delVisit(postId, card) {
        request.del(postId)
            .then(() => {
                card.remove();
                if (this.visitContent.children.length - 1 <= 0) {
                    this.zeroVisits.classList.remove("hidden");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const visit = new Visit();


class VisitCardiologist extends Visit {
    renderInputs(form) {
        super.renderInputs(form);
        const modal = document.querySelector("#form-cardio").content.cloneNode(true);
        form.append(modal);
        form.append(this.btn);
    }
}

export const visitCardiologist = new VisitCardiologist();

class VisitDentist extends Visit {
    renderInputs(form) {
        super.renderInputs(form);
        const modal = document.querySelector("#form-dentist").content.cloneNode(true);
        form.append(modal);
        form.append(this.btn);
    }
}

export const visitDentist = new VisitDentist();

class VisitTherapist extends Visit {
    renderInputs(form) {
        super.renderInputs(form);
        const modal = document.querySelector("#form-therapist").content.cloneNode(true);
        form.append(modal);
        form.append(this.btn);
    }
}

export const visitTherapist = new VisitTherapist();

