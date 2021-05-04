import React from 'react'

function CodeArea() {
    return (
        <div className="codeArea">
            <textarea rows="20" className="input" id="code" autofocus>
                def solution(arr):
            </textarea>

            <button>Run Tests</button>
            <span id="results"></span>
        </div>
    )
}

export default CodeArea
