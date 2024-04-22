
import { useEffect, useState } from 'react';
import { BiGroup, BiReceipt } from 'react-icons/bi';
import { FaBirthdayCake, FaMapMarkerAlt } from 'react-icons/fa'
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { userServiceApi } from '@/api/user';

const SettingUser = () => {
  const [loading, setLoading] = useState(true)
  const [changeField, setChangeField] = useState(false)
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    birthday: '',
    gmail: '',
    gender: '',
    weight: '',
    height: '',
  });

  const formFields = [
    {
      label: 'Họ và tên',
      type: 'text',
      value: updatedUser.username,
      placeholder: 'Tên',
      onChange: (value) => handleFieldChange('username', value),
      icon: <BiGroup className="bx" />
    },
    {
      label: 'Ngày sinh',
      type: 'text',
      value: updatedUser.birthday,
      placeholder: 'Ngày sinh',
      onChange: (value) => handleFieldChange('birthday', value),
      icon: <FaBirthdayCake className="bx" />
    },
    {
      label: 'Giới tính',
      type: 'text',
      value: updatedUser.gender,
      placeholder: 'Giới tính',
      onChange: (value) => handleFieldChange('gender', value),
      icon: <FaMapMarkerAlt className="bx" />
    },
    {
      label: 'Cân nặng',
      type: 'text',
      value: updatedUser.weight,
      placeholder: 'Cân nặng',
      onChange: (value) => handleFieldChange('weight', value),
      icon: <FaBirthdayCake className="bx" />
    },
    {
      label: 'Chiều cao',
      type: 'text',
      value: updatedUser.height,
      placeholder: 'Chiều cao',
      onChange: (value) => handleFieldChange('height', value),
      icon: <FaBirthdayCake className="bx" />
    },
    {
      label: 'Email',
      type: 'text',
      value: updatedUser.gmail,
      placeholder: 'Email',
      onChange: (value) => handleFieldChange('gmail', value),
      icon: <MdEmail className="bx" />,
      disabled: true,
    },
  ];

  const selfUserData = useSelector((state) => state.selfAction.user);

  useEffect(() => {
    setUpdatedUser(selfUserData)
    setLoading(false)
  }, [selfUserData]);

  const handleUpdateUser = () => {
    userServiceApi.updateUserWithId({
      ...updatedUser,
      id: selfUserData.id
    })
      .then((res) => {
        console.log(res)
        toast.success('User updated successfully');
        setChangeField(true)
      }).catch((error) => {
        toast.error('Error updating user: ', error);
      })
  };

  const handleFieldChange = (fieldName, value) => {
    setUpdatedUser({
      ...updatedUser,
      [fieldName]: value,
    });
    setChangeField(true)
  };

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="data">
      <div className="recents container">
        <div className="header">
          <BiReceipt className='bx ' />
          <h3>Cài đặt</h3>
        </div>
        <div className='settings-content'>
          {formFields.map((field, index) => (
            <div className='settings-wrapper' key={index}>
              <div>
                {field.icon}
                <label>{field.label}</label>
              </div>
              <input
                className='inp'
                type={field.type}
                value={field.value || ''}
                placeholder={field.placeholder || ''}
                onChange={(e) => field.onChange(e.target.value)}
                disabled={field.disabled}
              />
            </div>
          ))}
        </div>
        <div className='footer-settings end'>
          <button onClick={handleUpdateUser} className={`btn ${changeField ? '' : 'disable'}`}>
            LƯU THAY ĐỔI
          </button>
        </div>

      </div>
      <ToastContainer />

    </div>
  );
};

export default SettingUser;
