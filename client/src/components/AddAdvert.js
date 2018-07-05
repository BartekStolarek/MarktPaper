import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAdvertsQuery, getAuthorsQuery, addAdvertMutation } from '../queries/queries';

class AddAdvert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            price: '',
            negotiable: false,
            photo: ''
        }
    }

    submitForm(e) {
        e.preventDefault();
        this.props.addAdvertMutation({
            variables: {
                title: this.state.title,
                description: this.state.description,
                price: this.state.price,
                negotiable: this.state.negotiable,
                photo: this.state.photo
            },
            refetchQueries: [{ query: getAdvertsQuery }]
        });
    }

    render() {
        return(
            <div>
                <div id="add-advert-container">
                    <h1>Add Advert</h1>
                    
                    <form id="add-advert" onSubmit={ this.submitForm.bind(this) }>
                        <div className="field">
                            <label>Title: </label>
                            <input type="text" onChange={ (e) => this.setState({ title: e.target.value }) } />
                        </div>
                        <div className="field">
                            <label>Description: </label>
                            <input type="text" onChange={ (e) => this.setState({ description: e.target.value }) } />
                        </div>
                        <div className="field">
                            <label>Price: </label>
                            <input type="text" onChange={ (e) => this.setState({ price: e.target.value }) } />
                        </div>
                        <div className="field">
                            <label>Negotiable: </label>
                            <select onChange={ (e) => this.setState({ negotiable: e.target.value })}>
                                <option key="false" value="False">False</option>
                                <option key="true" value="True">True</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addAdvertMutation, { name: "addAdvertMutation" })
)(AddAdvert);