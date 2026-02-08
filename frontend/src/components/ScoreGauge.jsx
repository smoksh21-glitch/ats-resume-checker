import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function ScoreGauge({ score }) {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ];

  const getColor = (score) => {
    if (score >= 80) return '#22c55e'; // Green
    if (score >= 60) return '#eab308'; // Yellow
    if (score >= 40) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const scoreColor = getColor(score);
  const scoreLabel = getLabel(score);

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={110}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={scoreColor} />
            <Cell fill="#e5e7eb" className="dark:fill-gray-700" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
        <div className="text-6xl font-bold" style={{ color: scoreColor }}>
          {score}
        </div>
        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
          {scoreLabel}
        </div>
      </div>
    </div>
  );
}

export default ScoreGauge;
