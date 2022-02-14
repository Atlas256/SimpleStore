import axios from "axios";
import { TItem } from "../types";

export const saveItem = (URL_PATH: string, ID: string, editItem: TItem) => {
  axios.put(`http://localhost:5000/api/${URL_PATH}/id/${ID}`, editItem)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const createItem = (URL_PATH: string, editItem: TItem) => {
  axios.post(`http://localhost:5000/api/${URL_PATH}`, editItem)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const deleteItem = (URL_PATH: string, ID: string) => {
  axios.delete(`http://localhost:5000/api/${URL_PATH}/id/${ID}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}