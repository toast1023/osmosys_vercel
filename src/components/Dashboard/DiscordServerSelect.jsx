import { onClickBlur } from '../../constants'

const DiscordServerSelect = ({ guilds }) => {
  if (!Array.isArray(guilds)) {
    guilds = [];
  }
  else {
    // remove duplicate servers if user has multiple accounts managing the same servers
    guilds = Object.values(
      guilds.reduce((acc, guild) => ((acc[guild.id] = guild), acc), {})
    );
  }

  return (
    <div tabIndex={0} className="collapse collapse-arrow bg-base-200">
      <div className="collapse-title flex space-x-2">
        <svg className='text-base flex items-center h-full w-6' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
        </svg>
        <span className='select-none font-bold text-base flex items-center h-full'>
          Discord servers
        </span>
      </div>
      <div className="collapse-content"> 
        <ul className="">
          {guilds.map((guild) => (
            <SelectOption key={guild.id} guild={guild} />
          ))}
          <AddServerOption/>
        </ul>
      </div>
    </div>
  )
};

const SelectOption = ({guild}) => {
  return (
    <li onClick={onClickBlur}>
      <a>
        {guild.icon ? (
          <img className="h-5 w-5 rounded-full" src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}/>
        ) : (
          <div className="relative inline-flex items-center justify-center h-5 w-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-300 dark:text-gray-300">{guild.name.substring(0, 1)}</span>
          </div>
        )}
        {guild.name}
      </a>
    </li>
  )
}

const AddServerOption = ({}) => {
  return (
    <li onClick={onClickBlur}>
      <a className="text-gray-500" href="https://discord.com/oauth2/authorize?client_id=1152436728125206628&permissions=21983791152192&scope=bot" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rounded-full" fill="none" viewBox="0 0 16 16" stroke="currentColor">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        </svg>
          Add bot to server
      </a>
    </li>
  )
}

export default DiscordServerSelect;