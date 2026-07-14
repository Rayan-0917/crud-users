import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import UsersList from './components/UsersList';
import EditUserModal from './components/EditUserModal';

function App() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen]=useState(false);
  const [selectedUser, setSelectedUser]=useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/user';

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}`);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const payload = {
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

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }

  const openEditModal=(user)=>{
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  const closeEditModal=()=>{
    setSelectedUser(null);
    setIsModalOpen(false);
  }

  const updateUser=async(user)=>{
    try {
      const payload={
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        date_of_birth: user.dob,
        email: user.email
      }

      await axios.patch(`${API_URL}/${user.id}`, payload)

      setIsModalOpen(false);
      setSelectedUser(null);
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
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-125 border" />
              </div>
              <div>
                <label className="mb-2 text-slate-900 font-medium text-sm block">Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-125 border" />
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                <label className="mb-2 text-slate-900 font-medium text-sm block">Gender</label>
                <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="px-3 py-2 text-slate-900 rounded-md bg-white w-125 border">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="mb-2 text-slate-900 font-medium text-sm block">Date of Birth</label>
                <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-125 border" placeholder='YYYY/MM/DD' />
              </div>
            </div>
            <div>
              <label className="mb-2 text-slate-900 font-medium text-sm block">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-125 border" />
            </div>

            <div className='flex p-4 mt-4'>
              <button type='submit' className='px-5 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer'>Create User</button>
            </div>
          </form>
        </div>
      </div>

      <UsersList users={users} deleteUser={deleteUser} getAllUsers={getAllUsers} openEditModal={openEditModal}/>

      <EditUserModal user={selectedUser} isModalOpen={isModalOpen} closeEditModal={closeEditModal} updateUser={updateUser}/>
    </div>
  )
}

export default App
