import React, { useEffect, useState } from 'react';
import { defaultCategories, friendlyCategoryToNot } from '../../../constants';

export const Actions = ({actions, setActions, setEditAction}) => {
  return (
    <div className="space-y-4">
      <span className="text-xs font-bold">
        Configure Moderation Actions (Server-wide)
        <p className="text-sm font-normal">Set an action for messages that pass a defined condition</p>
      </span>
      {actions.length > 0 && <div className="divider"></div>}
      <div className="space-y-1.5">
        {actions.map((action, i) => (<React.Fragment key={i}>
          <div className="flex space-x-4">
            <span className="w-64 text-xs font-bold">Action</span>
            <span className="flex-grow text-xs font-bold">Condition</span>
          </div>
          <div className="flex space-x-4 items-center">
            <label className="w-64 h-10 group input input-bordered flex items-center gap-2 text-sm">
              <span type="text" className="grow">{action.extra.friendlyAction}</span>
              <svg className="w-4 h-4 opacity-70 cursor-pointer hidden group-hover:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                onClick={_ => {
                  setEditAction(i); document.getElementById('CreateActionModal').showModal();
                }}>
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
              </svg>
            </label>
            <label className="w-64 h-10 group input input-bordered flex items-center gap-2 text-sm">
              <span type="text" className="grow">{action.extra.friendlyCondition}</span>
              <svg className="w-4 h-4 opacity-70 cursor-pointer hidden group-hover:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                onClick={_ => {
                  setEditAction(i); document.getElementById('CreateActionModal').showModal();
                }}>
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
              </svg>
            </label>
            <div className="flex items-center">
              <input type="checkbox" className="toggle" checked={action.extra.action.enabled} 
                onChange={_ => {
                  setActions(prevActions => {
                    const updatedActions = [...prevActions];
                    updatedActions[i].extra.action.enabled = !updatedActions[i].extra.action.enabled;
                    return updatedActions;
                  });
                }}/>
            </div>
            <button className="btn btn-xs btn-circle btn-outline hover:btn-error" onClick={_ => {
                deleteAction(i, setActions);
              }}>
              <div className="items-center place-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="relative h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
            </button>
          </div>
        </React.Fragment>))}
      </div>
      <div className="pt-8 divider">
        <button className="btn btn-outline" onClick={()=>document.getElementById('CreateActionModal').showModal()}>Create New Action</button>
      </div>
    </div>
  )
};

const deleteAction = (index, setActions) => {
  setActions(prevActions => {
    const updatedActions = [...prevActions.slice(0, index), ...prevActions.slice(index + 1)];
    return updatedActions;
  });
};

