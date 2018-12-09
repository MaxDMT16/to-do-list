import React, { Component } from "react";
import "./../styles/ListItem.css";

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };

    this.handleItemValueChange = this.handleItemValueChange.bind(this);
    this.handleItemStateChange = this.handleItemStateChange.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
  }

  handleItemStateChange(event) {
    console.log(event);

    const changedItem = {
      isComplete: event.target.checked,
      value: this.props.value
    };

    this.props.onStateChange(changedItem);
  }

  handleItemValueChange(event) {
    const newValue = event.target.value;
    this.setState({ value: newValue });
    this.props.onChange({ id: this.props.id, value: newValue });
  }

  renderDeleteButton() {
    if (!this.props.isComplete) {
      return (
        <img
          alt="Delete"
          src="images/outline_close_black_18dp.png"
          onClick={() => {
            this.props.onDeleteItem(this.props.id);
          }}
        />
      );
    }
  }

  render() {
    return (
      <div className="list-item">
        {this.renderDeleteButton()}
        <input
          type="checkbox"
          checked={this.props.isComplete}
          onChange={this.handleItemStateChange}
        />
        <input
          type="text"
          value={this.props.value}
          onChange={this.handleItemValueChange}
          disabled={this.props.isComplete}
        />
      </div>
    );
  }
}

ListItem.defaultProps = {
  value: "",
  id: -1,
  isComplete: false,
  onDeleteItem: () => {},
  onChange: e => {},
  onStateChange: () => {}
};

export default ListItem;
