import React from 'react';

function CurrencyRadio({onChange, currencySelectedOption}) {

    function handleChange(e) {
        onChange?.(e.target.value);
    }
      
    return (
        <div class="btn-group" role="group" aria-label="Radio buttons for currency">
            <button type="button" class="btn btn-outline-secondary" disabled>Currency</button>
            <input type="radio" class="btn-check" name="btnradiocurrency" id="btnradio3" value="native" autoComplete="off" checked={currencySelectedOption === "native"} onChange={handleChange}/>
            <label class="btn btn-outline-secondary" for="btnradio3">Native</label>

            <input type="radio" class="btn-check" name="btnradiocurrency" id="btnradio4" value="usd" autoComplete="off" checked={currencySelectedOption === "usd"} onChange={handleChange}/>
            <label class="btn btn-outline-secondary" for="btnradio4">USD</label>

        </div>
    );
}

export default CurrencyRadio;