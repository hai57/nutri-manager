import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { userServiceApi } from '@/api/user';
import Popup from '@/components/popUp';

// eslint-disable-next-line react/prop-types
const UserForm = ({ onClose, onUserCreated, onUserUpdated, userDataToUpdate }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    age: '',
    gmail: '',
    address: '',
    password: ''
  });

  const formFields = [
    {
      label: 'Ho va Ten',
      type: 'text',
      value: newUser.name,
      placeholder: 'Name',
      onChange: (value) => handleFieldChange('name', value),
    },
    {
      label: 'Tuoi',
      type: 'text',
      value: newUser.age,
      placeholder: 'Age',
      onChange: (value) => handleFieldChange('age', value),
    },
    {
      label: 'Email',
      type: 'text',
      value: newUser.gmail,
      placeholder: 'Email',
      onChange: (value) => handleFieldChange('gmail', value),
    },
    {
      label: 'Dia chi',
      type: 'text',
      value: newUser.address,
      placeholder: 'Address',
      onChange: (value) => handleFieldChange('address', value),
    },
    // Bạn có thể thêm các trường khác tại đây
  ];

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
  };

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
  };

  const handleFieldChange = (fieldName, value) => {
    setNewUser({
      ...newUser,
      [fieldName]: value,
    });
  };
  return (
    <Popup
      onClose={onClose}
      title={userDataToUpdate ? 'UPDATE USER' : 'CREATE NEW USER'}
      formFields={formFields}
      onAccept={userAction}
    />

  );
};

export default UserForm;
