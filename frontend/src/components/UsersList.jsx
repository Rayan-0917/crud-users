import React from 'react'
import axios from 'axios';

const UsersList = ({users, deleteUser, getAllUsers, openEditModal}) => {
  

  return (
    <div className='bg-white p-6 rounded-2xl border border-gray-100 mt-5'>
        <div className='p-5'>
          <div className='flex items-center space-x-2 mb-6'>
            <h2 className='text-xl font-bold'>User List</h2>
          </div>

          <div className='mt-5'>
            {users.length === 0 ? (
              <div className='text-center py-10 text-gray-400'>No Users currently</div>
            ) : (
              <table className='w-full text-left'>
                <thead>
                  <tr className='border-b border-gray-200 text-slate-900 font-medium text-sm'>
                    <th className='px-6 py-3'>Name</th>
                    <th className='px-6 py-3'>Gender</th>
                    <th className='px-6 py-3'>Date Of Birth</th>
                    <th className='px-6 py-3'>Email</th>
                    <th className='px-6 py-3'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user=>(
                    <tr key={user.id}>
                      <td className='px-6 py-3 font-semibold'>{user.first_name} {user.last_name}</td>
                      <td className='px-6 py-3 font-semibold'>{user.gender}</td>
                      <td className='px-6 py-3 font-semibold'>{new Date(user.date_of_birth).toLocaleDateString()}</td>
                      <td className='px-6 py-3 font-semibold'>{user.email}</td>
                      <td className='px-6 py-3'>
                        <div className='flex gap-2'>
                          <button onClick={()=>openEditModal(user)} className='px-5 py-2 rounded-md text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-700 transition cursor-pointer'>Update User</button>
                          <button onClick={()=>deleteUser(user.id)} className='px-5 py-2 rounded-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition cursor-pointer'>Delete User</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
  )
}

export default UsersList
