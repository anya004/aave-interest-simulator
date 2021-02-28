import { calculateAverageRate } from "@aave/protocol-js";
import BigNumber from 'bignumber.js';
import { invariant } from 'ts-invariant';
import { uniqBy } from 'lodash';

export const SAMPLE_DAI =
    {
        "data": {
          "reserves": [
            {
              "availableLiquidity": "11303731944585319881555897",
              "averageStableRate": "95886728849119943620471068",
              "isActive": true,
              "lifetimeCurrentVariableDebt": "81352885969434867433051411",
              "lifetimeDepositorsInterestEarned": "236551322676946139879721",
              "lifetimeFlashLoanPremium": "7156636381425120763712",
              "lifetimePrincipalStableDebt": "65296461213986434427219834",
              "lifetimeReserveFactorAccrued": "26286902720158201599577",
              "lifetimeScaledVariableDebt": "79624598585473228428691656",
              "name": "Dai Stablecoin",
              "reserveFactor": "1000",
              "stableBorrowRate": "91091899296619830869052896",
              "stableRateSlope1": "20000000000000000000000000",
              "stableRateSlope2": "750000000000000000000000000",
              "symbol": "DAI",
              "totalCurrentVariableDebt": "16728419339117889298403838",
              "totalLiquidity": "56368432978718592427891383",
              "totalLiquidityAsCollateral": "36043310867401735553957915",
              "totalPrincipalStableDebt": "28522412205974793537950248",
              "totalScaledVariableDebt": "16373035313672501819566050",
              "utilizationRate": "0.79946698",
              "variableBorrowRate": "41091899296619830869052896",
              "variableRateSlope1": "40000000000000000000000000",
              "variableRateSlope2": "750000000000000000000000000"
            }
          ]
        }
    }

