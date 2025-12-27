import { useEffect, useState } from "react";
import supabase from "../supabase-client.ts";
import { Chart } from "react-charts";

function Dashboard() {
  const [matrics, setMatrics] = useState<{ name: string; sum: number }[]>([]);
  const fetchMatrics = async () => {
    try {
      const { data, error } = await supabase
        .from("sales_deals")
        .select(`name,value.sum()`);
      if (error) throw error;
      console.log(data);
      setMatrics(data);
    } catch (e) {
      console.error("Unable to Fetch data from the server:", e);
    }
  };
  useEffect(() => {
    fetchMatrics();
  }, []);

  const chartData = [
    {
      data: matrics.map((m) => ({
        primary: m.name,
        secondary: m.sum,
      })),
    },
  ];

  const primaryAxis = {
    getValue: (d: { primary: string; secondary: number }) => d.primary,
    scaleType: "band" as const,
    padding: 0.2,
    position: "bottom" as const,
  };

  const secondaryAxes = [
    {
      getValue: (d: { primary: string; secondary: number }) => d.secondary,
      scaleType: "linear" as const,
      min: 0,
      max: y_max(),
      padding: {
        top: 20,
        bottom: 40,
      },
    },
  ];
  function y_max() {
    if (matrics.length > 0) {
      const maxSum: number = Math.max(...matrics.map((m) => m.sum));
      return maxSum;
    }
    return 5000;
  }
  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
        <div style={{ flex: 1 }}>
          <Chart
            options={{
              data: chartData,
              primaryAxis,
              secondaryAxes,
              defaultColors: ["#58d675"],
              tooltip: {
                show: false,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
