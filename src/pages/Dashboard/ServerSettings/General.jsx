import React from 'react';

const General = ({thresholds, setThresholds}) => {
  const handleRangeChange = (value, category) => {
    setThresholds((prevCategories) => {
      const newThresholds = new Map(prevCategories);
      newThresholds.set(category, parseInt(value));
      return newThresholds;
    });
  };

  return (
    <>
      <span className="text-xs font-bold">
        Configure Message Logging Thresholds (Server-wide)
        <p className="text-sm font-normal pb-2">Set the threshold of moderation filters for logging messages</p>
        <div className="grid grid-cols-2 gap-4 border border-gray-700 rounded-lg p-2">
          {thresholds && Array.from(thresholds).map(([category, value], i) => (
          <React.Fragment key={category}>
            <label className="flex place-items-center cursor-pointer">
              <span className="flex-grow label-text text-xs">{category}</span> 
              <span className="label-text text-xs">{value}%</span> 
            </label>
            <input type="range" min={0} max="100" value={value} className="range"
              onChange={(e) => handleRangeChange(e.target.value, category)}/>
          </React.Fragment>))}
        </div>
      </span>
    </>
  )
};

export default General