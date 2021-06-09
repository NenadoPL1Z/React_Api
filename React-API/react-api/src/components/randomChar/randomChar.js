import React, { Component, useEffect, useState } from "react";
import "./randomChar.css";
import GotService from "../../api/script";
import Spinner from "../loading/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import propTypes from "prop-types";

function RandomChar({ interval }) {
  const [char, updateStateChar] = useState({});
  const [loading, updateLoading] = useState(true);
  const [error, updateError] = useState(false);

  const gotService = new GotService();

  const onCharLoaded = (char) => {
    updateStateChar(char);
    updateLoading(!loading);
  };

  const onError = (err) => {
    updateLoading(!error);
    updateError(!loading);
  };

  useEffect(() => {
    updateChar();
    let timerId = setInterval(updateChar, 1500);
    return () => {
      clearInterval(timerId);
      console.log(1);
    };
  }, []);

  //? Формируем state для рандомного персонажа
  const updateChar = () => {
    let id = Math.floor(Math.random() * 1000 + 25);
    gotService.getCharacters(id).then(onCharLoaded).catch(onError);
  };

  const content = !(loading || error) ? <View char={char} /> : null;
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

export default RandomChar;
