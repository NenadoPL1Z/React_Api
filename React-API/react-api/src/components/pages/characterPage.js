import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../ItemDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../api/script";
import RowBlock from "../rowBlock/rowBlock";

export default class CharacterPage extends Component {
  state = {
    selectedChar: 130,
    error: false,
  };

  gotService = new GotService();

  onItemSelected = (id) => {
    this.setState({ selectedChar: id });
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = <ItemList getData={this.gotService.getAllCharacters} onItemSelected={this.onItemSelected} renderItem={(item) => `${item.name} (${item.gender})`} count={41} />;

    const charDetails = (
      <ItemDetails getData={this.gotService.getCharacters} ItemId={this.state.selectedChar}>
        <Field field="gender" label="Gender"></Field>
        <Field field="born" label="Born"></Field>
        <Field field="death" label="Died"></Field>
        <Field field="culture" label="Culture"></Field>
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
