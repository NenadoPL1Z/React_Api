import React, { Component } from "react";
import "./randomChar.css";
import GotService from "../../api/script";
import Spinner from "../loading/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import propTypes from "prop-types";

export default class RandomChar extends Component {
  gotService = new GotService();
  state = {
    char: {},
    loading: true,
    error: false,
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = (err) => {
    this.setState({ error: true, loading: false });
  };

  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  //? Формируем state для рандомного персонажа
  updateChar = () => {
    let id = Math.floor(Math.random() * 1000 + 25);
    this.gotService.getCharacters(id).then(this.onCharLoaded).catch(this.onError);
  };

  render() {
    const {
      char: { name, gender, born, death, culture },
      loading,
      error,
    } = this.state;

    const content = !(loading || error) ? <View char={this.state.char} /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
      <>
        <div className="random-block rounded">
          {errorMessage}
          {spinner}
          {content}
        </div>
      </>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, born, death, culture } = char;
  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{death}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  );
};
