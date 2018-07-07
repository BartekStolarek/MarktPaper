import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAdvertsQuery } from '../queries/queries';
import AddAdvert from './AddAdvert';

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
                        <div>{ad.price}</div>
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
                    <h2>Recent Advertisements</h2>
                    { this.displayAdverts() }
                    <AddAdvert />
                </div>
            </div>
        );
    }
}

export default graphql(getAdvertsQuery)(AdvertsList);