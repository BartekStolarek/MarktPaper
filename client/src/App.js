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
                    <AdvertsList />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;