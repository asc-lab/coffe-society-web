import React, {Component} from 'react';

class ProductDefinition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            definitions: []
        };
        this.getDefinitions = this.getDefinitions.bind(this);
    }

    getDefinitions() {
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer' + localStorage.getItem("access_token")
        });

        fetch("http://localhost:9002/api/definitions",
            {
                method: "GET",
                headers: headers
            }).then(response =>
            response.json().then(json => {
                if (response.ok) {
                    return json;
                } else {
                    return Promise.reject(json);
                }
            }).then(res => {
                let definitions = [];
                res.forEach(x => {
                    definitions.push({
                        id: x.id,
                        name: x.name,
                        tax: x.tax,
                    })
                });
                this.setState({
                    definitions: definitions
                });
            })
        );
    }

    componentWillMount() {
        this.getDefinitions();
    }

    render() {
        let {definitions} = this.state;
        const listItems = definitions.map((d) => <li key={d.name}>{d.name}</li>);

        return (
            <div>
                {listItems}
            </div>

        );
    }
}

export default ProductDefinition;