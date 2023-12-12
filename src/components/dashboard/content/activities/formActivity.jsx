/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { BiX } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { activitiesServiceApi } from '@/api/activities';

const ActivityForm = ({ onClose, onActivityCreated, onActivityUpdated, activityDataToUpdate }) => {
  const [newActivity, setNewActivity] = useState({
    name: '',
    isParent: false,
    description: '',
    type: '',
  });
  const [newSubActivity, setNewSubActivity] = useState({
    name: '',
    amount: 0
  });
  useEffect(() => {
    if (activityDataToUpdate) {
      setNewActivity(activityDataToUpdate.activity);
      if (activityDataToUpdate.subActivity) {
        setNewSubActivity(activityDataToUpdate.subActivity);
      }
    } else {
      setNewActivity(prevActivity => ({ ...prevActivity }));
    }
  }, [activityDataToUpdate]);

  const activityAction = () => {
    if (!newActivity.name) {
      toast.error('Please fill in all required fields.');
      return;
    }

    activityDataToUpdate ? updateActivity() : createActivity()

  };

  const updateActivity = async () => {
    activitiesServiceApi.updateActivities({
      ...newActivity,
      idActivities: newActivity._id,
    })
      .then(res => {
        if (res.success && newActivity.isParent) {
          // Nếu có hoạt động con và content, thực hiện cập nhật hoạt động con
          return activitiesServiceApi.updateSubActivities({
            subActivitiesID: newSubActivity._id,
            amount: newSubActivity.amount,
          });
        } else {
          // Trả về một promise được giải quyết ngay lập tức nếu không cần cập nhật hoạt động con
          return Promise.resolve();
        }
      }).then((subActivityRes) => {
        // Xử lý kết quả từ API cho hoạt động con
        if (subActivityRes.success) {

          onActivityUpdated({ updatedActivity: newActivity, updatedSubActivity: newSubActivity });
          onClose();
        } else {
          console.error("Error updating subActivity:", subActivityRes);
        }
      })
      .catch((error) => {
        console.error("Error updating activity and subActivity:", error);
      });
  };

  const createActivity = async () => {
    const res = await activitiesServiceApi.createActivities({
      ...newActivity
    });

    if (res.success) {

      onActivityCreated({
        activity: { ...newActivity, _id: res.newActivities._id }, //có _id: res.newActivities._id để tránh lỗi unquie key
      })

      setNewActivity({
        name: '',
        isParent: false,
        description: '',
        type: '',
      });
      onClose();
    }
  }

  const handleFieldChange = (fieldName, value) => {
    // if (fieldName === "amount") {
    //   const numericValue = parseFloat(value);
    //   // Kiểm tra nếu giá trị là một số hợp lệ và không nhỏ hơn 0
    //   if (!isNaN(numericValue) && numericValue >= 0) {
    //     setNewSubActivity({
    //       ...newSubActivity,
    //       [fieldName]: numericValue
    //     });
    //   } else {
    //     // Nếu giá trị không hợp lệ, đặt giá trị về 0
    //     setNewSubActivity({
    //       ...newSubActivity,
    //       [fieldName]: 0
    //     });
    //   }
    // } else if (fieldName === "description") {
    //   setNewSubActivity({
    //     ...newSubActivity,
    //     name: value
    //   });
    // if (fieldName === 'type') {

    // }
    // } else {
    setNewActivity({
      ...newActivity,
      [fieldName]: value,
    });
    // }
  };

  return (
    <div className="popup-overlay">
      <div className="popup activity">
        <BiX onClick={onClose} className='bx end' />
        <div className="header">
          <h3>{activityDataToUpdate ? 'UPDATE ACTIVITY' : 'CREATE NEW ACTIVITY'}</h3>
        </div>
        {/* <form className='space'>
          <div className='activity'>
            <div className='fl_left'>
              <input
                className='inp'
                type="text"
                value={newActivity.name || ''}
                placeholder='Name'
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
              <div className='isCalories'>
                <span>Include in Calories</span>
                <input
                  className='ck-box'
                  type='checkbox'
                  checked={newActivity.isParent || false}
                  onChange={(e) => handleFieldChange('isParent', e.target.checked)}
                />
              </div>
            </div>
            <div className='fl_right'>
              <input
                className='inp'
                type="text"
                value={newActivity.time || ''}
                placeholder='Time'
                onChange={(e) => handleFieldChange('time', e.target.value)}
              />

            </div>
          </div>

          <div className='sub-activity'>

            {newActivity.isParent && (
              <>
                <input
                  className='inp'
                  type="text"
                  value={newSubActivity.name || ''}
                  placeholder='Description'
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                />
                <input
                  className='inp'
                  type="text"
                  value={newSubActivity.amount}
                  placeholder='Amount'
                  onChange={(e) => handleFieldChange('amount', e.target.value)}
                />
              </>
            )}
          </div>
        </form> */}
        <form>
          <div className='form-content'>
            <div className='form-warpper'>
              <label>Tên hoạt động: </label>
              <input
                className='inp'
                type="text"
                value={newActivity.name || ''}
                placeholder='Tên'
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            </div>
            <div className='form-warpper'>
              <label>Chi tiết: </label>
              <input
                className='inp'
                type="text"
                value={newActivity.description || ''}
                placeholder='Chi tiết'
                onChange={(e) => handleFieldChange('description', e.target.value)}
              />
            </div>
            <div className='form-warpper'>
              <label>Kiểu: </label>
              <select
                className='inp'
                value={newActivity.type}
                onChange={(e) => handleFieldChange('type', e.target.value)}
              >
                <option value="650a77bcaed54943b3b370ba">Chuỗi</option>
                <option value="650a77c5aed54943b3b370bc">Danh sách</option>
              </select>
            </div>
            <div className='form-warpper'>
              <label>Hoạt động con: </label>
              <input
                className='ck-box'
                type='checkbox'
                checked={newActivity.isParent || false}
                onChange={(e) => handleFieldChange('isParent', e.target.checked)}
              />
            </div>
          </div>
        </form>
        <div className='footer-popup end'>
          <button onClick={activityAction} className='btn'>ACCEPTED</button>
        </div>
      </div>
    </div>

  );
};

export default ActivityForm;
