import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { InvestmentLogo, investmentLogos } from './investment-logos';

interface Investment {
  symbol: keyof typeof investmentLogos;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  error?: boolean;
  performance?: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  aiSentiment?: {
    score: number; // 0 to 100
    summary: string;
    factors: string[];
    recommendation: 'buy' | 'sell' | 'hold';
  };
}

interface InvestmentAnalysisProps {
  investments: Investment[];
}

export function InvestmentAnalysis({ investments }: InvestmentAnalysisProps) {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  if (!investments || investments.length === 0) {
    return <div className="text-muted-foreground">No investment data available</div>;
  }

  const getSentimentColor = (score?: number) => {
    if (!score) {return 'text-muted-foreground';}
    if (score >= 70) {return 'text-green-500';}
    if (score >= 40) {return 'text-yellow-500';}
    return 'text-red-500';
  };

  const getPerformanceIndicator = (value?: number) => {
    if (typeof value !== 'number') {return <span className="text-muted-foreground">N/A</span>;}
    const color = value >= 0 ? 'text-green-500' : 'text-red-500';
    const arrow = value >= 0 ? '↑' : '↓';
    return (
      <span className={color}>
        {arrow} {Math.abs(value).toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {investments.map((investment) => (
          <Card
            key={investment.symbol}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedInvestment?.symbol === investment.symbol
                ? 'ring-2 ring-primary'
                : ''
            }`}
            onClick={() => setSelectedInvestment(investment)}
          >
            <div className="flex items-center space-x-3">
              <InvestmentLogo symbol={investment.symbol} size={32} />
              <div>
                <h3 className="font-semibold">{investment.symbol}</h3>
                <p className="text-sm text-muted-foreground">
                  {investmentLogos[investment.symbol].name}
                </p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Price</p>
                <p className="font-medium">${investment.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Change</p>
                <p>{getPerformanceIndicator(investment.changePercent)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Volume</p>
                <p>{investment.volume.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Market Cap</p>
                <p>${(investment.marketCap / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedInvestment && (
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <InvestmentLogo symbol={selectedInvestment.symbol} size={48} />
            <div>
              <h2 className="text-2xl font-bold">
                {investmentLogos[selectedInvestment.symbol].name}
              </h2>
              <p className="text-muted-foreground">
                {selectedInvestment.symbol} • 
                ${selectedInvestment.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Market Data</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>${selectedInvestment.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Change</span>
                  {getPerformanceIndicator(selectedInvestment.changePercent)}
                </div>
                <div className="flex justify-between">
                  <span>Volume</span>
                  <span>{selectedInvestment.volume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Cap</span>
                  <span>${(selectedInvestment.marketCap / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            </div>

            {selectedInvestment.aiSentiment && (
              <div>
                <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground mb-2">Sentiment Score</p>
                    <p className={`text-2xl font-bold ${getSentimentColor(selectedInvestment.aiSentiment.score)}`}>
                      {selectedInvestment.aiSentiment.score}/100
                    </p>
                  </div>
                  {selectedInvestment.aiSentiment.summary && (
                    <div>
                      <p className="text-muted-foreground mb-2">Summary</p>
                      <p>{selectedInvestment.aiSentiment.summary}</p>
                    </div>
                  )}
                  {selectedInvestment.aiSentiment.factors && (
                    <div>
                      <p className="text-muted-foreground mb-2">Key Factors</p>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedInvestment.aiSentiment.factors.map((factor, index) => (
                          <li key={index}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedInvestment.aiSentiment.recommendation && (
                    <div>
                      <p className="text-muted-foreground mb-2">AI Recommendation</p>
                      <p className="font-semibold capitalize">
                        {selectedInvestment.aiSentiment.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}