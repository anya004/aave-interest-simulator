import React from 'react';

function BorrowAmountTextbox({ onChange, value }) {

    function handleChange(e) {
        console.log("Borrow Amount Entered!");
        onChange?.(parseInt(e.target.value));
    }
    
    return (
        <form class="form-floating">
            <input class="form-control" id="floatingInputValueBorrow" type="text" name="borrow" onChange={handleChange} value={value}/>
            <label for="floatingInputValueBorrow">Borrow Amount</label>
        </form>
    );
    //<input type="submit" value="Submit" />
}

export default BorrowAmountTextbox;
