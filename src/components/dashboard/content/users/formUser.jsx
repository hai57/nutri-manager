import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { userServiceApi } from '@/api/user';
import Popup from '@/components/popUp';

// eslint-disable-next-line react/prop-types
const UserForm = ({ onClose, onUserCreated, onUserUpdated, userDataToUpdate }) => {
  const [newUser, setNewUser] = useState({
    username: '',
    birthday: '',
    gmail: '',
    gender: 'Nam',
    height: '',
    weight: '',
  });

  const formattedBirthday = (birthday) => {
    const [day, month, year] = birthday.split('-');
    return `${year}-${month}-${day}`;
  };


  const formFields = [
    {
      label: 'Họ và tên',
      type: 'text',
      value: newUser.username,
      placeholder: 'Họ và tên',
      onChange: (value) => handleFieldChange('username', value),
    },
    {
      label: 'Ngày sinh',
      type: 'date',
      value: newUser.birthday,
      onChange: (value) => handleFieldChange('birthday', value),
    },
    {
      label: 'Email',
      type: 'text',
      value: newUser.gmail,
      placeholder: 'Email',
      onChange: (value) => handleFieldChange('gmail', value),
    },
    {
      label: 'Giới tính',
      type: 'select',
      value: newUser.gender,
      options: [
        { value: 'Nam', label: 'Nam' },
        { value: 'Nữ', label: 'Nữ' },
      ],
      onChange: (value) => handleFieldChange('gender', value),
    },
    {
      label: 'Chiều cao',
      type: 'text',
      value: newUser.height,
      placeholder: 'Chiều cao',
      onChange: (value) => handleFieldChange('height', value),
    },
    {
      label: 'Cân nặng',
      type: 'text',
      value: newUser.weight,
      placeholder: 'Cân nặng',
      onChange: (value) => handleFieldChange('weight', value),
    },
  ];

  useEffect(() => {
    if (userDataToUpdate) {
      // eslint-disable-next-line react/prop-types
      const formattedBday = formattedBirthday(userDataToUpdate.birthday);
      setNewUser({
        ...userDataToUpdate,
        birthday: formattedBday,
      });
    }
  }, [userDataToUpdate]);

  const userAction = () => {
    if (!newUser.username || !newUser.birthday || !newUser.gender || !newUser.gmail || !newUser.weight || !newUser.height) {

      toast.error('Please fill in all required fields.');
      return;
    }

    userDataToUpdate ? updateUser() : createUser()
  };

  const createUser = async () => {
    const parts = newUser.birthday.split('-');

    const formattedBirthday = `${parts[2]}-${parts[1]}-${parts[0]}`;

    const createdUser = {
      ...newUser,
      birthday: formattedBirthday,
    };
    const res = await userServiceApi.createUser(createdUser);

    if (res.success) {
      console.log(res);
      const createdUser = { ...newUser, id: res.user.id };
      onUserCreated(createdUser)
      setNewUser({
        username: '',
        birthday: '',
        gmail: '',
        gender: 'Nam',
        height: '',
        weight: ''
      })
      onClose();
    }
  };

  const updateUser = async () => {
    const parts = newUser.birthday.split('-');

    const formattedBirthday = `${parts[2]}-${parts[1]}-${parts[0]}`;

    const updatedUser = {
      ...newUser,
      birthday: formattedBirthday,
    };
    const res = await userServiceApi.updateUser(updatedUser);

    if (res.success) {
      console.log(res);
      onUserUpdated(updatedUser);
      setNewUser({
        username: '',
        birthday: '',
        gmail: '',
        gender: 'Nam',
        height: '',
        weight: ''
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
