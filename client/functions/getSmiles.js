import fetch from "node-fetch";
import axios from "axios";
export async function handler(event, context) {
    const getUserStocks = async () => {
        let userStocksMap = new Map(),
            resData;

        await axios.post(
            "https://smileystocks.onrender.com/api/login/validate",
            { username: "OmarA" }
        );
        await fetch("https://smileystocks.onrender.com/api/dashboard/getstocks")
            .then((response) => response.json())
            .then((json) => (resData = json.stocks));

        for (let x = 0; x < resData.length; x++) {
            let stock = resData[x];
            userStocksMap.set(Object.keys(stock), Object.values(stock));
        }

        let userDataArray = Array.from([...userStocksMap.entries()]);
        userDataArray.sort();

        return { userDataArray };
    };

    const getSmiles = async () => {
        let userData = await getUserStocks(),
            userDataArray = userData.userDataArray,
            currentPrice,
            symbolsQueried = new Map(),
            smiles = [],
            smileWorth = 10;

        for (let x = 0; x < userDataArray.length; x++) {
            let symbol = userDataArray[x][0].toString();
            let btPrice = userDataArray[x][1];
            if (symbolsQueried.has(symbol)) {
                currentPrice = symbolsQueried.get(symbol);
            } else {
                currentPrice = await getCurrentPrice(symbol);
                symbolsQueried.set(symbol, currentPrice);
            }

            let deltaPrice = currentPrice - btPrice;

            for (let i = 0; i < Math.abs(deltaPrice) / smileWorth; i++) {
                if (deltaPrice > 0) {
                    if (smiles[smiles.length - 1] === "(") smiles.pop();
                    else smiles.push(")");
                } else if (deltaPrice < 0)
                    if (smiles[smiles.length - 1] === ")") smiles.pop();
                    else smiles.push("(");
            }
        }

        if (smiles.length === 0) {
            return "Add some symbols to get started!";
        }
        return ":" + smiles.join("");
    };

    const getCurrentPrice = async (symb) => {
        let currentPrice;
        await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symb}&token=${process.env.REACT_APP_FINNHUB_TOKEN}`
        )
            .then((response) => response.json())
            .then((json) => (currentPrice = json.c));

        return currentPrice;
    };

    const smiles = await getSmiles();

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: smiles }),
    };
}