export const SAMPLE_DATA = {
    "data": {
        "reserves": [
        {
            "availableLiquidity": "47210658635949973799732",
            "averageStableRate": "91233637948306016372035328",
            "lifetimeCurrentVariableDebt": "3457750710914715459300187",
            "lifetimeDepositorsInterestEarned": "23517530313177856093787",
            "lifetimeFlashLoanPremium": "889542984595136874343",
            "lifetimePrincipalStableDebt": "7807950749093583723002001",
            "lifetimeReserveFactorAccrued": "2612925942626910031441",
            "lifetimeScaledVariableDebt": "3303051083302958948642511",
            "name": "TrueUSD",
            "reserveFactor": "1000",
            "stableBorrowRate": "795266671770843551133878239",
            "stableRateSlope1": "20000000000000000000000000",
            "stableRateSlope2": "750000000000000000000000000",
            "symbol": "TUSD",
            "totalCurrentVariableDebt": "1038868146590976593574621",
            "totalLiquidity": "3867366248058916931100290",
            "totalLiquidityAsCollateral": "-1974049074307742834097517",
            "totalPrincipalStableDebt": "2801433396089537885426534",
            "totalScaledVariableDebt": "992389227532978694359465",
            "utilizationRate": "0.98779255",
            "variableBorrowRate": "745266671770843551133878239",
            "variableRateSlope1": "40000000000000000000000000",
            "variableRateSlope2": "750000000000000000000000000"
        },
        {
            "availableLiquidity": "63500741",
            "averageStableRate": "0",
            "lifetimeCurrentVariableDebt": "853007627",
            "lifetimeDepositorsInterestEarned": "1550432",
            "lifetimeFlashLoanPremium": "27644",
            "lifetimePrincipalStableDebt": "0",
            "lifetimeReserveFactorAccrued": "0",
            "lifetimeScaledVariableDebt": "846859392",
            "name": "Gemini dollar",
            "reserveFactor": "0",
            "stableBorrowRate": "79399448930022241933563893",
            "stableRateSlope1": "40000000000000000000000000",
            "stableRateSlope2": "1000000000000000000000000000",
            "symbol": "GUSD",
            "totalCurrentVariableDebt": "236010256",
            "totalLiquidity": "297937051",
            "totalLiquidityAsCollateral": "40918732",
            "totalPrincipalStableDebt": "0",
            "totalScaledVariableDebt": "234309161",
            "utilizationRate": "0.78686524",
            "variableBorrowRate": "39399448930022241933563894",
            "variableRateSlope1": "40000000000000000000000000",
            "variableRateSlope2": "1000000000000000000000000000"
        },
        {
            "availableLiquidity": "900655118461993297726",
            "averageStableRate": "0",
            "lifetimeCurrentVariableDebt": "1069770143523690810011",
            "lifetimeDepositorsInterestEarned": "759388594472854642",
            "lifetimeFlashLoanPremium": "15102272713234773",
            "lifetimePrincipalStableDebt": "0",
            "lifetimeReserveFactorAccrued": "189974906816760645",
            "lifetimeScaledVariableDebt": "1063091971169656094310",
            "name": "yearn.finance",
            "reserveFactor": "2000",
            "stableBorrowRate": "13805762165498702956009942",
            "stableRateSlope1": "100000000000000000000000000",
            "stableRateSlope2": "3000000000000000000000000000",
            "symbol": "YFI",
            "totalCurrentVariableDebt": "59657613771429404878",
            "totalLiquidity": "959350642343295394873",
            "totalLiquidityAsCollateral": "259090849776057044120",
            "totalPrincipalStableDebt": "0",
            "totalScaledVariableDebt": "59284918883002735552",
            "utilizationRate": "0.06118255",
            "variableBorrowRate": "9664033515849092069206960",
            "variableRateSlope1": "70000000000000000000000000",
            "variableRateSlope2": "3000000000000000000000000000"
        },
        {
            "availableLiquidity": "2321121097254294286676050",
            "averageStableRate": "52397445834379115698718589",
            "lifetimeCurrentVariableDebt": "721371293525103031715277",
            "lifetimeDepositorsInterestEarned": "369448680059558722725",
            "lifetimeFlashLoanPremium": "161184827771673334200",
            "lifetimePrincipalStableDebt": "63612643305475476156047",
            "lifetimeReserveFactorAccrued": "92427759108483440544",
            "lifetimeScaledVariableDebt": "717907308240712133994549",
            "name": "Basic Attention Token",
            "reserveFactor": "2000",
            "stableBorrowRate": "41323827600813311470235175",
            "stableRateSlope1": "100000000000000000000000000",
            "stableRateSlope2": "3000000000000000000000000000",
            "symbol": "BAT",
            "totalCurrentVariableDebt": "98788388334604818432866",
            "totalLiquidity": "2445130448692177050620576",
            "totalLiquidityAsCollateral": "659234594557115940204816",
            "totalPrincipalStableDebt": "25834922697437575780247",
            "totalScaledVariableDebt": "98310259779088042638413",
            "utilizationRate": "0.05071686",
            "variableBorrowRate": "7926679320569318029164622",
            "variableRateSlope1": "70000000000000000000000000",
            "variableRateSlope2": "3000000000000000000000000000"
        },
        {
            "availableLiquidity": "3303709814310665236040631",
            "averageStableRate": "31414320708014194200430364",
            "lifetimeCurrentVariableDebt": "3657477717872876099780776",
            "lifetimeDepositorsInterestEarned": "295520846567940698005",
            "lifetimeFlashLoanPremium": "62599085514213028704",
            "lifetimePrincipalStableDebt": "16418670935684582961430",
            "lifetimeReserveFactorAccrued": "159235396673163737626",
            "lifetimeScaledVariableDebt": "3652111224052192862373791",
            "name": "Decentraland MANA",
            "reserveFactor": "3500",
            "stableBorrowRate": "31757532443164194714424298",
            "stableRateSlope1": "100000000000000000000000000",
            "stableRateSlope2": "3000000000000000000000000000",
            "symbol": "MANA",
            "totalCurrentVariableDebt": "14477382565584225204826",
            "totalLiquidity": "3329529275006157033752946",
            "totalLiquidityAsCollateral": "-297101498428431192875548",
            "totalPrincipalStableDebt": "11859227848393833534440",
            "totalScaledVariableDebt": "14456107333356351039566",
            "utilizationRate": "0.00775468",
            "variableBorrowRate": "1230272710214936300097009",
            "variableRateSlope1": "70000000000000000000000000",
            "variableRateSlope2": "3000000000000000000000000000"
        },
        {
            "availableLiquidity": "1646569939415426447700166",
            "averageStableRate": "113977414605081642318524",
            "lifetimeCurrentVariableDebt": "294239261546626745106103",
            "lifetimeDepositorsInterestEarned": "36748470230167550413",
            "lifetimeFlashLoanPremium": "18446924054124790161",
            "lifetimePrincipalStableDebt": "1643265091599495689",
            "lifetimeReserveFactorAccrued": "9193260152679695037",
            "lifetimeScaledVariableDebt": "293826597401688073812347",
            "name": "Uniswap",
            "reserveFactor": "2000",
            "stableBorrowRate": "13317180483421666340402675",
            "stableRateSlope1": "120000000000000000000000000",
            "stableRateSlope2": "3000000000000000000000000000",
            "symbol": "UNI",
            "totalCurrentVariableDebt": "86549174109685699757010",
            "totalLiquidity": "1733056595987989276676380",
            "totalLiquidityAsCollateral": "552606771079574782146470",
            "totalPrincipalStableDebt": "1533265091599495689",
            "totalScaledVariableDebt": "86427790781229167700637",
            "utilizationRate": "0.04990411",
            "variableBorrowRate": "7768355281995972031901560",
            "variableRateSlope1": "70000000000000000000000000",
            "variableRateSlope2": "3000000000000000000000000000"
        },
        {
            "availableLiquidity": "499070505438",
            "averageStableRate": "35369454908078058431304393",
            "lifetimeCurrentVariableDebt": "224645595163",
            "lifetimeDepositorsInterestEarned": "33955988",
            "lifetimeFlashLoanPremium": "7583305",
            "lifetimePrincipalStableDebt": "9938010343",
            "lifetimeReserveFactorAccrued": "8481607",
            "lifetimeScaledVariableDebt": "224012793497",
            "name": "Wrapped BTC",
            "reserveFactor": "2000",
            "stableBorrowRate": "42147964241914102393895392",
            "stableRateSlope1": "100000000000000000000000000",
            "stableRateSlope2": "3000000000000000000000000000",
            "symbol": "WBTC",
            "totalCurrentVariableDebt": "39239027030",
            "totalLiquidity": "541752565245",
            "totalLiquidityAsCollateral": "457199235819",
            "totalPrincipalStableDebt": "3483986745",
            "totalScaledVariableDebt": "39128495053",
            "utilizationRate": "0.07878515",
            "variableBorrowRate": "9718371393531281915116314",
            "variableRateSlope1": "80000000000000000000000000",
            "variableRateSlope2": "3000000000000000000000000000"
        },
        {
            "availableLiquidity": "6380402156873500224096148",
            "averageStableRate": "12849128805907208891557074",
            "lifetimeCurrentVariableDebt": "3469327253230166919065688",
            "lifetimeDepositorsInterestEarned": "1742100415501910625029",
            "lifetimeFlashLoanPremium": "10150925060553953415",
            "lifetimePrincipalStableDebt": "2523506913785956643272854",
            "lifetimeReserveFactorAccrued": "435815318313191705278",
            "lifetimeScaledVariableDebt": "3461404235772096977911262",
            "name": "Republic Token",
            "reserveFactor": "2000",
            "stableBorrowRate": "37259037164585732225873844",
            "stableRateSlope1": "100000000000000000000000000",
            "stableRateSlope2": "3000000000000000000000000000",
            "symbol": "REN",
            "totalCurrentVariableDebt": "723940759172788151405",
            "totalLiquidity": "7663667017956422233405617",
            "totalLiquidityAsCollateral": "-2065181411267808585296913",
            "totalPrincipalStableDebt": "1284546062738943839283367",
            "totalScaledVariableDebt": "722287471703814443916",
            "utilizationRate": "0.16744788",
            "variableBorrowRate": "26081326015210012558111691",
            "variableRateSlope1": "70000000000000000000000000",
            "variableRateSlope2": "3000000000000000000000000000"
        },
        {
            "availableLiquidity": "1226382946041792007602144",
            "averageStableRate": "0",
            "lifetimeCurrentVariableDebt": "35377660157675896517511083",
            "lifetimeDepositorsInterestEarned": "57976228897194866917242",
            "lifetimeFlashLoanPremium": "1826608386828290662452",
            "lifetimePrincipalStableDebt": "0",
            "lifetimeReserveFactorAccrued": "6446040804625944080925",
            "lifetimeScaledVariableDebt": "34789964360014420223831650",
            "name": "Binance USD",
            "reserveFactor": "1000",
            "stableBorrowRate": "0",
            "stableRateSlope1": "0",
            "stableRateSlope2": "0",
            "symbol": "BUSD",
            "totalCurrentVariableDebt": "5772261224659793034234747",
            "totalLiquidity": "6932357154268497310365750",
            "totalLiquidityAsCollateral": "245630945513869401643945",
            "totalPrincipalStableDebt": "0",
            "totalScaledVariableDebt": "5676372077395179155846536",
            "utilizationRate": "0.82309632",
            "variableBorrowRate": "164910419137886749371263650",
            "variableRateSlope1": "40000000000000000000000000",
            "variableRateSlope2": "1000000000000000000000000000"
        },
        {
            "availableLiquidity": "6599439514103863883485439",
            "averageStableRate": "33258708166535156342463290",
            "lifetimeCurrentVariableDebt": "1391571046770006903564072",
            "lifetimeDepositorsInterestEarned": "142327821516256428369",
            "lifetimeFlashLoanPremium": "70063677863298471358",
            "lifetimePrincipalStableDebt": "262339556082657321740275",
            "lifetimeReserveFactorAccrued": "35665531312269197741",
            "lifetimeScaledVariableDebt": "1390766687965808199685202",
            "name": "ChainLink Token",
            "reserveFactor": "2000",
            "stableBorrowRate": "35136982371120292782033986",
            "stableRateSlope1": "100000000000000000000000000",
            "stableRateSlope2": "3000000000000000000000000000",
            "symbol": "LINK",
            "totalCurrentVariableDebt": "139383343811069557034228",
            "totalLiquidity": "6755404821876764418804646",
            "totalLiquidityAsCollateral": "3018116093863046301062746",
            "totalPrincipalStableDebt": "16780062270455202377018",
            "totalScaledVariableDebt": "139302257301166801641191",
            "utilizationRate": "0.02308748",
            "variableBorrowRate": "3595887659784204947423789",
            "variableRateSlope1": "70000000000000000000000000",
            "variableRateSlope2": "3000000000000000000000000000"
        },
        {
            "availableLiquidity": "490969985524658122353988",
            "averageStableRate": "0",
            "lifetimeCurrentVariableDebt": "11708159043074477878628860",
            "lifetimeDepositorsInterestEarned": "27023492339502522237413",
            "lifetimeFlashLoanPremium": "681214316539259143525",
            "lifetimePrincipalStableDebt": "0",
            "lifetimeReserveFactorAccrued": "6760257920879973934466",
            "lifetimeScaledVariableDebt": "11412851380539253286532657",
            "name": "Synth sUSD",
            "reserveFactor": "2000",
            "stableBorrowRate": "0",
            "stableRateSlope1": "0",
            "stableRateSlope2": "0",
            "symbol": "SUSD",
            "totalCurrentVariableDebt": "3625146168406261636946755",
            "totalLiquidity": "4081843082476186915142430",
            "totalLiquidityAsCollateral": "338966416888734322160043",
            "totalPrincipalStableDebt": "0",
            "totalScaledVariableDebt": "3532048174673676619821587",
            "utilizationRate": "0.87971855",
            "variableBorrowRate": "444173136454072789883157100",
            "variableRateSlope1": "40000000000000000000000000",
            "variableRateSlope2": "1000000000000000000000000000"
        },
        {
            "availableLiquidity": "11486440488826908234768104",
            "averageStableRate": "95994468430619039033598848",
            "lifetimeCurrentVariableDebt": "81244812491427339571484561",
            "lifetimeDepositorsInterestEarned": "235510219377033295570088",
            "lifetimeFlashLoanPremium": "7094827306743981404612",
            "lifetimePrincipalStableDebt": "64752475026761608156066915",
            "lifetimeReserveFactorAccrued": "26171254012232158539386",
            "lifetimeScaledVariableDebt": "79519871415322695586561631",
            "name": "Dai Stablecoin",
            "reserveFactor": "1000",
            "stableBorrowRate": "89888810696867587297141284",
            "stableRateSlope1": "20000000000000000000000000",
            "stableRateSlope2": "750000000000000000000000000",
            "symbol": "DAI",
            "totalCurrentVariableDebt": "16621199470633464806756521",
            "totalLiquidity": "55952264771975133011735578",
            "totalLiquidityAsCollateral": "35417399979107137198006890",
            "totalPrincipalStableDebt": "28029789488745748801522045",
            "totalScaledVariableDebt": "16268308143521968977436025",
            "utilizationRate": "0.79470999",
            "variableBorrowRate": "39777621393735174594282569",
            "variableRateSlope1": "40000000000000000000000000",
            "variableRateSlope2": "750000000000000000000000000"
        },
        {
            "availableLiquidity": "197623650149238589466466",
            "averageStableRate": "0",
            "lifetimeCurrentVariableDebt": "60000000000000000",
            "lifetimeDepositorsInterestEarned": "0",
            "lifetimeFlashLoanPremium": "3965022794296015259",
            "lifetimePrincipalStableDebt": "0",
            "lifetimeReserveFactorAccrued": "0",
            "lifetimeScaledVariableDebt": "60000000000000000",
            "name": "Aave Token",
            "reserveFactor": "0",
            "stableBorrowRate": "0",
            "stableRateSlope1": "0",
            "stableRateSlope2": "0",
            "symbol": "AAVE",
            "totalCurrentVariableDebt": "0",
            "totalLiquidity": "197619685126444293451207",
            "totalLiquidityAsCollateral": "90331644614157174548235",
            "totalPrincipalStableDebt": "0",
            "totalScaledVariableDebt": "0",
            "utilizationRate": "-0.00002006",
            "variableBorrowRate": "0",
            "variableRateSlope1": "0",
            "variableRateSlope2": "0"
        },
        {
            "availableLiquidity": "2236077000775329086065",
            "averageStableRate": "50519088814363734086605490",
            "lifetimeCurrentVariableDebt": "1256429419722161746800",
            "lifetimeDepositorsInterestEarned": "549711284478908778",
            "lifetimeFlashLoanPremium": "216958506557453912",
            "lifetimePrincipalStableDebt": "237751583407854447450",
            "lifetimeReserveFactorAccrued": "137519120422515892",
            "lifetimeScaledVariableDebt": "1251112255782340636800",
            "name": "Maker",
            "reserveFactor": "2000",
            "stableBorrowRate": "35909762142188354861667572",
            "stableRateSlope1": "100000000000000000000000000",
            "stableRateSlope2": "3000000000000000000000000000",
            "symbol": "MKR",
            "totalCurrentVariableDebt": "61080753134329062517",
            "totalLiquidity": "2296366463140223519880",
            "totalLiquidityAsCollateral": "915776400153669818850",
            "totalPrincipalStableDebt": "4436622090371123",
            "totalScaledVariableDebt": "60822261592436650789",
            "utilizationRate": "0.02625428",
            "variableBorrowRate": "4136833499531848403167300",
            "variableRateSlope1": "70000000000000000000000000",
            "variableRateSlope2": "3000000000000000000000000000"
        },
        {
            "availableLiquidity": "13663105488948",
            "averageStableRate": "90642577897570904442516372",
            "lifetimeCurrentVariableDebt": "133140674630981",
            "lifetimeDepositorsInterestEarned": "351945421520",
            "lifetimeFlashLoanPremium": "13151770464",
            "lifetimePrincipalStableDebt": "115427685772796",
            "lifetimeReserveFactorAccrued": "38388642505",
            "lifetimeScaledVariableDebt": "130582664057346",
            "name": "USD Coin",
            "reserveFactor": "1000",
            "stableBorrowRate": "89162336598454197145918620",
            "stableRateSlope1": "20000000000000000000000000",
            "stableRateSlope2": "600000000000000000000000000",
            "symbol": "USDC",
            "totalCurrentVariableDebt": "25350748637641",
            "totalLiquidity": "92621150515907",
            "totalLiquidityAsCollateral": "84461899396082",
            "totalPrincipalStableDebt": "53874873939076",
            "totalScaledVariableDebt": "24863688742200",
            "utilizationRate": "0.85248395",
            "variableBorrowRate": "38324673196908394291837240",
            "variableRateSlope1": "40000000000000000000000000",
            "variableRateSlope2": "600000000000000000000000000"
        },
        {
            "availableLiquidity": "5600847997277",
            "averageStableRate": "93927265315560947126924933",
            "lifetimeCurrentVariableDebt": "80322806759419",
            "lifetimeDepositorsInterestEarned": "249393341575",
            "lifetimeFlashLoanPremium": "4865914550",
            "lifetimePrincipalStableDebt": "43234084955432",
            "lifetimeReserveFactorAccrued": "27716987845",
            "lifetimeScaledVariableDebt": "77949891987328",
            "name": "Tether USD",
            "reserveFactor": "1000",
            "stableBorrowRate": "89560484737614516102834566",
            "stableRateSlope1": "20000000000000000000000000",
            "stableRateSlope2": "600000000000000000000000000",
            "symbol": "USDT",
            "totalCurrentVariableDebt": "17118946613642",
            "totalLiquidity": "46499541035758",
            "totalLiquidityAsCollateral": "11342176012824",
            "totalPrincipalStableDebt": "24009099615849",
            "totalScaledVariableDebt": "16612875814496",
            "utilizationRate": "0.87955046",
            "variableBorrowRate": "39120969475229032205669132",
            "variableRateSlope1": "40000000000000000000000000",
            "variableRateSlope2": "600000000000000000000000000"
        }
        ]
    }
};

