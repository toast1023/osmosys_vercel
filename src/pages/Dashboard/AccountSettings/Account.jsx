const Account = ({user}) => {
  return (
    <div>
      <div className='bg-gray-800 rounded-b'>
        <div className='rounded-t bg-gray-50 dark:bg-gray-700 p-2 flex justify-between items-center'>
          <span className="flex-grow bg-transparent text-md pl-2 font-medium">
            Account Information
          </span>
        </div>
        <div className="p-4 flex flex-col text-sm">
          <span className="pb-4 font-bold">
            Contact information
          </span>
          <span>
            {user.username}
          </span>
          <span>
            {user.email}
          </span>
          <div className="mt-4 flex-none space-x-2">
            <button className="btn btn-outline">Change password</button>
            <button className="btn btn-outline btn-error">Delete account</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Account