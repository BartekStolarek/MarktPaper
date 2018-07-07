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
            city: '',
            phone: '',
            email: '',
            category: '',
            authorId: ''
        }
    }

    displayCategories() {
        let categories = ['Biographies', 'Business', 'Comics', 'Education', 'Health & Diet', 
        'History', 'IT & Technology', 'Literature', 'Social', 'Religion', 'Science', 'Travel', 'Other'];

        return categories.map(category => {
            return(
                <option key={category} value={category}>{category}</option>
            )
        });
    }

    displayAuthors() {
        let data = this.props.getAuthorsQuery;

        if (data.loading) {
            return <option>Loading...</option>;
        } else {
            return data.authors.map(author => {
                return(
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            });
        }
    }

    submitForm(e) {
        e.preventDefault();

        console.log(this.state);

        this.props.addAdvertMutation({
            variables: {
                title: this.state.title,
                description: this.state.description,
                category: this.state.category,
                phone: this.state.phone,
                email: this.state.email,
                price: this.state.price,
                negotiable: this.state.negotiable,
                city: this.state.city,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getAdvertsQuery }]
        });
    }

    render() {
        return(
            <div>
                <div className="add-advert-container">
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
                            <label>Your Email: </label>
                            <input type="text" onChange={ (e) => this.setState({ email: e.target.value }) } />
                        </div>
                        <div className="field">
                            <label>Your Phone Number: </label>
                            <input type="text" onChange={ (e) => this.setState({ phone: e.target.value }) } />
                        </div>
                        <div className="field">
                            <label>City: </label>
                            <input type="text" onChange={ (e) => this.setState({ city: e.target.value }) } />
                        </div>
                        <div className="field">
                            <label>Negotiable: </label>
                            <select onChange={ (e) => this.setState({ negotiable: e.target.value })}>
                                <option key="false" value="False">False</option>
                                <option key="true" value="True">True</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>Category: </label>
                            <select onChange={ (e) => this.setState({ category: e.target.value })}>
                                { this.displayCategories() }
                            </select>
                        </div>
                        <div className="field">
                            <label>Author: </label>
                            <select onChange={ (e) => this.setState({ authorId: e.target.value })}>
                                { this.displayAuthors() }
                            </select>
                        </div>
                        <input type="submit" value="Add!" />
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