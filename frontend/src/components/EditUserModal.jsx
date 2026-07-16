import {React, useEffect, useState} from 'react'

const EditUserModal = ({user, isModalOpen, updateUser, closeEditModal}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('Male');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=>{
        if(user){
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setGender(user.gender);
            if (user.date_of_birth) {
                const dateStr = new Date(user.date_of_birth).toISOString().split('T')[0];
                setDob(dateStr.replace(/-/g, '-'));
            } else {
                setDob('');
            }
            setEmail(user.email);
        }
    }, [user])


    if (!isModalOpen || !user) return null;

    const saveChanges=async(e)=>{
        e.preventDefault();
        updateUser({
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            gender,
            dob,
            email
        })
    }

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto'>
            <div className='bg-white p-6 rounded-2xl border border-gray-100 max-w-lg w-full overflow-hidden'>
                <div className='p-5 md:p-8'>
                    <div className='flex items-center space-x-2 mb-6'>
                        <h2 className='text-xl font-bold'>Update user details</h2>
                    </div>

                    <form onSubmit={saveChanges} className="space-y-4">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            <div>
                                <label className="mb-2 text-slate-900 font-medium text-sm block">First Name</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-full border" />
                            </div>
                            <div>
                                <label className="mb-2 text-slate-900 font-medium text-sm block">Last Name</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-full border" />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            <div>
                                <label className="mb-2 text-slate-900 font-medium text-sm block">Gender</label>
                                <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="px-3 py-2 text-slate-900 rounded-md bg-white w-full border">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 text-slate-900 font-medium text-sm block">Date of Birth</label>
                                <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-full border" placeholder='YYYY/MM/DD' />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 text-slate-900 font-medium text-sm block">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-3 py-2.5 text-sm text-slate-900 rounded-md w-full border" />
                        </div>

                        <div className='flex p-4 mt-4 gap-4'>
                            <button type='submit' className='px-5 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer'>Save changes</button>
                            <button type='button' onClick={closeEditModal} className='px-5 py-2 rounded-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition cursor-pointer'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUserModal
