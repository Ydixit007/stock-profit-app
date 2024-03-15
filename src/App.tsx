import "./App.css";
import { Card } from "./components/ui/card";
import SearchInput from "./components/custom/SearchInput";
import { useEffect, useState } from "react";
import { getStockData } from "./services/appServices";
import { StockData } from "./types";
import { DatePicker } from "./components/custom/Calender";
import { Input } from "./components/ui/input";
function App() {
  const [currentStock, setCurrentStock] = useState({
    stockName: "",
    stockSymbol: "",
  });
  const [currentStockData, setCurrentStockData] = useState<StockData>();
  const [buyDate, setBuyDate] = useState<Date>();
  const [sellDate, setSellDate] = useState<Date>();
  const [buyIndex, setBuyIndex] = useState<number>();
  const [sellIndex, setSellIndex] = useState<number>();
  const [quantity, setQuantity] = useState<number>(20);
  const [profit, setProfit] = useState<number>(0);

  const initDate = new Date();
  initDate.setDate(initDate.getDate() - 30);
  initDate.setHours(9, 15, 0, 0);

  const setData = async () => {
    if (currentStock.stockSymbol !== "") {
      setCurrentStockData(await getStockData(currentStock.stockSymbol));
    }
  };

  const getTimestampFromDate = (date: Date): number => {
    return Math.floor(date.getTime() / 1000);
  };

  useEffect(() => {
    setData();
  }, [currentStock]);

  const convertDateToCorrectTimestamp = (date: Date | undefined) => {
    date?.setHours(9, 15, 0, 0);
  };

  useEffect(() => {
    const today = new Date();
    convertDateToCorrectTimestamp(buyDate);
    convertDateToCorrectTimestamp(today);
    setBuyIndex(
      currentStockData?.timestamp.indexOf(
        getTimestampFromDate(buyDate || today)
      )
    );
    setSellDate(undefined);
  }, [buyDate]);

  useEffect(() => {
    const today = new Date();
    convertDateToCorrectTimestamp(sellDate);
    convertDateToCorrectTimestamp(today);
    setSellIndex(
      currentStockData?.timestamp.indexOf(
        getTimestampFromDate(sellDate || today)
      )
    );
  }, [sellDate]);

  useEffect(() => {
    if (
      buyIndex !== undefined &&
      sellIndex !== undefined &&
      currentStockData !== undefined &&
      buyIndex >= 0 &&
      sellIndex >= 0
    ) {
      setProfit(
        (currentStockData.indicators.quote[0].high[sellIndex] -
          currentStockData.indicators.quote[0].low[buyIndex]) *
          quantity
      );
    }
  }, [buyIndex, sellIndex, quantity]);

  return (
    <div className="h-[100svh] w-full py-6 flex justify-center items-center">
      <Card className="h-full w-full max-sm:border-none max-w-[356px] px-4 py-4 flex flex-col gap-2 items-center relative">
        <div className="heading w-full flex justify-between items-center px-4 border-border border-b-[1px] pb-2">
          <h1 className="text-lg font-medium">Swing Profit</h1>
          <SearchInput setCurrentStock={setCurrentStock} />
        </div>
        {!currentStockData && (
          <div className="w-full h-full flex justify-center items-center">
            Search for a stock to start!
          </div>
        )}
        {currentStockData && (
          <div className="stock-data w-full mt-4 px-4">
            <div className="headings flex justify-between items-center">
              <div className="name">
                <h1 className="text-lg font-semibold">
                  {currentStock.stockName}
                </h1>
                <p className={`text-xs text-primary text-center`}>
                  {currentStockData.meta.symbol}
                </p>
              </div>
              <div className="price">
                <h1
                  className={`text-lg font-semibold ${
                    currentStockData.meta.regularMarketPrice >
                    currentStockData.meta.chartPreviousClose
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {currentStockData.meta.regularMarketPrice}
                </h1>
                <p className="text-xs text-primary text-center">
                  {currentStockData.meta.currency}
                </p>
              </div>
            </div>
            <div className="details w-full  bg-accent divide-x-2 divide-gray-600 filter mt-6 rounded flex justify-between items-center py-2 mb-4 text-center">
              <div className="yesterday flex flex-col gap-1 w-full">
                <p className="text-xs opacity-75 text-center capitalize">
                  prev
                </p>
                <h3 className="text-sm text-center">
                  {currentStockData.meta.chartPreviousClose.toFixed(2)}
                </h3>
              </div>
              <div className="open flex flex-col gap-1 w-full">
                <p className="text-xs opacity-75 text-center capitalize">
                  open
                </p>
                <h3 className="text-sm text-center">
                  {currentStockData.indicators.quote[0].open[
                    currentStockData.indicators.quote[0].open.length - 1
                  ].toFixed(2)}
                </h3>
              </div>
              <div className="low flex flex-col gap-1 w-full">
                <p className="text-xs opacity-75 text-center capitalize">low</p>
                <h3 className="text-sm text-center">
                  {currentStockData.indicators.quote[0].low[
                    currentStockData.indicators.quote[0].low.length - 1
                  ].toFixed(2)}
                </h3>
              </div>
              <div className="high flex flex-col gap-1 w-full">
                <p className="text-xs opacity-75 text-center capitalize">
                  high
                </p>
                <h3 className="text-sm text-center">
                  {currentStockData.indicators.quote[0].high[
                    currentStockData.indicators.quote[0].high.length - 1
                  ].toFixed(2)}
                </h3>
              </div>
            </div>
            <div className="profit border-border border-t-[1px] flex flex-col">
              <h1 className="mt-2 text-sm text-gray-400 capitalize">
                calculate profit
              </h1>
              <p className="text-gray-600 text-[0.65rem]">
                Select a buy date and a sell date to calculate the profit.
              </p>
              <div className="date-picker flex flex-col gap-2 mt-2 mb-4">
                <DatePicker
                  date={buyDate}
                  setDate={setBuyDate}
                  initDate={initDate}
                  label="select buy date"
                />
                {buyDate && (
                  <DatePicker
                    date={sellDate}
                    setDate={setSellDate}
                    initDate={buyDate || initDate}
                    label="select sell date"
                  />
                )}
                <Input
                  className="mr-4"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    if (Number(e.currentTarget.value) >= 0) {
                      setQuantity(Number(e.currentTarget.value));
                    }
                  }}
                  placeholder="Quantity"
                />
              </div>
              {sellDate && buyDate && (
                <div className="profit-analysis border-border border-t-[1px] py-2">
                  <h3 className="mt-2 text-sm capitalize">profit analysis</h3>
                  <p className="text-gray-600 text-[0.65rem]">
                    Select a buy date and a sell date to calculate the profit.
                  </p>
                  <div className="profits mt-2">
                    <h2
                      className={`${
                        profit > 0 ? "text-green-500" : "text-red-500"
                      } text-lg font-medium`}
                    >
                      Total {profit > 0 ? "profit" : "loss"} :{" "}
                      {profit.toFixed(2)}
                    </h2>
                    {buyIndex && <p className="text-xs text-gray-400">on an investment of {currentStockData.meta.currency} {(currentStockData.indicators.quote[0].low[buyIndex]* quantity).toFixed(2)}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default App;
