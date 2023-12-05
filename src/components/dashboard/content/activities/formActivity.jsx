import { useState, useEffect } from 'react';
import { BiX } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { activitiesServiceApi } from '@/api/activities';
import { storage } from "@/utils/storage";

// eslint-disable-next-line react/prop-types
const ActivityForm = ({ onClose, onActivityCreated, onActivityUpdated, activityDataToUpdate }) => {
  const [newActivity, setNewActivity] = useState({
    user: '',
    type: '',
    name: '',
    isParent: false,
    isParentType: '',
    description: ''
  });
  const [newSubActivity, setNewSubActivity] = useState({
    content: ''
  });
  useEffect(() => {
    if (activityDataToUpdate) {
      console.log(activityDataToUpdate);
      setNewActivity(activityDataToUpdate.activity);
      if (activityDataToUpdate.subActivity) {
        setNewSubActivity(activityDataToUpdate.subActivity);
      }
    } else {
      const userId = storage.get('userId');
      setNewActivity(prevActivity => ({ ...prevActivity, user: userId }));
    }
  }, [activityDataToUpdate]);

  const activityAction = () => {
    if (!newActivity.name || !newActivity.description) {
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
            content: newSubActivity.content,
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
      ...newActivity,
      user: storage.get('userId')
    });

    if (res.success) {

      if (newActivity.isParent) {
        // Tạo một subActivity liên quan đến hoạt động mới
        const resSubActivity = await activitiesServiceApi.createSubActivities({
          activity: res.newActivities._id, // Mã ID của hoạt động mới
          content: newSubActivity.content
          // Các trường khác của subActivity nếu cần
        });
        if (resSubActivity.success) {
          console.log(resSubActivity);
          setNewSubActivity(resSubActivity.newSubActivities);
        }


      }
      onActivityCreated({
        activity: { ...newActivity, _id: res.newActivities._id },
        subActivity: { ...newSubActivity }
      })
      setNewActivity({
        user: '',
        type: '',
        name: '',
        isParent: false,
        isParentType: '',
        description: '',
        content: ''
      })
      onClose();
    }
  }

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === 'isParentType') {
      // Nếu lựa chọn là true, đặt giá trị của isParentType tương ứng
      const isParentValue = value === '' ? false : true;

      setNewActivity({
        ...newActivity,
        [fieldName]: value,
        isParent: isParentValue,
      });
    } else if (fieldName === 'content') {
      setNewSubActivity({
        ...newSubActivity,
        [fieldName]: value,
      });
    } else {
      // Nếu không phải là isParent, cập nhật giá trị bình thường
      setNewActivity({
        ...newActivity,
        [fieldName]: value,
      });
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup activity">
        <BiX onClick={onClose} className='bx end' />
        <div className="header">
          <h3>{activityDataToUpdate ? 'UPDATE ACTIVITY' : 'CREATE NEW ACTIVITY'}</h3>
        </div>
        <form className='space'>
          <div className='activity'>
            <input
              className='inp'
              type="text"
              value={newActivity.name || ''}
              placeholder='Name'
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
            <input
              className='inp'
              type="text"
              value={newActivity.description || ''}
              placeholder='Description'
              onChange={(e) => handleFieldChange('description', e.target.value)}
            />
          </div>

          <div className='sub-activity'>
            <select
              className='inp'
              value={newActivity.isParentType || ''}
              onChange={(e) => handleFieldChange('isParentType', e.target.value)}
            >
              <option value=''>--</option>
              <option value='Exercise'>Exercise</option>
              <option value='Food'>Food</option>
            </select>
            {newActivity.isParent && (
              <input
                className='inp'
                type="text"
                value={newSubActivity.content}
                placeholder='Content'
                onChange={(e) => handleFieldChange('content', e.target.value)} />
            )}
          </div>
        </form>
        <button onClick={activityAction} className='btn end'>YES</button>
      </div>
    </div>

  );
};

export default ActivityForm;
