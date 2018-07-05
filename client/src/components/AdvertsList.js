import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAdvertsQuery } from '../queries/queries';

class AdvertsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    displayAdverts() {
        var data = this.props.data;
        
        if (data.loading) {
            return (<div>Loading Adverts, please wait...</div>);
        } else {
            return data.advertisements.map(ad => {
                return(
                    <div key={ad.id} className="ad-container">
                        <h2>{ad.title}</h2>
                        <h5>{ad.price}</h5>
                        <div>{ad.description}</div>
                    </div>
                );
            })
        }
    }

    render() {
        return(
            <div>
                <div id="adverts-list">
                    <h1>Recent Advertisements</h1>
                    { this.displayAdverts() }
                </div>
            </div>
        );
    }
}

export default graphql(getAdvertsQuery)(AdvertsList);