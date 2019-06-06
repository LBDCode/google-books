import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
 
class Stars extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      rating: props.value,
      name: props.name
    };
  }
 
  render() {
    const { rating, name } = this.state;
    const props = this.props;
    return (                
    );
  }
}

export default Stars;
 
