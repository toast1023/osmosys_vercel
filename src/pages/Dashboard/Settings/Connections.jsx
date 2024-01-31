import { useEffect, useState } from "react";
import useAuthTokens from '../../../hooks/useAuthTokens';
import { getApiUrl } from "../../../constants";

const Connections = ({user, setUser}) => {
  const [oauthPopup, setOauthPopup] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { accessToken } = useAuthTokens();
  let timer = null;

  const handleDiscordLink = async () => {
    let discordOauthUrl = '';
    try {
      const url = new URL(`${getApiUrl}/auth/discord/login`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const resp = await response.json();
      discordOauthUrl = resp.url;
    } catch (error) {
      console.error(error);
      return;
    }

    const popup = window.open(discordOauthUrl, 'OAuth', `
      width=500,
      height=812,
      toolbar=no,
      location=no,
      directories=no,
      status=no,
      menubar=no,
      scrollbars=no,
      copyhistory=no,
      resizable=no
    `);
    
    setOauthPopup(popup);
  };

  const handleDiscordUnlink = async () => {
    try {
      const url = new URL(`${getApiUrl}/auth/discord/unlink`);
      url.searchParams.append('id', selectedAccount.id);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status != 200) {
        console.log("failed to unlink account");
        return;
      }

      setUser({...user, update: 'update'});
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    if (!oauthPopup || timer != null) {
      return;
    }

    timer = setInterval(async () => {
      if (!oauthPopup || oauthPopup.closed) {
        timer && clearInterval(timer);
        setUser({...user, update: 'update'});
        setOauthPopup(null);
      }
    }, 500)

    return () => {
      timer && clearInterval(timer);
    };
  }, [oauthPopup])

  return (
    <div>
      <div className='bg-gray-800 rounded-b'>
        <div className='rounded-t bg-gray-50 dark:bg-gray-700 p-2 flex justify-between items-center'>
          <span className="flex-grow bg-transparent text-md pl-2 font-medium">
            Discord Accounts
          </span>
        </div>
        <div className="p-4 flex flex-col text-sm">
          <span className="mb-4">
            Link multiple Discord accounts to manage all your servers in one place!
          </span>
          <div className="p-4 flex-wrap flex">
            {user.discord_accounts.map((account, idx) => (account.username !== null && (
              <div key={idx} className="bg-gray-700 rounded p-4 m-2 items-center justify-center flex flex-col space-y-2">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <img className="absolute w-12 h-12" 
                    src={`https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}.png`}></img>
                </div>
                <span className="truncate w-32 text-center">
                  {account.is_expired && "(expired)"} {account.username}
                </span>
                <div className="space-x-2">
                  {account.is_expired && <button className="btn btn-xs btn-outline btn-success" 
                    onClick={handleDiscordLink}>
                    Relink
                  </button>}
                  <button className="btn btn-xs btn-outline btn-error" 
                    onClick={() => {
                      setSelectedAccount(account);
                      document.getElementById('discord_unlink_modal').showModal()
                    }}>
                    Unlink
                  </button>
                </div>
              </div>
            )))}
            <button className="rounded p-4 m-2 items-center justify-center flex flex-col space-y-2 btn btn-outline h-36"
              onClick={handleDiscordLink}>
              <div className="relative w-10 h-10">
                <svg className="absolute w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                </svg>
              </div>
              <span className="truncate w-32 text-center">
                Link an account
              </span>
            </button>
          </div>
        </div>
      </div>
      <dialog id="discord_unlink_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Unlink Confirmation</h3>
          <p className="py-4 text-center">Are you sure you want to unlink the following account?</p>
          <div className="items-center justify-center flex flex-col">
            <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              {selectedAccount ? (<img className="absolute w-12 h-12" 
                src={`https://cdn.discordapp.com/avatars/${selectedAccount.id}/${selectedAccount.avatar}.png`}/>) : ""}
            </div>
            <span className="text-center">
              {selectedAccount?.username ?? ""}
            </span>
          </div>
          <div className="modal-action">
            <form className="space-x-2" method="dialog">
              <button className="btn btn-error" onClick={handleDiscordUnlink}>Unlink</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
};

export default Connections