export const CreateAction = ({actions, setActions, editAction, setEditAction}) => {
  // Actions, otherwise known as "rules", read the documentation:
  // https://github.com/santalvarez/python-rule-engine/blob/main/docs/rules.md

  const [punish, setPunish] = useState("none");
  const [duration, setDuration] = useState("1");
  const [reason, setReason] = useState("");
  const [deleteMsg, setDeleteMsg] = useState(true);

  const [category, setCategory] = useState("Hate");
  const [operator, setOperator] = useState("greater_than");
  const [threshold, setThreshold] = useState("50");

  useEffect(() => {
    if (editAction === -1) {
      setPunish("none");
      setDuration("1");
      setReason("");
      setDeleteMsg(true);
  
      setCategory("Hate");
      setOperator("greater_than");
      setThreshold("50");
    } else {
      let action = actions[editAction].extra.action;
      setPunish(action.punish);
      setDuration("" + action.duration);
      setReason(action.reason);
      setDeleteMsg(action.deleteMsg);
  
      let condition = actions[editAction].extra.condition;
      setCategory(condition.category);
      setOperator(condition.operator);
      setThreshold("" + condition.threshold);
    }
  }, [actions, editAction])

  const addAction = () => {
    if (isNaN(parseInt(duration))) {
      console.error("Error parsing duration value.")
      return;
    }
    if (isNaN(parseInt(threshold))) {
      console.error("Error parsing threshold value.")
      return;
    }
    if (editAction !== -1) {
      console.log("edit override action")
    }
    const newAction = {
      name: "action",
      conditions: {
        all: [
          {
            path: "$." + friendlyCategoryToNot(category),
            operator: operator,
            value: parseInt(threshold)
          }
        ]
      },
      extra: {
        action: {
          enabled: true,
          punish,
          duration: parseInt(duration),
          reason,
          deleteMsg,
        },
        condition: {
          category,
          operator,
          threshold: parseInt(threshold),
        },
        friendlyAction: 
          punish.charAt(0).toUpperCase() + punish.slice(1) 
            + (punish !== "none" ? " user" : "")
            + (punish === "timeout" ? " for " + duration : ""),
        friendlyCondition: 
          "If " + category + " " 
            + operators.get(operator).replace(/\([^)]*\)/g, '') 
            + " " + threshold + "%"
      },
    };
    if (editAction !== -1) {
      setActions(prevActions => {
        return [
          ...prevActions.slice(0, editAction), 
          ...prevActions.slice(editAction + 1), 
          newAction
        ];
      });
      setEditAction(-1);
    } else {
      setActions([...actions, newAction]);
    }
  };

  return (<>
    <dialog id="CreateActionModal" className="modal modal-bottom sm:modal-middle" style={{marginLeft: "0px"}}>
      <div className="modal-box">
        <div className="flex flex-row pb-4">
          <h3 className="font-bold text-lg flex-grow">{(editAction !== -1 ? "Editing" : "Create New")} Action</h3>
          <form className="space-x-2" method="dialog">
            <button className="btn btn-sm btn-primary" onClick={() => {
              addAction();
            }}>{(editAction !== -1 ? "Save" : "Create")}</button>
            <button className="btn btn-sm" onClick={_ => setEditAction(-1)}>Close</button>
          </form>
        </div>
        <div className="py-4 space-y-2">
          <div>
            <h2 className="w-full" style={{lineHeight: "0", marginBottom: "-10px"}}>
              <span className="bg-base-100 mx-3 px-1.5 text-sm font-medium">Action</span>
            </h2>
            <div className="p-4 space-y-2 border-b border-t border-r border-l border-gray-600 rounded-md">
              <ActionOptions {...{
                punish, setPunish, 
                duration, setDuration, 
                reason, setReason, 
                deleteMsg, setDeleteMsg
              }}/>
            </div>
          </div>
          <div>
            <h2 className="w-full" style={{lineHeight: "0", marginBottom: "-10px"}}>
              <span className="bg-base-100 mx-3 px-1.5 text-sm font-medium">Condition</span>
            </h2>
            <div className="p-4 space-y-2 border-b border-t border-r border-l border-gray-600 rounded-md">
              <ConditionOptions {...{
                category, setCategory, 
                operator, setOperator, 
                threshold, setThreshold
              }}/>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={_ => setEditAction(-1)}>close</button>
      </form>
    </dialog>
  </>)
}

