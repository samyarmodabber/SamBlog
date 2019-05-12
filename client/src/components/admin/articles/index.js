import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";

export default class index extends Component {
  state = {
    articles: [
      { id: 1, subject: "welcome", content: "Welcome to my blog" },
      { id: 2, subject: "Hi", content: "2 Welcome to my blog" },
      { id: 1, subject: "welcome", content: "3 Welcome to my blog" }
    ]
  };
  render() {
    const { articles } = this.state;
    return (
      <div>
        <Container>
          <ListGroup>
            {articles.map(({ subject, content }) => (
              <ListGroupItem>
              {subject}
              <Button size='sm'>Edit</Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Container>
      </div>
    );
  }
}
