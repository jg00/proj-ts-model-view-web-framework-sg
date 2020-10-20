// import { UserProps } from "./User";

export class Attributes<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(update: T): void {
    // Object.assign(this.data, update);
    const updated = { ...this.data, ...update };
    this.data = updated;
  }

  getAll(): T {
    return this.data;
  }
}

// 1 Test Only
// const attrs = new Attributes<UserProps>({
//   id: 5,
//   age: 20,
//   name: "asdf",
// });

// const name = attrs.get("name");
// const age = attrs.get("age");
// const id = attrs.get("id");

/* 2 Notes
  <K extends keyof T>
  - Type of K can only be one of the keys of T ex: name | age | id
  - Generic constraint limits the type that K can be
  - Here we are saying that the value of K can only ever be one of the keys of T.

  (key: K)
  - This is where "in TypeScript strings can be types" ex: "name" can be a type.
  - key can only be a string of one of the following ie name | age | id
  - we are limiting the arguments to get() to only ever be either "name", "age", "id"

  T[K] (You can ask what is the type of th value being returned)
  - Looking up the given key K on the interface T for the return type based on the value of T[K]
  - This is like a normal object lookup "BUT WITH A TYPE"
    ex:
    const colors = { red: 'red' }
    colors['red']  <-- this is a lookup 
    
    Instead T[K] is a "lookup for a type".

  - In other words T[K] is a type lookup vs a value lookup.

  Original:
  export class Attributes<T> {
    constructor(private data: T) {}

    get(key: string): string | number | boolean {
      return this.data[key];
    }

    set(update: T): void {
      Object.assign(this.data, update);
    }
  }

*/
