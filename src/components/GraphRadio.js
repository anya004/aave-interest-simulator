import React from 'react';

function GraphRadio({onChange, radioSelectedOption}) {

    function handleChange(e) {
        onChange?.(e.target.value);
    }
      
    return (
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <button type="button" class="btn btn-outline-secondary" disabled>Graph</button>
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" value="interest" autoComplete="off" checked={radioSelectedOption === "interest"} onChange={handleChange}/>
            <label class="btn btn-outline-secondary" for="btnradio1">Interest</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" value="rate" autoComplete="off" checked={radioSelectedOption === "rate"} onChange={handleChange}/>
            <label class="btn btn-outline-secondary" for="btnradio2">Rate</label>

        </div>
    );
}

export default GraphRadio;