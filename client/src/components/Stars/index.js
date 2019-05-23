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
      <div>
        <StarRatingComponent 
          name={props.name} 
          starCount={5}
          value={rating}
          onStarClick={props.rateBooks.bind(this)}
        />
      </div>
    );
  }
}

export default Stars;
 
