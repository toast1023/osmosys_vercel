import { useState, useId } from 'react';

const component = ({categories, setCategories, dateRange=[0, 0], setDateRange}) => {
  const modalId = useId();
  const [tempCategories, setTempCategories] = useState(categories);
  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const handleCheckboxChange = (category) => {
    setTempCategories((prevCategories) => {
      const newCategories = new Map(prevCategories);
      newCategories.set(category, !prevCategories.get(category));
      return newCategories;
    });
  };

  return (
    <div>
    <button className="btn btn-ghost btn-circle btn-xs" onClick={()=>{
      document.getElementById(modalId).showModal();
      setTempCategories(categories);
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
      </svg>
    </button>
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="flex flex-row pb-4">
          <h3 className="font-bold text-lg flex-grow">Filter Messages</h3>
            <form className="space-x-2" method="dialog">
              <button className="btn btn-sm btn-primary" onClick={()=>{
                setCategories(tempCategories);
                setDateRange(tempDateRange);
              }}>Apply</button>
              <button className="btn btn-sm">Close</button>
            </form>
        </div>
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow border border-base-300 join-item bg-base-200">
            <input type="checkbox" /> 
            <div className="collapse-title text-base font-medium">
              Category
            </div>
            <div className="collapse-content"> 
              <div className="form-control">
                {tempCategories && Array.from(tempCategories).map(([category, isChecked]) => (
                  <label key={category} className="label cursor-pointer">
                    <span className="label-text">{category}</span> 
                    <input type="checkbox" className="checkbox" checked={isChecked} 
                      onChange={() => handleCheckboxChange(category)} />
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="collapse collapse-arrow border border-base-300 join-item bg-base-200">
            <input type="checkbox" /> 
            <div className="collapse-title text-base font-medium">
              Date Range
            </div>
            <div className="collapse-content flex flex-row space-x-4"> 
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Start</span>
                </div>
                <input className="select select-bordered pr-4" style={{backgroundImage: 'none'}} type="date" 
                value={tempDateRange[0]} onChange={(e) => setTempDateRange([e.target.value, tempDateRange[1]])}/>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">End</span>
                </div>
                <input className="select select-bordered pr-4" style={{backgroundImage: 'none'}} type="date" 
                value={tempDateRange[1]} onChange={(e) => setTempDateRange([tempDateRange[0], e.target.value])}/>
              </label>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    </div>
  )
};

export default component