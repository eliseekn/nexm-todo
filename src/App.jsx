import React, { Component } from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
    'Accept': 'application/json',
}

const Item = (props) => {
    const handleEdit = () => {
        props.handleEdit(props.id, props.description)
    }
    
    const handleDelete = () => {
        props.handleDelete(props.id)
    }

    return (
        <li className="list-group-item d-flex flex-md-row flex-column align-items-md-center">
            <div className="mb-md-0 mb-2"><i className="fas fa-dot-circle"></i> {props.description}</div>
            
            <div className="ml-0 ml-md-auto d-flex">
                <button className="btn btn-primary mr-2" onClick={handleEdit}>Edit</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            itemId: '',
            itemDescription: '',
            actionText: 'Add item'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleChange(e) {
        this.setState({ itemDescription: e.target.value })

        if (e.target.value === '') {
            this.setState({
                itemId: '',
                actionText: 'Add item'
            })
        }
    }

    handleEdit(itemId, itemDescription) {
        document.querySelector('#description').focus()

        this.setState({
            itemId: itemId,
            itemDescription: itemDescription,
            actionText: 'Update item'
        })
    }

    handleSubmit() {
        if (this.state.itemDescription === '') {
            return
        }

        if (this.state.actionText === 'Add item') {
            fetch('http://localhost:3001/api/todo/', {
                method: 'post',
                headers: headers,
                body: JSON.stringify({ description: this.state.itemDescription })
            })
                .then(res => res.json())
                .then(data =>
                    this.setState(state => ({
                        items: state.items.concat({
                            _id: data._id,
                            description: data.description
                        }),
                        
                        itemDescription: ''
                    }))
                )
        }
        
        else {
            fetch('http://localhost:3001/api/todo/' + this.state.itemId, {
                method: 'put',
                headers: headers,
                body: JSON.stringify({ description: this.state.itemDescription })
            })
                .then(res => res.json())
                .then(() => {
                    this.setState(state => ({
                        items: state.items.map(item => {
                            if (item._id === state.itemId) {
                                item.description = state.itemDescription
                            }
                
                            return item
                        }),

                        itemId: '',
                        itemDescription: '',
                        actionText: 'Add item'
                    }))
                })
        }
    }

    handleDelete(itemId) {
        fetch('http://localhost:3001/api/todo/' + itemId, {
            method: 'delete',
            headers: headers
        })
            .then(res => res.json())
            .then(() =>
                this.setState(state => ({
                    items: state.items.filter(item => item._id !== itemId)
                }))
            )
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/todo/', { headers: headers })
            .then(res => res.json())
            .then(data => this.setState({ items: data }))
    }

    render() {
        return (
            <div className="container my-5 px-5">
                <h1 className="jumbotron text-center">Todo App</h1>

                <div className="form-row">
                    <div className="form-group col-md-10">
                        <input type="text" id="description" className="form-control" placeholder="Item description" value={this.state.itemDescription} onChange={this.handleChange} />
                    </div>
                    
                    <div className="form-group col-md-2">
                        <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>{this.state.actionText}</button>
                    </div>
                </div>

                <ul className="list-group">
                {
                    this.state.items.map(item => {
                        return (
                            <Item
                                key={item._id}
                                id={item._id}
                                description={item.description}
                                handleEdit={this.handleEdit}
                                handleDelete={this.handleDelete} />
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}

export default App