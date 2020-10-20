import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  // Create events map to help bind "event:element": event_handler
  // Purpose is to provide a collection of different events we want to watch for inside of the template produced by a given view.
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveClick,
    };
  }

  // Event Handlers
  onSaveClick = (): void => {
    this.model.save();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");

    // If not null
    if (input) {
      const name = input.value;

      this.model.set({ name });
    }
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  // Append to DocumentFragment
  template(): string {
    return `
    <div>
      <input placeholder="${this.model.get("name")}"/>
      <button class="set-name">Change Name</button>
      <button class="set-age">Set Random Age</button>
      <button class="save-model">Save User</button>
    </div>
    `;
  }
}

/* 
// 2 UserShow and UserForm will be rendered inside of UserEdit

// 1 Test events
  // Create events map to help bind "event:element": event_handler
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      // "click:button": this.onButtonClick,
      // "mouseenter:h1": this.onHeaderHover,
    };
  }

    // Event handlers
    onButtonClick(): void {
      console.log("Hi there");
    }

    onHeaderHover(): void {
      console.log("h1 hover");
    }
  */
