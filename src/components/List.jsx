import React, { Component } from "react";
import ListItem from "./ListItem";
import "./../styles/List.css";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemsValues: [""],
      completeItemsValues: []
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.renderActiveItems = this.renderActiveItems.bind(this);
    this.renderCompleteItems = this.renderCompleteItems.bind(this);
    this.handleItemValueChanged = this.handleItemValueChanged.bind(this);
    this.handleItemStateChanged = this.handleItemStateChanged.bind(this);
    this.moveItemToActive = this.moveItemToActive.bind(this);
    this.moveItemToComplete = this.moveItemToComplete.bind(this);
    this.addActiveItemValue = this.addActiveItemValue.bind(this);
    this.addCompleteItemValue = this.addCompleteItemValue.bind(this);
    this.removeActiveItemValue = this.removeActiveItemValue.bind(this);
    this.removeCompleteItemValue = this.removeCompleteItemValue.bind(this);
  }

  handleAddItem() {
    let values = this.state.activeItemsValues.slice();
    values.push("");
    this.setState({ activeItemsValues: values });
  }

  handleDeleteItem(key) {
    let values = this.state.activeItemsValues.slice();
    values = values.filter((value, index) => index !== key);
    this.setState({ activeItemsValues: values });
  }

  handleItemValueChanged(item) {
    let values = this.state.activeItemsValues.slice();
    values[item.id] = item.value;
    this.setState({ activeItemsValues: values });
  }

  handleItemStateChanged(item) {
    item.isComplete
      ? this.moveItemToComplete(item.value)
      : this.moveItemToActive(item.value);
  }

  moveItemToActive(value) {
    this.removeCompleteItemValue(value);
    this.addActiveItemValue(value);
  }

  moveItemToComplete(value) {
    this.removeActiveItemValue(value);
    this.addCompleteItemValue(value);
  }

  addActiveItemValue(value) {
    let activeItemsValues = this.state.activeItemsValues.slice();
    activeItemsValues.push(value);
    this.setState({ activeItemsValues: activeItemsValues });
  }

  addCompleteItemValue(value) {
    let completeItemsValues = this.state.completeItemsValues.slice();
    completeItemsValues.push(value);
    this.setState({ completeItemsValues: completeItemsValues });
  }

  removeActiveItemValue(itemValue) {
    let activeItemsValues = this.state.activeItemsValues.slice();
    activeItemsValues = activeItemsValues.filter(value => value !== itemValue);
    this.setState({ activeItemsValues: activeItemsValues });
  }

  removeCompleteItemValue(itemValue) {
    let completeItemsValues = this.state.completeItemsValues.slice();
    completeItemsValues = completeItemsValues.filter(
      value => value !== itemValue
    );
    this.setState({ completeItemsValues: completeItemsValues });
  }

  renderActiveItems() {
    return this.state.activeItemsValues.map((value, index) => {
      return (
        <ListItem
          value={value}
          key={index}
          id={index}
          isComplete={false}
          onDeleteItem={this.handleDeleteItem}
          onChange={this.handleItemValueChanged}
          onStateChange={this.handleItemStateChanged}
        />
      );
    });
  }

  renderCompleteItems() {
    return this.state.completeItemsValues.map((value, index) => {
      return (
        <ListItem
          value={value}
          key={index}
          id={index}
          isComplete={true}
          onDeleteItem={this.handleDeleteItem}
          onChange={this.handleItemValueChanged}
          onStateChange={this.handleItemStateChanged}
        />
      );
    });
  }

  renderItems() {
    const activeListItems = this.renderActiveItems();
    const completeListItems = this.renderCompleteItems();
    return activeListItems.concat(completeListItems);
  }

  renderBody() {
    if (
      this.state.activeItemsValues.length > 0 ||
      this.state.completeItemsValues.length > 0
    ) {
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
            onClick={() => {
              this.props.onDeleteList(this.props.id);
            }}
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
