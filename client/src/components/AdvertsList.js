import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAdvertsQuery } from '../queries/queries';

class AdvertsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }

        this.displayAdverts();
    }

    displayAdverts() {
        var data = this.props.data;
        console.log(data);
    }

    render() {
        return(
            <div>
                <ul id="adverts-list">
                    Adverts
                </ul>
            </div>
        );
    }
}

export default graphql(getAdvertsQuery)(AdvertsList);