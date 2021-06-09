import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../ItemDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../api/script";
import RowBlock from "../rowBlock/rowBlock";

export default class HousePage extends Component {
  state = {
    selectedBook: 1,
    error: false,
  };

  gotService = new GotService();

  onItemSelected = (id) => {
    this.setState({ selectedBook: id });
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = <ItemList getData={this.gotService.getAllHouse} onItemSelected={this.onItemSelected} renderItem={(item) => item.name} count={1} />;

    const charDetails = (
      <ItemDetails getData={this.gotService.getHouse} ItemId={this.state.selectedBook}>
        <Field field="name" label="Name"></Field>
        <Field field="region" label="Region"></Field>
        <Field field="words" label="Words"></Field>
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
