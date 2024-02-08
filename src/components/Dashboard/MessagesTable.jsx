import { useState, useEffect } from 'react'
import useAuthTokens from '../../hooks/useAuthTokens';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import TablePagination from './TablePagination'
import MessagesFilter from './MessagesFilter'
import { COLORS, defaultCategories, defaultDateRange, getApiUrl } from '../../constants';

const component = ({guild}) => {
  const [data, setData] = useState(() => [])
  const [categories, setCategories] = useState(defaultCategories);
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { accessToken } = useAuthTokens();

  const getGuildMessages = async () => {
    try {
      const url = new URL(`${getApiUrl}/dashboard/guild/${guild.id}/messages`);
      url.searchParams.append('start_date', dateRange[0]);
      url.searchParams.append('end_date', dateRange[1]);
      url.searchParams.append('count', false);
      url.searchParams.append('filter', (function() {
        let result = 0;
        for (const category of categories) {
          if (category[1] !== false)
            result |= defaultCategories.get(category[0])
        }
        return Number(result).toString(2);
      })());
      url.searchParams.append('page', page);
      url.searchParams.append('limit', limit);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const resp = await response.json();
      setData(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (guild && guild.id > 0)
      getGuildMessages();
  }, [guild, categories, dateRange, page, limit]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('message_time', {
      cell: info => new Date(info.getValue()).toLocaleString(),
      header: () => <span>Date</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.channel_name, {
      id: 'channel_name',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Channel</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.user_name, {
      id: 'user_name',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Username</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('flagged', {
      header: () => 'Reason',
      cell: info => {
        var data = {
          "Harassment": (categories.get("Harassment") !== false ? info.row.original.harassment : 0),
          "Harassment (Threatening)": (categories.get("Harassment (Threatening)") !== false ? info.row.original.harassment_threatening : 0),
          "Hate": (categories.get("Hate") !== false ? info.row.original.hate : 0),
          "Hate (Threatening)": (categories.get("Hate (Threatening)") !== false ? info.row.original.hate_threatening : 0),
          "Self Harm": (categories.get("Self Harm") !== false ? info.row.original.self_harm : 0),
          "Self Harm (Instructions)": (categories.get("Self Harm (Instructions)") !== false ? info.row.original.self_harm_instructions : 0),
          "Self Harm (Intent)": (categories.get("Self Harm (Intent)") !== false ? info.row.original.self_harm_intent : 0),
          "Sexual": (categories.get("Sexual") !== false ? info.row.original.sexual : 0),
          "Sexual (Minors)": (categories.get("Sexual (Minors)") !== false ? info.row.original.sexual_minors : 0),
          "Violence": (categories.get("Violence") !== false ? info.row.original.violence : 0),
          "Violence (Graphic)": (categories.get("Violence (Graphic)") !== false ? info.row.original.violence_graphic : 0),
        }
        return checkAndAppendTypes(0.4, data)
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('message', {
      header: () => <span>Message</span>,
      // cell: info => <p className=''>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (<>
  <div className='rounded-t bg-gray-50 dark:bg-gray-700 p-2 flex justify-between items-center'>
    <span className="flex-grow bg-transparent text-md pl-2 font-medium">
      Messages Table
    </span>
    <div className='flex space-x-2 items-center'>
      <TablePagination {...{ page, setPage, limit, setLimit }} totalPages={data[0]?.total_pages ?? 0}/>
      <div className="join items-center">
        <span className='text-sm pr-2'>Go to page</span>
        <input id="gotoPage" className="input border border-gray-600 input-sm w-14 max-w-xs join-item"/>
        <button className="btn btn-sm join-item rounded-r-md" onClick={() => setPage(document.getElementById("gotoPage").value)}>Go</button>
      </div>
      <MessagesFilter {...{ categories, setCategories, dateRange, setDateRange }}/>
    </div>
  </div>
  <div className="bg-gray-800 justify-center w-full pt-2 rounded-b">
    <table className='table-fixed w-full text-left text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase dark:text-gray-400'>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <th id={header.column.id} key={header.id} scope="col" className={`px-6 py-3 border-b border-gray-400 ` +
                `${header.column.id === 'message_time' ? "w-60" : ""}` +
                `${header.column.id === 'channel_name' ? "w-44" : ""}` +
                `${header.column.id === 'user_name' ? "w-44" : ""}` +
                `${header.column.id === 'flagged' ? "w-64" : ""}` +
                `${header.column.id === 'message' ? "w-auto" : ""}`
                // ` ${index === 0 ? "rounded-tl-lg" : ""}` +
                // `${index === headerGroup.headers.length - 1 ? "rounded-tr-lg" : ""}`
              }>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className={`px-6 py-4 ` +
                `${cell.column.id === 'message' ? "text-ellipsis overflow-hidden whitespace-nowrap" : ""}`
              }>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot className='border-t border-gray-400'>
        <div className='px-4 pt-4 whitespace-nowrap'>
          Showing {(page-1) * (data?.length ?? 0) + ((data?.length ?? 0) === 0 ? 0 : 1)} to {(page-1) * (data?.length ?? 0) + (data?.length ?? 0)} of {data[0]?.total_count ?? 0} messages
        </div>
      </tfoot>
    </table>
    <div className="h-4" />
  </div>
  </>)
};

const checkAndAppendTypes = (threshold, data) => {
  return (<div className='space-x-1.5'>
    {Object.keys(data).map((key, i) => {
      if (data[key] < threshold) return;
      return (<div key={i} className='badge badge-outline whitespace-nowrap' style={{borderColor: COLORS.get(key)}}>
        {key.split('_').join(' ').replace(/^\w/, c => c.toUpperCase())}
      </div>)
    })}
  </div>);
};

export default component