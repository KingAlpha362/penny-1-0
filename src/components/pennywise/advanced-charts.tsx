import { Radar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Register all required chart components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

interface SpendingPatternProps {
  data: {
    category: string;
    thisMonth: number;
    lastMonth: number;
    average: number;
  }[];
}

interface DrilldownChartProps {
  data: {
    category: string;
    amount: number;
    details: {
      name: string;
      amount: number;
    }[];
  }[];
}

export function SpendingPattern({ data }: SpendingPatternProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Spending Patterns Analysis',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.raw}`,
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          callback: function(tickValue: number | string) {
            return typeof tickValue === 'number' ? `$${tickValue}` : tickValue;
          },
        },
        grid: {
          circular: true,
        },
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 12,
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.3,
      },
      point: {
        borderWidth: 2,
        radius: 3,
        hoverRadius: 6,
      },
    },
  };

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'This Month',
        data: data.map(item => item.thisMonth),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Last Month',
        data: data.map(item => item.lastMonth),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: '6-Month Average',
        data: data.map(item => item.average),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  return (
    <div className="h-[400px] w-full">
      <Radar data={chartData} options={options} />
    </div>
  );
}

export function DrilldownChart({ data }: DrilldownChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Spending Breakdown',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedCategory(data[index].category);
        setIsDialogOpen(true);
      }
    },
  };

  const mainChartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const selectedData = data.find(item => item.category === selectedCategory);

  const detailChartData = selectedData ? {
    labels: selectedData.details.map(item => item.name),
    datasets: [
      {
        data: selectedData.details.map(item => item.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  } : null;

  return (
    <>
      <div className="relative h-[400px] w-full">
        <Doughnut data={mainChartData} options={options} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCategory} Breakdown</DialogTitle>
          </DialogHeader>
          {detailChartData && (
            <div className="p-4 h-[300px] w-full">
              <Doughnut data={detailChartData} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}