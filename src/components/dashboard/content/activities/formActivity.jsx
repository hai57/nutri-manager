import { useState, useEffect } from 'react';
import { BiX } from 'react-icons/bi';

import { activitiesServiceApi } from '@/api/activities';
import { storage } from "@/utils/storage";

// eslint-disable-next-line react/prop-types
const ActivityForm = ({ onClose, onActivityCreated, onActivityUpdated, activityDataToUpdate }) => {
  const [newActivity, setNewActivity] = useState({
    user: '',
    type: '',
    name: '',
    isParent: '',
    description: ''
  });
  useEffect(() => {
    if (activityDataToUpdate) {
      setNewActivity(activityDataToUpdate);
    } else {
      const userId = storage.get('userId');
      setNewActivity(prevActivity => ({ ...prevActivity, user: userId }));
    }
  }, [activityDataToUpdate]);

  const userAction = async () => {
    try {
      const response = activityDataToUpdate
        ? await activitiesServiceApi.updateActivities(newActivity)
        : await activitiesServiceApi.createActivities({
          ...newActivity,
          user: storage.get('userId'),
        });

        console.log('API Response:', response);

      if (response.message === "Request Accepted" || response.message === "Created Success" ) {
        if (activityDataToUpdate) {
          onActivityUpdated(response.newActivites);
        } else {
          onActivityCreated(response.newActivites);
        }

        setNewActivity({
          user: '',
          type: '',
          name: '',
          description: ''
        });

        onClose();
      } else {
        console.error(`Error ${activityDataToUpdate ? 'updating' : 'creating'} user: Invalid response format`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setNewActivity({
      ...newActivity,
      [fieldName]: value,
    });
  };
  return (
    <div className="popup-overlay">
      <div className="popup">
        <BiX onClick={onClose} className='bx end' />
        <div className="header">
          <h3>{activityDataToUpdate ? 'UPDATE ACTIVITY' : 'CREATE NEW ACTIVITY'}</h3>
        </div>
        <form className='space'>
            <input
              className='inp'
              type="text"
              value={newActivity.name}
              placeholder='Name'
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
            <input
              className='inp'
              type="text"
              value={newActivity.description}
              placeholder='Description'
              onChange={(e) => handleFieldChange('description', e.target.value)}
            />
        </form>
        <button onClick={userAction} className='btn end'>YES</button>
      </div>
    </div>

  );
};

export default ActivityForm;
