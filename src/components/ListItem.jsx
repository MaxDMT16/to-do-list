import React, { Component } from "react";
import "./../styles/ListItem.css";

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };

    this.handleItemChange = this.handleItemChange.bind(this);
  }

  handleItemChange(event) {
    const newValue = event.target.value;

    this.setState({ value: newValue });

    this.props.onChange({ id: this.props.id, value: newValue });
  }

  render() {
    return (
      <div className="list-item">
        <img
          alt="Delete"
          src="images/outline_close_black_18dp.png"
          onClick={() => {
            this.props.onDeleteItem(this.props.id);
          }}
        />
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleItemChange}
        />
      </div>
    );
  }
}

ListItem.defaultProps = {
  value: "",
  id: -1,
  onDeleteItem: () => {},
  onChange: e => {}
};

export default ListItem;