export function getInstantPoolDepositAPY(reserve) {
    let decimals = reserve.decimals;
    console.log(reserve.symbol);
    console.log('# decimals:', reserve.decimals);
    console.log('utilizationRate: ', reserve.utilizationRate);
    console.log('averageStableRate: ', getDecimal(reserve.averageStableRate, 27));
    console.log('totalPrincipalStableDebt: ', getDecimal(reserve.totalPrincipalStableDebt, decimals));
    console.log('variableBorrowRate: ', getDecimal(reserve.variableBorrowRate, 27));
    console.log('totalCurrentVariableDebt: ', getDecimal(reserve.totalCurrentVariableDebt, decimals));
    console.log('reserveFactor: ', getDecimal(reserve.reserveFactor, 4));

    
    let totalDebt = getDecimal(reserve.totalCurrentVariableDebt, decimals) + getDecimal(reserve.totalPrincipalStableDebt, decimals) 
    let shareStableBorrows = getDecimal(reserve.totalPrincipalStableDebt, decimals) / totalDebt
    console.log('V2shareStableBorrows: ', shareStableBorrows)
    let shareVariableBorrows = getDecimal(reserve.totalCurrentVariableDebt, decimals) /totalDebt
    console.log('V2shareVariableBorrows: ', shareVariableBorrows) 

    let apy = BigNumber(reserve.utilizationRate) *
            (
                shareStableBorrows * getDecimal(reserve.averageStableRate, 27)
                + shareVariableBorrows * getDecimal(reserve.variableBorrowRate, 27)
            )
            * (1 - getDecimal(reserve.reserveFactor, 4));
    return apy
}

