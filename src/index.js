import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { store, persistor } from "./redux/store"

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client"

import "./index.css"
import App from "./App"

// using Apollo graphQL
const client = new ApolloClient({
    uri: "https://crwn-clothing.com/",
    cache: new InMemoryCache(),
})

client
    .query({
        query: gql`
            query {
                collection(id: "cjwuuj5bz000i0719rrtw5gqk") {
                    id
                    title
                    items {
                        id
                        name
                        price
                        imageUrl
                    }
                }
                getCollectionsByTitle(title: "Hats") {
                    id
                    title
                    items {
                        name
                    }
                }
            }
        `,
    })
    .then((data) => console.log(data))

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById("root")
)
