import { useState, useEffect } from 'react';
import { BiX, BiPlus } from 'react-icons/bi';

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

  const userAction = async () => {
    try {
      const response = userDataToUpdate
        ? await userServiceApi.updateUser(newUser)
        : await userServiceApi.createUser(newUser);

      console.log(`User ${userDataToUpdate ? 'updated' : 'created'} successfully:`, response);

      if (response.message === "Request Accepted" || response.message === "Created Success" ) {
        console.log(response)
        console.log(response.user);
        if (userDataToUpdate) {
          onUserUpdated(response.user);
        } else {
          onUserCreated(response.user);
        }

        setNewUser({
          name: '',
          age: '',
          gmail: '',
          address: '',
          password: '',
        });

        onClose();
      } else {
        console.error(`Error ${userDataToUpdate ? 'updating' : 'creating'} user: Invalid response format`);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <BiPlus onClick={userAction} className='bx end' />
      </div>
    </div>

  );
};

export default UserForm;
