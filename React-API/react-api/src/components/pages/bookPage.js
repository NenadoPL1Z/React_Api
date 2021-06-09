import React, { Component } from "react";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../ItemDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../api/script";
import { withRouter } from "react-router-dom";

class BookPage extends Component {
  state = {
    error: false,
  };

  gotService = new GotService();

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = <ItemList getData={this.gotService.getAllBook} onItemSelected={this.onItemSelected} renderItem={(item) => item.name} count={1} />;

    const charDetails = (
      <ItemDetails getData={this.gotService.getBook} ItemId={this.state.selectedBook}>
        <Field field="name" label="Name"></Field>
        <Field field="released" label="Released"></Field>
        <Field field="numberOfPages" label="Number Of Pages"></Field>
      </ItemDetails>
    );

    return (
      <ItemList
        getData={this.gotService.getAllBook}
        onItemSelected={(itemId) => {
          this.props.history.push(`books/${itemId}`);
        }}
        renderItem={(item) => item.name}
        count={1}
      />
    );
  }
}

export default withRouter(BookPage);
