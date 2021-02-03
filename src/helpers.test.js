import { SAMPLE_DATA, getInstantPoolDepositAPY, getAverageRate } from './helpers'

const result = {
          "lastUpdateTimestamp": 1612288089,
          "liquidityIndex": "1014542135989812558867678905",
          "paramsHistory": [
            {
              "liquidityIndex": "1006150146314870467176759719",
              "timestamp": 1609463063,
              "variableBorrowIndex": "1009780621502965331032196551"
            }
          ],
          "variableBorrowIndex": "1023876006870928376026939527"
};

const dai_data = {
    "data": {
        "reserves": [
            {
                "symbol": "DAI",
                "utilizationRate": "0.87641918",
                "averageStableRate": "96261500460623417737189483",
                "totalPrincipalStableDebt": "32295482112250214913855328",
                "variableBorrowRate": "329054148758514508662589341",
                "totalCurrentVariableDebt": "24140355825395641783256180",
                "reserveFactor": "1000"
            }
        ]
    }
};

test('Calculate APY', () => {
    //console.log('APY: ', getInstantPoolDepositAPY(SAMPLE_DATA.data.reserves[11]));
    console.log('APY: ', getInstantPoolDepositAPY(dai_data.data.reserves[0]));
    // console.log()
    // expect(countProtocols(SAMPLE_DATA.data))
});

test('Get Average APY rate', () => {
    console.log("Average APY: ", getAverageRate(result));
});