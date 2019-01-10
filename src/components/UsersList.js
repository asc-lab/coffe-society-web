import React, {Component} from 'react';

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
        this.getUsers = this.getUsers.bind(this);
    }

    getUsers() {
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer' + localStorage.getItem("access_token")
        });

        fetch("http://localhost:9001/api/users",
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
                let users = [];
                res.forEach(x => {
                    users.push({
                        username: x.username,
                    })
                });
                this.setState({
                    users: users
                });
            })
        );
    }

    componentWillMount() {
        this.getUsers();
    }


    render() {
        let {users} = this.state;
        const listItems = users.map((d) => <li key={d.username}>{d.username}</li>);

        return (
            <div>
                {listItems}
            </div>

        );
    }
}

export default UsersList;