import { CollectionView } from "./CollectionView";
import { User, UserProps } from "../models/User";
import { UserShow } from "./UserShow";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render(); // render template using model and append to itemParent element
  }
}

/*
  Note on new UserShow above:
  - Need a view to take the model and render something in it.  
  - Here we just reuse UserShow view with template already defined.
*/
