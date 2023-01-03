class Filter {
    render() {
        const header = document.querySelector("header > .container");
        const filter = document.querySelector("#filter-header").content;
        header.append(filter);
        this.filtration();
    }

    filtration() {
        const inputGroup = document.querySelector(".input-group");
        [...inputGroup].forEach(e => {
            if (e.tagName.toLowerCase() === "input") {
                e.value = "";
            }
            e.selectedIndex = 0;
        })
        inputGroup.addEventListener("input", (e) => {
            this.selectCard(e.currentTarget.selectWord.value, e.currentTarget.selectUrgency.value)
        })
    }

    selectCard(inputValue, selectValue) {
        const cardContainer = document.querySelectorAll(".card-container");
        cardContainer.forEach(item => {
            if ((item.getAttribute("data-reason").toLowerCase().includes(inputValue.toLowerCase())
                    || item.getAttribute("data-desc").toLowerCase().includes(inputValue.toLowerCase()
                        || inputValue === "")) &&
                (selectValue === item.getAttribute("data-urgency") || selectValue === "Все")) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        })
    }
}

const  filter = new Filter();
export default filter;