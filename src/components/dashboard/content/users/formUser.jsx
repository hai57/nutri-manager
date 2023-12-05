import { useState, useEffect } from 'react';
import { BiX } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { userServiceApi } from '@/api/user';

// eslint-disable-next-line react/prop-types
const UserForm = ({ onClose, onUserCreated, onUserUpdated, userDataToUpdate }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    age: '',
    gmail: '',
    address: '',
    password: ''
  });
  useEffect(() => {
    if (userDataToUpdate) {
      setNewUser(userDataToUpdate);
    }
  }, [userDataToUpdate]);

  const userAction = () => {
    if (!newUser.name || !newUser.age || !newUser.gmail || !newUser.address) {

      toast.error('Please fill in all required fields.');
      return;
    }

    userDataToUpdate ? updateUser() : createUser()
  };

  const createUser = async () => {
    const res = await userServiceApi.createUser(newUser);

    if (res.success) {
      console.log(res);
      const createdUser = { ...newUser, _id: res.user._id };
      onUserCreated(createdUser)
      setNewUser({
        name: '',
        age: '',
        gmail: '',
        address: '',
        password: '',
      })
      onClose();
    }
  }

  const updateUser = async () => {
    const res = await userServiceApi.updateUser(newUser);

    if (res.success) {
      console.log(res);
      onUserUpdated(newUser)
      setNewUser({
        user: '',
        type: '',
        name: '',
        isParent: '',
        description: ''
      })
      onClose();
    }
  }
  const handleFieldChange = (fieldName, value) => {
    setNewUser({
      ...newUser,
      [fieldName]: value,
    });
  };
  return (
    <div className="popup-overlay">
      <div className="popup">
        <BiX onClick={onClose} className='bx end' />
        <div className="header">
          <h3>{userDataToUpdate ? 'UPDATE USER' : 'CREATE NEW USER'}</h3>
        </div>
        <form>
          <div className='fl_left'>
            <input
              className='inp'
              type="text"
              value={newUser.name}
              placeholder='Name'
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
            <input
              className='inp'
              type="text"
              value={newUser.age}
              placeholder='Age'
              onChange={(e) => handleFieldChange('age', e.target.value)}
            />
            <input
              className='inp'
              type="text"
              value={newUser.gmail}
              onChange={(e) => handleFieldChange('gmail', e.target.value)}
              placeholder='Gmail'
            />
          </div>
          <div className='fl_right'>
            <input
              className='inp'
              type="text"
              value={newUser.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              placeholder='Address'
            />
            <input
              className='inp'
              type="text"
              value={newUser.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              placeholder='Password'
            />
          </div>
        </form>
        <button onClick={userAction} className='btn end'>YES</button>
      </div>
    </div>

  );
};

export default UserForm;
