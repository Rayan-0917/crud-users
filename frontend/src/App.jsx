import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName]=useState('');
  const [lastName, setLastName]=useState('');
  const [gender, setGender]=useState('Male');
  const [dob, setDob]=useState('');
  const [email, setEmail]=useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/user';

  const getAllUsers=async()=>{
      try {
        const res=await axios.get(`${API_URL}`);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
  }


  const createUser=async(e)=>{
    e.preventDefault();
    try {
      const payload={
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        dob: dob,
        email: email,
      }

      await axios.post(`${API_URL}`, payload);
      setFirstName('');
      setLastName('');
      setGender('Male');
      setDob('');
      setEmail('');

      getAllUsers();

    } catch (error) {
      console.log(error);
    }
  }
  
  const deleteUser=async(id)=>{
    try {
      await axios.delete(`${API_URL}/${id}`)
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <div className='min-h-screen bg-gray-50 py-10 px-4'>
      <div className='max-w-5xl mx-auto space-y-8'>

        <div className='flex items-center justify-center border-b border-gray-200'>
          <h1 className='text-3xl font-extrabold pb-6'>User Management System</h1>
        </div>
      </div>

      <div className='bg-white p-6 rounded-2xl border border-gray-100 mt-5'>
        <div className='p-5'>
          <div className='flex items-center space-x-2 mb-6'>
            <h2 className='text-xl font-bold'>Add new User</h2>
          </div>

          <form onSubmit={createUser} className="space-y-4">
            <div className='grid grid-cols-2'>
              <div>
                <label className="mb-2 text-slate-900 font-medium text-sm block">First Name</label>
                <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-125 border" />
              </div>
              <div>
                <label className="mb-2 text-slate-900 font-medium text-sm block">Last Name</label>
                <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-125 border" />
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                <label className="mb-2 text-slate-900 font-medium text-sm block">Gender</label>
                <select name="gender" value={gender} onChange={(e)=>setGender(e.target.value)} className="px-3 py-2 text-slate-900 rounded-md bg-white w-125 border">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="mb-2 text-slate-900 font-medium text-sm block">Date of Birth</label>
                <input type="text" value={dob} onChange={(e)=>setDob(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-125 border" placeholder='YYYY/MM/DD' />
              </div>
            </div>
            <div>
              <label className="mb-2 text-slate-900 font-medium text-sm block">Email</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-125 border" />
            </div>

            <div className='flex p-4 mt-4'>
              <button type='submit' className='px-5 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer'>Create User</button>
            </div>
          </form>
        </div>
      </div>

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
                          <button className='px-5 py-2 rounded-md text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-700 transition cursor-pointer'>Update User</button>
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
    </div>
  )
}

export default App
