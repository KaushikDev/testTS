

class ProjectInput{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    


    constructor(){
        this.templateElement = document.querySelector("#project-input")!;
        this.hostElement = document.querySelector("#app")!;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private attach(){
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }

    private submitEventHandler(event: Event){
         event.preventDefault();
        console.log("The form was submitted!!");
    }

    private configure(){
        this.element.addEventListener("submit", this.submitEventHandler);
    }
}


const prjInput = new ProjectInput();