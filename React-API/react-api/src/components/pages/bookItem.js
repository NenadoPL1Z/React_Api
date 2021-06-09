import React, { Component } from "react";
import GotService from "../../api/script";
import ItemDetails, { Field } from "../ItemDetails";

export default class BooksItem extends Component {
  gotService = new GotService();

  render() {
    return (
      <div className="mb-140">
        <ItemDetails getData={this.gotService.getBook} ItemId={this.props.bookId}>
          <Field field="name" label="Name"></Field>
          <Field field="released" label="Released"></Field>
          <Field field="numberOfPages" label="Number Of Pages"></Field>
        </ItemDetails>
      </div>
    );
  }
}