const ActionOptions = ({
  punish, setPunish, 
  duration, setDuration, 
  reason, setReason, 
  deleteMsg, setDeleteMsg
}) => {
  return (<>
    <span className="text-sm">Define an action when a message meets the specified condition.</span>
    <label className="space-y-1.5 w-full flex flex-col">
      <span className="text-xs font-bold">User Punishment</span>
      <select value={punish} className="select select-bordered select-sm w-full"
        onChange={e => setPunish(e.target.value)}>
        <option value="none">None</option>
        <option value="timeout">Timeout User</option>
        <option value="kick">Kick User</option>
        <option value="ban">Ban User</option>
      </select>
    </label>
    {punish === "timeout" && (<>
    <label className="space-y-1.5 w-full flex flex-col">
      <span className="text-xs font-bold">Duration</span>
    </label>
    <div className="grid grid-cols-6 bg-base-200 rounded-lg text-xs">
      <div>
        <input type="radio" id="1" value="1" className="peer hidden" checked={duration === "1"} onChange={e => setDuration(e.target.value)}/>
        <label htmlFor="1" className="block cursor-pointer select-none p-2 text-center rounded-lg peer-checked:bg-[oklch(var(--p))] font-bold peer-checked:text-black">
          60 SECS
        </label>
      </div>
      <div>
        <input type="radio" id="2" value="5" className="peer hidden" checked={duration === "5"} onChange={e => setDuration(e.target.value)}/>
        <label htmlFor="2" className="block cursor-pointer select-none p-2 text-center rounded-lg peer-checked:bg-[oklch(var(--p))] font-bold peer-checked:text-black">
          5 MINS
        </label>
      </div>
      <div>
        <input type="radio" id="3" value="10" className="peer hidden" checked={duration === "10"} onChange={e => setDuration(e.target.value)}/>
        <label htmlFor="3" className="block cursor-pointer select-none p-2 text-center rounded-lg peer-checked:bg-[oklch(var(--p))] font-bold peer-checked:text-black">
          10 MINS
        </label>
      </div>
      <div>
        <input type="radio" id="4" value="60" className="peer hidden" checked={duration === "60"} onChange={e => setDuration(e.target.value)}/>
        <label htmlFor="4" className="block cursor-pointer select-none p-2 text-center rounded-lg peer-checked:bg-[oklch(var(--p))] font-bold peer-checked:text-black">
          1 HOUR
        </label>
      </div>
      <div>
        <input type="radio" id="5" value="1440" className="peer hidden" checked={duration === "1440"} onChange={e => setDuration(e.target.value)}/>
        <label htmlFor="5" className="block cursor-pointer select-none p-2 text-center rounded-lg peer-checked:bg-[oklch(var(--p))] font-bold peer-checked:text-black">
          1 DAY
        </label>
      </div>
      <div>
        <input type="radio" id="6" value="10080" className="peer hidden" checked={duration === "10080"} onChange={e => setDuration(e.target.value)}/>
        <label htmlFor="6" className="block cursor-pointer select-none p-2 text-center rounded-lg peer-checked:bg-[oklch(var(--p))] font-bold peer-checked:text-black">
          1 WEEK
        </label>
      </div>
    </div>
    </>)}
    <label className="space-y-1.5 w-full flex flex-col">
      <span className="text-xs font-bold">Reason</span>
    </label>
    <textarea maxLength="512" className="textarea textarea-bordered w-full" placeholder="Enter reason for punishment" value={reason} onChange={e => setReason(e.target.value)}></textarea>
    <div className="">
      <label className="label cursor-pointer">
        <span className="label-text">Delete Message</span> 
        <input type="checkbox" checked={deleteMsg} onChange={_ => setDeleteMsg(!deleteMsg)} className="checkbox" />
      </label>
    </div>
  </>)
}

const ConditionOptions = ({category, setCategory, operator, setOperator, threshold, setThreshold}) => {
  return (<>
    <span className="text-sm">Define a condition for the specified action to occur.</span>
    <label className="space-y-1.5 w-full flex flex-col">
      <span className="text-xs font-bold">Category</span>
      <select value={category} className="select select-bordered select-sm w-full"
        onChange={e => setCategory(e.target.value)}>
        {Array.from(defaultCategories.keys()).map((cat, i) => {
          return (<option key={i} value={cat}>{cat}</option>)
        })}
      </select>
    </label>
    <label className="space-y-1.5 w-full flex flex-col">
      <span className="text-xs font-bold">Operator</span>
      <select value={operator} className="select select-bordered select-sm w-full"
        onChange={e => setOperator(e.target.value)}>
        {Array.from(operators.keys()).map((operator, i) => {
          return (<option key={i} value={operator}>{operators.get(operator)}</option>)
        })}
      </select>
    </label>
    <label className="space-y-1.5 w-full flex flex-col">
      <span className="text-xs font-bold">Threshold Value</span>
      <input type="number" value={threshold} min="0" max="100" className="input input-sm input-bordered w-full" 
        onChange={e => setThreshold(e.target.value)}/>
    </label>
  </>)
}

const operators = new Map([
  ['greater_than', '> (Greater Than)'],
  ['greater_than_inclusive', '>= (Greater Than Inclusive)'],
  ['less_than', '< (Less Than)'],
  ['less_than_inclusive', '<= (Less Than Inclusive)'],
  ['equal', '= (Equal)'],
  ['not_equal', '!= (Not Equal)'],
]);