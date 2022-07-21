"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const validate = (validateInput) => {
    let isValid = true;
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }
    if (validateInput.minLength != null &&
        typeof validateInput.value === "string") {
        isValid =
            isValid &&
                validateInput.value.toString().trim().length >= validateInput.minLength;
    }
    if (validateInput.maxLength != null &&
        typeof validateInput.value === "string") {
        isValid =
            isValid &&
                validateInput.value.toString().trim().length <= validateInput.maxLength;
    }
    if (validateInput.min != null && typeof validateInput.value === "number") {
        isValid = isValid && validateInput.value >= validateInput.min;
    }
    if (validateInput.max != null && typeof validateInput.value === "number") {
        isValid = isValid && validateInput.value <= validateInput.max;
    }
    return isValid;
};
// autobind decorator
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.querySelector("#project-list");
        this.hostElement = document.querySelector("#app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent = `${this.type.toUpperCase()}-PROJECTS`;
    }
}
class ProjectInput {
    constructor() {
        this.templateElement = document.querySelector("#project-input");
        this.hostElement = document.querySelector("#app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
    gatherUserInput() {
        const newTitle = this.titleInputElement.value;
        const newDescription = this.descriptionInputElement.value;
        const newPeople = this.peopleInputElement.value;
        if (!validate({
            value: newTitle,
            required: true,
            minLength: 5,
            maxLength: 10,
        }) ||
            !validate({ value: newDescription, required: true, minLength: 10 }) ||
            !validate({ value: newPeople, required: true, min: 0, max: 8 })) {
            alert("Must add valid inputs. This is a fail!!");
            return;
        }
        else {
            return [newTitle, newDescription, +newPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitEventHandler(event) {
        event.preventDefault();
        let userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [tit, desc, peop] = userInput;
            console.log("user entered : ", tit, " & ", desc, " & ", peop);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener("submit", this.submitEventHandler);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitEventHandler", null);
const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
