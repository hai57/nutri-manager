
import { useEffect, useState } from 'react';
import { BiGroup, BiReceipt } from 'react-icons/bi';
import { FaBirthdayCake, FaMapMarkerAlt } from 'react-icons/fa'
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { userServiceApi } from '../../../../api/user';


const SettingUser = () => {
  const [loading, setLoading] = useState(true)
  const [changeField, setChangeField] = useState(false)
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    age: '',
    gmail: '',
    address: '',
  });
  const formFields = [
    {
      label: 'Họ và tên',
      type: 'text',
      value: updatedUser.name,
      placeholder: 'Tên',
      onChange: (value) => handleFieldChange('name', value),
      icon: <BiGroup className="bx" />
    },
    {
      label: 'Tuổi',
      type: 'text',
      value: updatedUser.age,
      placeholder: 'Tuổi',
      onChange: (value) => handleFieldChange('age', value),
      icon: <FaBirthdayCake className="bx" />
    },
    {
      label: 'Địa chỉ',
      type: 'text',
      value: updatedUser.address,
      placeholder: 'Địa chỉ',
      onChange: (value) => handleFieldChange('address', value),
      icon: <FaMapMarkerAlt className="bx" />
    },
    {
      label: 'Email',
      type: 'text',
      value: updatedUser.gmail,
      placeholder: 'Email',
      onChange: (value) => handleFieldChange('gmail', value),
      icon: <MdEmail className="bx" />
    },
  ];

  const selfUserData = useSelector((state) => state.selfAction.user);

  useEffect(() => {
    setUpdatedUser(selfUserData)

    setLoading(false)
  }, [selfUserData])

  const handleUpdateUser = () => {
    userServiceApi.updateUser({
      ...updatedUser,
      _id: '....'
    })
      .then((res) => {
        console.log(res)
        toast.success('User updated successfully');
        setChangeField(true)
      }).catch((error) => {
        toast.error('Error updating user: ', error);
      })
  };

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  const handleFieldChange = (fieldName, value) => {
    setUpdatedUser({
      ...updatedUser,
      [fieldName]: value,
    });
  };
  return (
    <div className="data">
      <div className="recents container">
        <div className="header">
          <BiReceipt className='bx ' />
          <h3>Settings</h3>
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
