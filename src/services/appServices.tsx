import axios from "axios";

export const getStockData = async (stockSymbol: string) => {
  const crosUrl = `https://api.allorigins.win/get?url=`;
  const url = `${crosUrl}${encodeURIComponent(
    `https://query1.finance.yahoo.com/v8/finance/chart/${stockSymbol}?region=in&lang=en-US&includePrePost=false&interval=1d&useYfid=true&range=1mo&corsDomain=finance.yahoo.com&.tsrc=finance`
  )}`;
  try {
    const res = await axios.get(url);
    const response = JSON.parse(res.data.contents);
    return response.chart.result[0];
  } catch (error) {
    console.error(error);
  }
};

export const getStockName = async (query: string) => {
  if (query !== "") {
    const crosUrl = `https://api.allorigins.win/get?url=`;
    const url = `${crosUrl}${encodeURIComponent(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${query}`
    )}`;
    try {
      const res = await axios.get(url); // Replace with your API URL
      const response = JSON.parse(res.data.contents);
      const data = response.quotes || [];
      return data;
    } catch (error) {
      console.error(error);
    }
  }
};
