import { View } from "./View";
import { User, UserProps } from "../models/User";

// Classes we want to nest
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";

export class UserEdit extends View<User, UserProps> {
  // Regions (keys) : selector for regions (values) will be used to find some element inside of the template produced by a given view.
  regionsMap(): { [key: string]: string } {
    return {
      userShow: ".user-show",
      userForm: ".user-form",
    };
  }

  /*
    Render nested views
    Override onRender() and this will be called automatically from View class inside of render() method.
    Now we have access to this.regions property.  ex: { userShow: div.user-form, userForm: div.user-show }
    new UserShow(parent-element-to-nest-into, model)
  */
  onRender(): void {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  template(): string {
    return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
  }
}

/*
  UserShow and UserForm will be rendered inside of UserEdit
*/
