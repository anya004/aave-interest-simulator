import React from 'react';

function DepositAmountTextbox({ onChange, value }) {

    function handleChange(e) {
        console.log("Deposit Amount Entered!");
        onChange?.(e.target.value);
    }
    
    return (
        <form>
            <label>
                Deposit Amount:
                <input type="text" name="deposit" onChange={handleChange} value={value}/>
            </label>
        </form>
    );
    //<input type="submit" value="Submit" />
}

export default DepositAmountTextbox;
