import React, { useEffect } from 'react'

function CodeArea() {

    useEffect(() => {        
        document.getElementById('code').addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
              e.preventDefault();
              var start = this.selectionStart;
              var end = this.selectionEnd;
              this.value = this.value.substring(0, start) +
                "\t" + this.value.substring(end);
              this.selectionStart =
                this.selectionEnd = start + 1;

            }
          });
    }, [])

    document.body.oncopy = function() { return false; }
    document.body.oncut = function() { return false; }
    document.body.onpaste = function() { return false; }


    function runTests() {
        document.getElementById("results").innerHTML = "Running...";
        const code = document.getElementById("code").value;
        let xhr = new XMLHttpRequest();
      
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("results").innerHTML = xhr.responseText;
          }
        }
        xhr.open("POST", "http://localhost:5000/test/");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("code=" + code);
      }

    return (
        <div className="codeArea">
            <textarea rows="20" className="input" id="code" defaultValue="def solution(arr):" spellcheck="false"  ></textarea>
 
            <div onClick={runTests} class="key long" type="button">
            <div>
                <span class="text">Enter</span>

                <div class="angle-shadow left-top top-section"></div>
                <div class="angle-shadow right-top top-section"></div>
                <div class="angle-shadow left-bottom bottom-section"></div>
                <div class="angle-shadow right-bottom bottom-section"></div>
            </div>
            </div>


            <span id="results"></span>
        </div>
    )
}

export default CodeArea