export function getAverageRate(liquidityIndexEarliest, liquidityIndexLatest, timestampEarliest, timestampLatest) {
    let averageRate = calculateAverageRate(
        liquidityIndexEarliest,
        liquidityIndexLatest,
        timestampEarliest,
        timestampLatest
    );
    return averageRate
}

export function getDecimal(number, precision) {
    let result = BigNumber(number) / BigNumber(10) ** BigNumber(precision);
    return result
}

export function formatAsPercent(decimal) {
    return parseFloat(decimal*100).toFixed(2) + "%"
}

export function formatGraphData(paramsHistory, deposit) {
    invariant(typeof deposit === "number", "expected deposit to be a number");
    //let subset = paramsHistory.filter(); //filter to take only 1st entry of the day
    ///call getAverageRate on each pair of items
    let interests  = [];
    let graphData = [];

    interests[0] = 0;

    graphData[0] = {
        day: paramsHistory[0].timestamp, 
        Principle: deposit, 
        Borrowed: null,
        Interest: interests[0],
        InterestUsd: interests[0],
        OwedInterest: null,
        OwedInterestUsd: null,
        Rate: formatAsPercent(0),
        RateBorrowed: null
    }
    //get rid of duplicates
    let filtered = uniqBy(paramsHistory, "timestamp");
    console.log("Reduced array from ", paramsHistory.length, " to ", filtered.length);

    

    let i;
    for (i = 0; i < filtered.length-1; i++) {
        const averageRate = getAverageRate(
            filtered[i].liquidityIndex, 
            filtered[i+1].liquidityIndex,
            filtered[i].timestamp, 
            filtered[i+1].timestamp
        );
        const interest = (deposit + interests[i]) * averageRate * (filtered[i+1].timestamp - filtered[i].timestamp) / (365 * 24 * 60 * 60);
        interests[i+1] = interests[i]+ interest;

        const interestUsd = interests[i+1] * filtered[i+1].priceInUsd;

        graphData[i+1] = {
            day: filtered[i+1].timestamp, 
            Principle: deposit,
            Borrowed: null,
            Interest: interests[i+1],
            InterestUsd: interestUsd,
            OwedInterest: null,
            OwedInterestUsd: null,
            Rate: parseFloat(averageRate*100).toFixed(2),
            RateBorrowed: null
        }
    }

    return graphData;

}

