import React, { Component } from "react";
import "./charDetails.css";
import Spinner from "../loading/spinner";

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field] ? item[field] : "No information"}</span>
    </li>
  );
};

export { Field };

export default class CharDetails extends Component {
  state = {
    item: null,
    loading: false,
  };

  componentDidMount() {
    this.updateItem();
  }
  componentDidUpdate(prevProps) {
    if (this.props.ItemId !== prevProps.ItemId) {
      this.setState({ loading: true });
      this.updateItem();
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }
  }

  updateItem() {
    const { ItemId } = this.props;
    if (!ItemId) {
      return;
    }
    const { getData } = this.props;
    getData(ItemId).then((item) => {
      this.setState({ item });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="char-details rounded">
          <Spinner />
        </div>
      );
    }

    if (!this.state.item) {
      return <Spinner />;
    }
    const { item } = this.state;

    const { name } = item;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    );
  }
}
