import axios, { AxiosPromise } from "axios";

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}

/*
  1 Note: Change level of delegation for what fetch() is responsible for.
  - Remember that this.set() purpose is to update our User model
  with that returned data. So we need a way to get that data to be available
  to class User.
  - To do this, return a promise that will eventually resolve with
  the data we get back.
    

    fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`)

    // .then((response: AxiosResponse): void => {
    //   this.set(response.data)
    // })
  }

  2 Note: save()
  - Similarly we below does not return any indication taht the User was saved.

  save(data: UserProps): void {
    const { id } = data
    if(id){
      axios.put(`${this.rootUrl}/${id}`, data)
    } else {
      axios.post(this.rootUrl, data)
    }
  }



*/
