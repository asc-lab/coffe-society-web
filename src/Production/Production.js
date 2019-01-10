import React, {Component} from 'react';
import ProductDefinition from "../components/ProductDefinition";
import UsersList from "../components/UsersList";

class Production extends Component {
    render() {
        return (
            <div>
                <div>
                    <ProductDefinition/>
                </div>
                <div>
                    <UsersList/>
                </div>
            </div>
        );
    }
}

export default Production;