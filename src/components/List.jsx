import React, { Component } from "react";
import ListItem from "./ListItem";
import "./../styles/List.css";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsValues: [""]
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.handleItemChanged = this.handleItemChanged.bind(this);
  }

  handleAddItem() {
    let values = this.state.itemsValues.slice();
    values.push("");
    this.setState({ itemsValues: values });
  }

  handleDeleteItem(key) {
    let values = this.state.itemsValues.slice();
    values = values.filter((value, index) => index !== key);
    this.setState({ itemsValues: values });
  }

  handleItemChanged(item) {
    let values = this.state.itemsValues.slice();
    values[item.id] = item.value;
    this.setState({ itemsValues: values });
  }

  renderItems() {
    return this.state.itemsValues.map((value, index) => {
      return (
        <ListItem
          value={value}
          key={index}
          id={index}
          onDeleteItem={this.handleDeleteItem}
          onChange={this.handleItemChanged}
        />
      );
    });
  }

  renderBody() {
    if (this.state.itemsValues.length > 0) {
      return this.renderItems();
    } else {
      return <p>List is empty</p>;
    }
  }

  render() {
    return (
      <div className="list">
        <div className="list-header">
          <img
            alt="Delete list "
            src="images/outline_close_black_18dp.png"
            onClick={this.props.onDeleteList}
          />
        </div>
        <div className="list-body">{this.renderBody()}</div>
        <div className="list-footer">
          <img
            alt="Add "
            src="images/outline_add_black_18dp.png"
            onClick={this.handleAddItem}
          />
        </div>
      </div>
    );
  }
}

List.defaultProps = {
  id: -1
};

export default List;
