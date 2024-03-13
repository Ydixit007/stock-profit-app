import axios from "axios";

// export const getStockData = async (stockName: string) => {
//   const url = `https://query1.finance.yahoo.com/v8/finance/chart/TATAMOTORS.NS?region=in&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1M&corsDomain=finance.yahoo.com&.tsrc=finance`;
//   try {
//     const response = await axios.get(url); // Replace with your API URL
//     const data = response.data;
//     // Use the fetched data here
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//     // Handle errors appropriately, e.g., display an error message or retry the request
//   }
// };

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