export function formatGraphDataVariableBorrowed(paramsHistory, deposit) {
    invariant(typeof deposit === "number", "expected deposit to be a number");
    //let subset = paramsHistory.filter(); //filter to take only 1st entry of the day
    ///call getAverageRate on each pair of items
    let interests  = [];
    let graphData = [];

    interests[0] = 0;

    graphData[0] = {
        day: paramsHistory[0].timestamp, 
        Principle: null, 
        Borrowed: deposit,
        Interest: null,
        InterestUsd: null,
        OwedInterest: interests[0],
        OwedInterestUsd: interests[0],
        Rate: null,
        RateBorrowed: formatAsPercent(0),
    }
    //get rid of duplicates
    let filtered = uniqBy(paramsHistory, "timestamp");
    console.log("Reduced array from ", paramsHistory.length, " to ", filtered.length);

    let i;
    for (i = 0; i < filtered.length-1; i++) {
        const averageRate = getAverageRate(
            filtered[i].variableBorrowIndex, 
            filtered[i+1].variableBorrowIndex,
            filtered[i].timestamp, 
            filtered[i+1].timestamp
        );
        const interest = (deposit + interests[i]) * averageRate * (filtered[i+1].timestamp - filtered[i].timestamp) / (365 * 24 * 60 * 60);
        interests[i+1] = interests[i]+ interest;

        const interestUsd = interests[i+1] * filtered[i+1].priceInUsd;

        graphData[i+1] = {
            day: filtered[i+1].timestamp, 
            Principle: null,
            Borrowed: deposit,
            Interest: null,
            InterestUsd: null,
            OwedInterest: interests[i+1],
            OwedInterestUsd: interestUsd,
            Rate: null,
            RateBorrowed: parseFloat(averageRate*100).toFixed(2),
        }
    }

    return graphData;

}