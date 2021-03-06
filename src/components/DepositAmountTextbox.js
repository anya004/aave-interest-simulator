import React from 'react';

function DepositAmountTextbox({ onChange, value }) {

    function handleChange(e) {
        console.log("Deposit Amount Entered!");
        onChange?.(parseInt(e.target.value));
    }
    
    return (
        <form class="form-floating">
            <input class="form-control" id="floatingInputValueDeposit" type="text" name="deposit" onChange={handleChange} value={value}/>
            <label for="floatingInputValueDeposit">Deposit Amount</label>
        </form>
    );
    //<input type="submit" value="Submit" />
}

export default DepositAmountTextbox;
