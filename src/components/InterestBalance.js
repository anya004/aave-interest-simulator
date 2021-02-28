import React from 'react';

function InterestBalance ({ interestEarned, interestOwed }) {
    
    return (
      <div class="row">
          <div class="card" style={{height: "5rem"}}>
            <div class="card-body" >
                
                <h5 class={interestEarned>=interestOwed ? "text-success":"text-danger"}>
                    ${Math.abs(interestEarned-interestOwed).toFixed(2).toString()}
                </h5>
                <p class="card-title">Interest you would've {interestEarned>=interestOwed ? "earned":"owed"}.</p> 
            </div>
         </div>
      </div>
    );
  };
  
export default InterestBalance;