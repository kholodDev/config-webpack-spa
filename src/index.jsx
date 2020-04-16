import React from 'react'
import ReactDOM from 'react-dom'
import style from  './style.scss'

const App = () => {
    return (
        <div className={style.app}>
            <h1>App</h1>
            <h1>App</h1>
            <h1>App</h1>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
