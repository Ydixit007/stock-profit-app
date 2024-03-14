import axios from "axios";

export const getStockData = async (stockSymbol: string) => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stockSymbol}?region=in&lang=en-US&includePrePost=false&interval=1d&useYfid=true&range=1mo&corsDomain=finance.yahoo.com&.tsrc=finance`;
  try {
    const response = await axios.get(url); // Replace with your API URL
    const data = response.data;
    // Use the fetched data here
    console.log(data.chart.result[0])
    return data.chart.result[0];
  } catch (error) {
    console.error(error);
    // Handle errors appropriately, e.g., display an error message or retry the request
  }
};

export const getStockName = async (query: string) => {
  if (query !== "") {
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${query}`;
    try {
      const response = await axios.get(url); // Replace with your API URL
      const data = response.data.quotes || [];
      return data;
    } catch (error) {
      console.error(error);
    }
  }
};
