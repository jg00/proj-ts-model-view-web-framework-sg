// 4 Test view regions
import { UserEdit } from "./views/UserEdit";
import { User } from "./models/User";

// Add User
// const user = User.buildUser({ name: "NAME", age: 20 });

// Or update existing user
const user = User.buildUser({ id: 3, name: "Red", age: 59 });

const root = document.getElementById("root");

if (root) {
  const userEdit = new UserEdit(root, user);

  userEdit.render();

  console.log(userEdit); // userEdit should now have a regions property that is an object that have references to DOM elements inside of it.
} else {
  throw new Error("Root element not found");
}

/*
  // 1 Previous test for completed User model
  import { User } from "./models/User";

  const user = User.buildUser({ id: 1 });

  user.on("change", () => {
    console.log(user);
  });

  user.fetch();

  console.log(user);

  
  // 2 Test User Collection
  import { User } from "./models/User";

  const collection = User.buildUserCollection();

  collection.on("change", () => {
    console.log(collection);
  });

  collection.fetch();


// 3 Test UserForm
  import { User } from "./models/User";
  import { UserForm } from "./views/UserForm";

  const user = User.buildUser({ name: "NAME", age: 20 });

  const root = document.getElementById("root");

  if (root) {
    const userForm = new UserForm(root, user);

    userForm.render();
  } else {
    throw new Error("Root element not founct");
  }


// 4 Test view regions
  import { UserEdit } from "./views/UserEdit";
  import { User } from "./models/User";

  // Add User
  // const user = User.buildUser({ name: "NAME", age: 20 });

  // Or update existing user
  const user = User.buildUser({ id: 3, name: "Red", age: 59 });

  const root = document.getElementById("root");

  if (root) {
    const userEdit = new UserEdit(root, user);

    userEdit.render();

    console.log(userEdit); // userEdit should now have a regions property that is an object that have references to DOM elements inside of it.
  } else {
    throw new Error("Root element not found");
  }


// 5 Test CollectionViews
  import { UserList } from "./views/UserList";
  import { Collection } from "./models/Collection";
  import { User, UserProps } from "./models/User";

  // Build a collection of instances of User Model
  const users = new Collection(
    "http://localhost:3000/users",
    (json: UserProps) => {
      return User.buildUser(json);
    }
  );

  // Render list after fetch
  users.on("change", () => {
    const root = document.getElementById("root");

    if (root) {
      new UserList(root, users).render();
    }
  });

  // Fetch Data
  users.fetch();

*/
