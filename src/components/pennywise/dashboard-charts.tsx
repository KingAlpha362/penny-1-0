import { Card } from '@/components/ui/card';
import { SpendingPattern, DrilldownChart } from './advanced-charts';

const MOCK_PATTERN_DATA = [
  {
    category: 'Food',
    thisMonth: 500,
    lastMonth: 450,
    average: 475,
  },
  {
    category: 'Transportation',
    thisMonth: 200,
    lastMonth: 180,
    average: 190,
  },
  {
    category: 'Entertainment',
    thisMonth: 300,
    lastMonth: 350,
    average: 325,
  },
  {
    category: 'Shopping',
    thisMonth: 400,
    lastMonth: 420,
    average: 410,
  },
  {
    category: 'Utilities',
    thisMonth: 250,
    lastMonth: 240,
    average: 245,
  },
];

const MOCK_DRILLDOWN_DATA = [
  {
    category: 'Food',
    amount: 500,
    details: [
      { name: 'Groceries', amount: 300 },
      { name: 'Restaurants', amount: 150 },
      { name: 'Coffee', amount: 50 },
    ],
  },
  {
    category: 'Transportation',
    amount: 200,
    details: [
      { name: 'Gas', amount: 120 },
      { name: 'Public Transit', amount: 50 },
      { name: 'Maintenance', amount: 30 },
    ],
  },
  // Add more categories as needed
];

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Spending Analysis</h3>
        <SpendingPattern data={MOCK_PATTERN_DATA} />
      </Card>
      
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Category Breakdown</h3>
        <DrilldownChart data={MOCK_DRILLDOWN_DATA} />
      </Card>
    </div>
  );
}