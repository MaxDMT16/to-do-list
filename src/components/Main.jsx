import React, { Component } from "react";
import List from "./List";
import "./../styles/Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { lists: [] };

    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
  }

  handleCreateList() {
    let lists = this.state.lists.slice();
    const id = lists.length + 1;
    lists.push(<List key={id} id={id} onDeleteList={this.handleDeleteList} />);
    this.setState({ lists: lists });
  }

  handleDeleteList(id) {
    console.log(`Try to delete list with id: ${id}`);
    var filteredLists = this.state.lists.slice();
    filteredLists = filteredLists.filter(list => list.props.id !== id);
    this.setState({ lists: filteredLists });
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
