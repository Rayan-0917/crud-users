import React from 'react'
import axios from 'axios';

const UsersList = ({users, deleteUser, getAllUsers, openEditModal}) => {
  

  return (
    <div className='bg-white p-4 md:p-6 rounded-2xl border border-gray-100 mt-5'>
        <div className='p-2 md:p-5'>
          <div className='flex items-center space-x-2 mb-6'>
            <h2 className='text-xl font-bold'>User List</h2>
          </div>

          <div className='mt-5'>
            {users.length === 0 ? (
              <div className='text-center py-10 text-gray-400'>No Users currently</div>
            ) : (
              <div className='overflow-x-auto w-full'>
              <table className='w-full text-left min-w-[600px]'>
                <thead>
                  <tr className='border-b border-gray-200 text-slate-900 font-medium text-sm'>
                    <th className='px-4 py-3 md:px-6'>Name</th>
                    <th className='px-4 py-3 md:px-6'>Gender</th>
                    <th className='px-4 py-3 md:px-6'>Date Of Birth</th>
                    <th className='px-4 py-3 md:px-6'>Email</th>
                    <th className='px-4 py-3 md:px-6'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user=>(
                    <tr key={user.id}>
                      <td className='px-4 py-3 md:px-6 font-semibold'>{user.first_name} {user.last_name}</td>
                      <td className='px-4 py-3 md:px-6 font-semibold'>{user.gender}</td>
                      <td className='px-4 py-3 md:px-6 font-semibold'>{new Date(user.date_of_birth).toLocaleDateString()}</td>
                      <td className='px-4 py-3 md:px-6 font-semibold'>{user.email}</td>
                      <td className='px-4 py-3 md:px-6'>
                        <div className='flex flex-wrap gap-2'>
                          <button onClick={()=>openEditModal(user)} className='px-3 py-1.5 md:px-5 md:py-2 rounded-md text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-700 transition cursor-pointer'>Update User</button>
                          <button onClick={()=>deleteUser(user.id)} className='px-3 py-1.5 md:px-5 md:py-2 rounded-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition cursor-pointer'>Delete User</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </div>
        </div>
      </div>
  )
}

export default UsersList
