import { useState, useEffect } from 'react'
import MessagesFilter from './MessagesFilter'
import useAuthTokens from '../../hooks/useAuthTokens';
import { 
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { COLORS, defaultCategories, defaultDateRange, getApiUrl } from '../../constants';

const component = ({guild}) => {
  const [data, setData] = useState(() => [])
  const [categories, setCategories] = useState(defaultCategories);
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const { accessToken } = useAuthTokens();

  const getMessageData = async () => {
    try {
      setData(null);
      const url = new URL(`${getApiUrl}/dashboard/guild/${guild.id}/messages`);
      url.searchParams.append('start_date', dateRange[0]);
      url.searchParams.append('end_date', dateRange[1]);
      url.searchParams.append('count', true);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const resp = await response.json();
      let pie = [
        { name: 'Hate', value: 0},
        { name: 'Hate (Threatening)', value: 0},
        { name: 'Harassment', value: 0},
        { name: 'Harassment (Threatening)', value: 0},
        { name: 'Self Harm', value: 0 },
        { name: 'Self Harm (Intent)', value: 0},
        { name: 'Self Harm (Instructions)', value: 0},
        { name: 'Sexual', value: 0},
        { name: 'Sexual (Minors)', value: 0},
        { name: 'Violence', value: 0}, 
        { name: 'Violence (Graphic)', value: 0},
      ];

      Object.keys(resp.data).forEach((e) => {
        pie[0].value += resp.data[e].hate_count * (categories.get(pie[0].name) ? 1 : 0);
        pie[1].value += resp.data[e].hate_threatening_count * (categories.get(pie[1].name) ? 1 : 0);
        pie[2].value += resp.data[e].harassment_count * (categories.get(pie[2].name) ? 1 : 0);
        pie[3].value += resp.data[e].harassment_threatening_count * (categories.get(pie[3].name) ? 1 : 0);
        pie[4].value += resp.data[e].self_harm_count * (categories.get(pie[4].name) ? 1 : 0);
        pie[5].value += resp.data[e].self_harm_intent_count * (categories.get(pie[5].name) ? 1 : 0);
        pie[6].value += resp.data[e].self_harm_instructions_count * (categories.get(pie[6].name) ? 1 : 0);
        pie[7].value += resp.data[e].sexual_count * (categories.get(pie[7].name) ? 1 : 0);
        pie[8].value += resp.data[e].sexual_minors_count * (categories.get(pie[8].name) ? 1 : 0);
        pie[9].value += resp.data[e].violence_count * (categories.get(pie[9].name) ? 1 : 0);
        pie[10].value += resp.data[e].violence_graphic_count * (categories.get(pie[10].name) ? 1 : 0);
      })

      // Filter out items with a value of 0
      pie = pie.filter(item => item.value !== 0);
      setData(pie);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (guild && guild.id > 0)
      getMessageData();
  }, [guild, categories, dateRange]);

  return (<>
    <div className='flex bg-gray-50 dark:bg-gray-700 p-2 rounded-t'>
      <span className="flex-grow bg-transparent text-md pl-2 font-medium">
        Messages Chart
      </span>
      <div className='relative'>
        <MessagesFilter {...{ categories, setCategories, dateRange, setDateRange }}/>
      </div>
    </div>
    <div className='flex flex-grow p-4' style={{height: '250px'}}>
      <div className='hidden xl:inline-block overflow-hidden whitespace-nowrap'>
        {data && data.map((entry, index) => (
          <div key={`legend-${index}`} className='flex items-center whitespace-nowrap'>
            <div className='w-4 h-3 mr-2 border border-white' style={{backgroundColor: COLORS.get(entry.name)}}></div>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
      <div className='flex-grow'>
        {data === null ? (
        <div className='w-full h-full flex justify-center items-center'>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
        ) : ( /* lol, funny recharts hack to fix responsiveness (width=99%) */
        data.length > 0 ? (
          <ResponsiveContainer width="99%" height={250}> 
            <PieChart>
              <Pie
                data={data}
                outerRadius={120}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.get(entry.name)} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            No data found.
          </div>
        ))}
      </div>
    </div>
    </>)
};

export default component;