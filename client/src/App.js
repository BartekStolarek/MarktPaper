import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import AdvertsList from './components/AdvertsList';

//apollo client setup
const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div id="main">
                    <h1>MarktPaper - easiest way to sell your book</h1>
                    <AdvertsList />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;