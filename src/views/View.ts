import { Model } from "../models/Model";

// T model type, K properties the model will have.
export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {}; // Track view instance template regions. { userShow: div.user-form, userForm: div.user-show }

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  // Default implementation of regionsMap() override in child if needed
  regionsMap(): { [key: string]: string } {
    return {};
  }

  // Default implementation of eventsMap() override in child if needed
  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel() {
    this.model.on("change", () => {
      this.render();
    });
  }

  // Bind events after template is set up inside of the render() method.
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  // A region is a reference where we want to nest a view.  Main purpose is to populate regions {} with { key: element } for example { userShow: div.user-form, userForm: div.user-show }
  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    // Find selectors provided from user instance ex: { userShow: ".user-show", userForm: ".user-form" }
    for (let key in regionsMap) {
      const selector = regionsMap[key]; // ".user-show"
      const element = fragment.querySelector(selector); // Use selector to find element inside of the template. Element ex: <div class="user-show"></div>

      if (element) {
        this.regions[key] = element; // regions > { userShow: element, userForm: element }
      }
    }
  }

  // Default implementation of onRender.  We do not necessarily want every child class to have to implement onRender and therefore not set as abstract.
  // Not every view instance we create is going to require nesting.
  onRender(): void {}

  render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    // At this point template elements have been added to the DOM and elements within it can be accessed.
    // Map events and regions if any utilizing the DocumentFragment
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    // Right before our templateEement gets placed on the DOM. See UserEdits.ts.
    this.onRender();

    // console.dir(templateElement.content); // A type DocumentFragment (purpose is to hold some HTML in memory before it gets attached to the DOM) is essentially an object that can contain some html as well.
    this.parent.append(templateElement.content);
  }
}
