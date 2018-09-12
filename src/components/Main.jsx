import React, { Component } from "react";
import List from "./List";
import "./../styles/Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { lists: [] };

    this.handleCreateList = this.handleCreateList.bind(this);
  }

  handleCreateList() {
    let lists = this.state.lists.slice();
    const id = lists.length + 1;
    lists.push(<List key={id} id={id} />);
    this.setState({ lists: lists });
  }

  render() {
    return (
      <React.Fragment>
        <div className="header">
          <button onClick={this.handleCreateList}>Create list</button>
        </div>
        <div>{this.state.lists.map(list => list)}</div>
      </React.Fragment>
    );
  }
}

export default Main;
