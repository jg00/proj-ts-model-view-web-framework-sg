import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

// <T,K> - User, UserProps
export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));

        // const user = User.buildUser(value);
        // this.models.push(user); // models array expects type User
      });

      this.trigger("change");
    });
  }
}

/* 1 Note: On shortened syntax for pass through methods.
  export class Collection {
    models: User[] = [];

    // If we are initializing inline (vs in the constructor) like below
    // we cannot use the shortened syntax below
    events: Eventing = new Eventing();

    // on = this.events.on // shortened syntax

    get on(){
      return this.events.on;
    }
  }

  2 <T,K> - User, UserProps

  3 Original
    // User.builderUser(value)  <- We cannot simple substitute T for User because we have
    // a direct reference to a static method called buildUser() on the User class.

    fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));

        // const user = User.buildUser(value);
        // this.models.push(user); // models array expects type User
      });

      this.trigger("change");
    });
  }

  3b To solve above we can create a type annotation
    public deserialize: (json: K) => T
*/
