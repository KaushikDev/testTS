interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = (validateInput: Validatable) => {
  let isValid = true;

  if (validateInput.required) {
    isValid = isValid && validateInput.value.toString().trim().length !== 0;
  }

  if (
    validateInput.minLength != null &&
    typeof validateInput.value === "string"
  ) {
    isValid =
      isValid &&
      validateInput.value.toString().trim().length >= validateInput.minLength;
  }

  if (
    validateInput.maxLength != null &&
    typeof validateInput.value === "string"
  ) {
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
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: "active" | "finished") {
    this.templateElement = document.querySelector("#project-list")!;
    this.hostElement = document.querySelector("#app")!;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()}-PROJECTS`;
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.querySelector("#project-input")!;
    this.hostElement = document.querySelector("#app")!;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  private gatherUserInput(): [string, string, number] | void {
    const newTitle = this.titleInputElement.value;
    const newDescription = this.descriptionInputElement.value;
    const newPeople = this.peopleInputElement.value;

    if (
      !validate({
        value: newTitle,
        required: true,
        minLength: 5,
        maxLength: 10,
      }) ||
      !validate({ value: newDescription, required: true, minLength: 10 }) ||
      !validate({ value: newPeople, required: true, min: 0, max: 8 })
    ) {
      alert("Must add valid inputs. This is a fail!!");
      return;
    } else {
      return [newTitle, newDescription, +newPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitEventHandler(event: Event) {
    event.preventDefault();
    let userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [tit, desc, peop] = userInput;
      console.log("user entered : ", tit, " & ", desc, " & ", peop);

      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitEventHandler);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
