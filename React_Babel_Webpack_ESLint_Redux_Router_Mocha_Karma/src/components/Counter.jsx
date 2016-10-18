import React,{ Component,PropTypes } from 'react'

export default class Counter extends Component{
    render() {

        const {counter,increment,decrement,incrementIfOdd,incrementAsync} = this.props;

        return (
            <div>
                <h1>Counter!</h1>
                <p>
                    Clicked: {counter} times
                    {' '}
                    <button onClick={increment}>+</button>
                    {' '}
                    <button onClick={decrement}>-</button>
                    {' '}
                    <button onClick={incrementIfOdd}>Increment if odd</button>
                    {' '}
                    <button onClick={() => incrementAsync()}>Increment async</button>
                </p>
            </div>
        )
    }
}