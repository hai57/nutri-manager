/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { activitiesServiceApi } from '@/api/activities';
import Popup from '@/components/popUp';

const ActivityForm = ({ onClose, onActivityCreated, onActivityUpdated, activityDataToUpdate }) => {

  const [newActivity, setNewActivity] = useState({
    activityName: '',
    isParent: false,
    description: '',
    type: '6585804f7a4405f172a1bb32',
  });

  const formFields = [
    {
      label: 'Tên hoạt động',
      type: 'text',
      value: newActivity.activityName,
      placeholder: 'Tên',
      onChange: (value) => handleFieldChange('activityName', value),
    },
    {
      label: 'Chi tiết',
      type: 'text',
      value: newActivity.description,
      placeholder: 'Chi tiết',
      onChange: (value) => handleFieldChange('description', value),
    },
    {
      label: 'Kiểu',
      type: 'select',
      value: newActivity.type,
      options: [
        { value: '6585804f7a4405f172a1bb32', label: 'Chuỗi' },
        { value: '658580577a4405f172a1bb34', label: 'Danh sách' },
      ],
      onChange: (value) => handleFieldChange('type', value),
    },
    {
      label: 'Hoạt động con',
      type: 'checkbox',
      value: newActivity.isParent,
      onChange: (value) => handleFieldChange('isParent', value),
    },
  ];
  useEffect(() => {
    if (activityDataToUpdate) {
      setNewActivity(activityDataToUpdate);
    } else {
      setNewActivity(prevActivity => ({ ...prevActivity }));
    }
  }, [activityDataToUpdate]);

  const activityAction = () => {
    if (!newActivity.activityName || !newActivity.description) {
      toast.error('Please fill in all required fields.');
      return;
    }

    activityDataToUpdate ? updateActivity() : createActivity()

  };

  const updateActivity = async () => {
    activitiesServiceApi.updateActivities({
      ...newActivity,
      type: newActivity.type
    })
      .then((res) => {
        if (res.success) {
          console.log(res)
          onActivityUpdated(newActivity);
          setNewActivity({
            activityName: '',
            isParent: false,
            description: '',
            type: '',
          })
          onClose();
        } else {
          console.error("Error updating activity:", res);
        }
      })
      .catch((error) => {
        console.error("Error updating activity:", error);
      });
  };

  const createActivity = async () => {
    const res = await activitiesServiceApi.createActivities({
      ...newActivity,
      type: newActivity.type
    });

    if (res.success) {
      const createdActivity = { ...newActivity, activityId: res.activity.activityId }
      onActivityCreated(createdActivity)

      setNewActivity({
        activityName: '',
        isParent: false,
        description: '',
        type: '650a77bcaed54943b3b370ba',
      });
      onClose();
    }
  }

  const handleFieldChange = (fieldName, value) => {
    setNewActivity((prevActivity) => ({
      ...prevActivity,
      [fieldName]: value,
    }));
  };

  return (
    <Popup
      onClose={onClose}
      title={activityDataToUpdate ? 'UPDATE ACTIVITY' : 'CREATE NEW ACTIVITY'}
      formFields={formFields}
      onAccept={activityAction}
    />
  );
};

export default ActivityForm;
