import React, { Component } from "react";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import "./app.css";
import ErrorMessage from "../errorMessage/errorMessage";
import CharacterPage from "../pages/characterPage";
import GotService from "../../api/script";
import BookPage from "../pages/bookPage";
import HousePage from "../pages/housePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BooksItem from "../pages/bookItem";

export default class App extends Component {
  state = {
    toggle: true,
    error: false,
  };

  gotService = new GotService();

  componentDidCatch() {
    this.setState({ error: true });
  }
  onToggleButton = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const { toggle } = this.state;
    const ToggleBlock = toggle ? (
      <Row>
        <Col lg={{ size: 12, offset: 0 }}>
          <div className="d-flex justify-content-center">
            <RandomChar interval={1500} />
          </div>
        </Col>
      </Row>
    ) : null;
    const ButtonTogle = (
      <Button color="primary" size="lg" className="toggle-button" block onClick={this.onToggleButton}>
        Toggle Character
      </Button>
    );

    return (
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Route path="/" exact component={() => <div className="title m-150">Welcom to GOT Data Base</div>} />
            <Route path="/" exact component={() => ToggleBlock} />
            <Route path="/" exact component={() => ButtonTogle} />
            <Route path="/characters/" exact component={() => <div className="title">Characters</div>} />
            <Route path="/characters/" component={CharacterPage} />
            <Route path="/houses/" exact component={() => <div className="title">Houses</div>} />
            <Route path="/houses/" component={HousePage} />
            <Route path="/books/" exact component={() => <div className="title">Books</div>} />
            <Route path="/books/" exact component={BookPage} />
            <Route
              path="/books/:id"
              render={({ match }) => {
                const { id } = match.params;
                return <BooksItem bookId={id} />;
              }}
            />
          </Container>
        </div>
      </Router>
    );
  }
}
