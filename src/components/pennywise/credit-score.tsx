import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { financialApi } from '@/services/financial-api';
import { LineChart } from './line-chart';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

export function CreditScore() {
  const { user } = useUser();
  const [creditData, setCreditData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreditScore = async () => {
      if (!user?.uid) {return;}
      try {
        const data = await financialApi.getCreditScore(user.uid);
        setCreditData(data);
      } catch (error) {
        console.error('Error fetching credit score:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditScore();
  }, [user?.uid]);

  const getScoreColor = (score: number) => {
    if (score >= 740) {return 'text-green-500';}
    if (score >= 670) {return 'text-yellow-500';}
    return 'text-red-500';
  };

  const getScoreRange = (score: number) => {
    if (score >= 740) {return 'Excellent';}
    if (score >= 670) {return 'Good';}
    if (score >= 580) {return 'Fair';}
    return 'Poor';
  };

  const getProgressValue = (score: number) => {
    return (score / 850) * 100;
  };

  if (loading) {
    return (
      <Card className="p-6 space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse w-1/3" />
        <div className="h-24 bg-muted rounded animate-pulse" />
        <div className="h-12 bg-muted rounded animate-pulse" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold">Credit Score</h3>
            <p className="text-muted-foreground">
              Updated {new Date(creditData.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-center mb-4">
              <div className={`text-5xl font-bold ${getScoreColor(creditData.score)}`}>
                {creditData.score}
              </div>
              <div className="text-lg font-medium mt-2">
                {getScoreRange(creditData.score)}
              </div>
            </div>
            <Progress value={getProgressValue(creditData.score)} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>300</span>
              <span>850</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Key Factors</h4>
            {creditData.factors.map((factor: any, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                {factor.impact === 'positive' ? (
                  <TrendingUp className="h-5 w-5 text-green-500 mt-1" />
                ) : factor.impact === 'negative' ? (
                  <TrendingDown className="h-5 w-5 text-red-500 mt-1" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                )}
                <div>
                  <div className="font-medium">{factor.factor}</div>
                  <div className="text-sm text-muted-foreground">
                    {factor.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <Tabs defaultValue="history">
          <TabsList>
            <TabsTrigger value="history">Score History</TabsTrigger>
            <TabsTrigger value="comparison">Credit Mix</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="pt-4">
            <div className="h-[300px]">
              <LineChart
                data={{
                  labels: creditData.history.map((h: any) => 
                    new Date(h.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
                  ),
                  datasets: [
                    {
                      label: 'Credit Score',
                      data: creditData.history.map((h: any) => h.score),
                      borderColor: 'rgb(75, 192, 192)',
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      min: 300,
                      max: 850,
                    },
                  },
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="comparison">
            {/* Add credit mix analysis here */}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}