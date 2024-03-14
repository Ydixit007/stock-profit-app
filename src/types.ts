export type StockData = {
    meta: {
      currency: string;
      symbol: string;
      exchangeName: string;
      instrumentType: string;
      firstTradeDate: number;
      regularMarketTime: number;
      hasPrePostMarketData: boolean;
      gmtoffset: number;
      timezone: string;
      exchangeTimezoneName: string;
      regularMarketPrice: number;
      chartPreviousClose: number;
      priceHint: number;
      currentTradingPeriod: {
        pre: {
          timezone: string;
          start: number;
          end: number;
          gmtoffset: number;
        };
        regular: {
          timezone: string;
          start: number;
          end: number;
          gmtoffset: number;
        };
        post: {
          timezone: string;
          start: number;
          end: number;
          gmtoffset: number;
        };
      };
      dataGranularity: string;
      range: string;
      validRanges: string[];
    };
    timestamp: number[];
    indicators: {
      quote: [{
        open: number[];
        low: number[];
        high: number[];
        close: number[];
        volume: number[];
      }];
    };
  };