import React,{ Component,PropTypes } from 'react'
import { Link } from 'react-router'

export default class Index extends Component{
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">HelloWorld</Link></li>
                    <li><Link to="/counter">Counter</Link></li>
                </ul>

                {this.props.children}
            </div>
        )
    }
}
