import { useState } from 'react';
import { BiX, BiPlus } from 'react-icons/bi';

import { userServiceApi } from '@/api/user';

// eslint-disable-next-line react/prop-types
const CreateUserForm = ({ onClose, onUserCreated }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    age: '',
    gmail: '',
    address: '',
    password: '',
    role: ''
  });

  const createUserAction = async () => {
    try {
      const response = await userServiceApi.createUser(newUser);
      console.log("User created successfully:", response);
      if (response && response.user) {
        onUserCreated(response.user);
        setNewUser({
          name: '',
          age: '',
          gmail: '',
          address: '',
          password: '',
          role: ''
        });
        onClose();
      } else {
        console.error("Error creating user: Invalid response format");
      }
    } catch (error) {
      console.error("Error creating user:", error);
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
          <h3>CREATE NEW USER</h3>
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
        <BiPlus onClick={createUserAction} className='bx end' />
      </div>
    </div>

  );
};

export default CreateUserForm;
