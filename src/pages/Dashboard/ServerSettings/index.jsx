import React, { useState, useEffect } from 'react';
import { defaultCategories, friendlyCategoryToNot, getApiUrl } from '../../../constants';
import useAuthTokens from '../../../hooks/useAuthTokens';
import General from './General';
import {Actions, CreateAction} from './Actions';

const ServerSettings = ({guild, update, setTempThresholds}) => {
  const [thresholds, setThresholds] = useState(() => {
    const newThresholds = new Map(defaultCategories);
    defaultCategories.forEach((_, category) => {
      newThresholds.set(category, 50);
    });
    return newThresholds;
  });
  const [actions, setActions] = useState([]);
  const [editAction, setEditAction] = useState(-1);

  const { accessToken } = useAuthTokens();
  const [page, setPage] = useState("General");

  const getGuildSettings = async () => {
    try {
      const url = new URL(`${getApiUrl}/dashboard/guild/${guild.id}/settings`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const resp = await response.json();
      if (resp.settings.general.thresholds) {
        let general = resp.settings.general
        let newThresholds = new Map(thresholds);
        setThresholds((prevCategories) => {
          newThresholds = new Map(prevCategories);
          defaultCategories.forEach((_, category) => {
            const value = general.thresholds[friendlyCategoryToNot(category)];
            if(value) newThresholds.set(category, value);
          });
          return newThresholds;
        });
        setTempThresholds(newThresholds);
      }
      if (resp.settings.actions) {
        let actions = resp.settings.actions
        setActions(actions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setGuildSettings = async (target) => {
    target.classList.add("btn-disabled");
    try {
      const url = new URL(`${getApiUrl}/dashboard/guild/${guild.id}/settings`);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          general: {
            thresholds: (function() {
              const j = {};
              thresholds.forEach((value, category) => {
                j[friendlyCategoryToNot(category)] = value;
              });
              return j;
            })(),
          },
          actions: actions
        }),
      });

      await response.json();
      update();
    } catch (error) {
      console.error(error);
    } finally {
      target.classList.remove("btn-disabled");
    }
  };

  useEffect(() => {
    if (guild && guild.id > 0)
      getGuildSettings();
  }, [guild]);

  return (
    <>
      <CreateAction {...{actions, setActions, editAction, setEditAction}}/>
      <div className="drawer drawer-end w-24">
        <input id="server-settings-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="server-settings-drawer" className="drawer-button btn btn-xs">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>
            Settings
          </label>
        </div> 
        <div className="drawer-side z-50 overflow-hidden text-base">
          {/* <div className="toast toast-top z-50 text-sm">
            <div className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Server settings have been saved!</span>
            </div>
          </div> */}
          <label htmlFor="server-settings-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="flex flex-col sm:w-[700px] w-full h-full bg-base-200">
            <header className="bg-base-100">
              {/* <button className="btn btn-circle border border-gray-700 absolute -left-8 top-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button> */}
              <div className="flex flex-row space-x-2 p-6 ">
                {guild && (<>
                  {guild.icon ? (
                    <img className="select-none h-6 w-6 rounded-full" src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}/>
                  ) : (
                    <div className="select-none relative inline-flex items-center justify-center h-16 w-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <span className="font-medium text-gray-300 dark:text-gray-300 text-md">{guild.name.substring(0, 1)}</span>
                    </div>
                  )}
                  <span>{guild.name}</span>
                  <span>/</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                  </svg>
                  <span>Settings</span>
                </>
                )}
              </div>
              <div role="tablist" className="tabs tabs-lifted flex">
                <span className="tab w-4 [--tab-border-color:#333333]"></span>
                <a className={`space-x-2 tab grow ${page === "General" && 'tab-active'} [--tab-bg:#191e24] [--tab-border-color:#333333]`} role="tab" 
                  onClick={() => setPage("General")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                  </svg>
                  <span>General</span>
                </a>
                <a className={`space-x-2 tab grow ${page === "Actions" && 'tab-active'} [--tab-bg:#191e24] [--tab-border-color:#333333]`} role="tab" 
                  onClick={() => setPage("Actions")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334"/>
                  </svg>
                  <span>Actions</span>
                </a>
                <span className="tab w-4 [--tab-border-color:#333333]"></span>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-6">
              {(() => {
                switch (page) {
                  case "Actions":
                    return <Actions {...{actions, setActions, setEditAction}}/>;
                  default:
                    return <General {...{thresholds, setThresholds}}/>;
                }
              })()}
            </main>
            <footer className="w-full border-t border-gray-700 place-items-end grid">
              <div className="p-6 space-x-2">
                <button className="btn btn-sm btn-ghost" onClick={() => {document.getElementById("server-settings-drawer").checked = false;}}>Cancel</button>
                <button className="btn btn-sm btn-primary" onClick={(e) => {setGuildSettings(e.currentTarget)}}>
                  <span>Save Changes</span>
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
};

export default ServerSettings