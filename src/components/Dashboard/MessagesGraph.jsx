import { useState, useEffect } from 'react'
import MessagesFilter from './MessagesFilter'
import useAuthTokens from '../../hooks/useAuthTokens';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { COLORS, defaultCategories, defaultDateRange, getApiUrl } from '../../constants';

const component = ({guild}) => {
  const [data, setData] = useState(() => [])
  const [categories, setCategories] = useState(defaultCategories);
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const { accessToken } = useAuthTokens();

  const getMessageData = async () => {
    try {
      setData([]);
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
      let graph = [];

      Object.keys(resp.data).forEach((e) => {
        graph.push({
          name: [e],
          ['Hate']: resp.data[e].hate_count,
          ['Hate (Threatening)']: resp.data[e].hate_threatening_count,
          ['Harassment']: resp.data[e].harassment_count,
          ['Harassment (Threatening)']: resp.data[e].harassment_threatening_count,
          ['Self Harm']: resp.data[e].self_harm_count,
          ['Self Harm Intent']: resp.data[e].self_harm_intent_count,
          ['Self Harm Instructions']: resp.data[e].self_harm_instructions_count,
          ['Sexual']: resp.data[e].sexual_count,
          ['Sexual (Minors)']: resp.data[e].sexual_minors_count,
          ['Violence']: resp.data[e].violence_count,
          ['Violence (Graphic)']: resp.data[e].violence_graphic_count,
        })
      });

      setData(graph);
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
        Messages Graph
      </span>
      <div className='relative'>
        <MessagesFilter {...{ categories, setCategories, dateRange, setDateRange }}/>
      </div>
    </div>
    <ResponsiveContainer width="99%" height={280}>
    <LineChart data={data} margin={{ top: 30, right: 30, left: 10, bottom: 0, }} >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip contentStyle={{backgroundColor: "black", borderRadius: "0.5rem"}}/>
      {/* <Legend /> */}
      {Array.from(categories.entries()).map((entry, index) => (
        entry[1] ? (
        <Line key={`line-${index}`} type="monotone" dataKey={entry[0]} stroke={COLORS.get(entry[0])} activeDot={{ r: 8 }} dot={false} />
        ) : null
      ))}
    </LineChart>
    </ResponsiveContainer>
  </>)
};

export default component