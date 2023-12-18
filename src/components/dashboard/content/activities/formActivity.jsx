/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { activitiesServiceApi } from '@/api/activities';
import Popup from '@/components/popUp';

const ActivityForm = ({ onClose, onActivityCreated, onActivityUpdated, activityDataToUpdate }) => {
  const [newActivity, setNewActivity] = useState({
    name: '',
    isParent: false,
    desciption: '',
    idType: '650a77bcaed54943b3b370ba',
  });
  const formFields = [
    {
      label: 'Tên hoạt động',
      type: 'text',
      value: newActivity.name,
      placeholder: 'Tên',
      onChange: (value) => handleFieldChange('name', value),
    },
    {
      label: 'Chi tiết',
      type: 'text',
      value: newActivity.desciption,
      placeholder: 'Chi tiết',
      onChange: (value) => handleFieldChange('desciption', value),
    },
    {
      label: 'Kiểu',
      type: 'select',
      value: newActivity.idType,
      options: [
        { value: '650a77bcaed54943b3b370ba', label: 'Chuỗi' },
        { value: '650a77c5aed54943b3b370bc', label: 'Danh sách' },
      ],
      onChange: (value) => handleFieldChange('idType', value),
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
    if (!newActivity.name || !newActivity.desciption) {
      toast.error('Please fill in all required fields.');
      return;
    }

    activityDataToUpdate ? updateActivity() : createActivity()

  };

  const updateActivity = async () => {
    activitiesServiceApi.updateActivities({
      ...newActivity,
      idActivities: newActivity._id,
      typeActivities: newActivity.idType
    })
      .then((res) => {
        if (res.success) {
          onActivityUpdated(newActivity);
          setNewActivity({
            name: '',
            isParent: false,
            desciption: '',
            idType: '',
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
      ...newActivity
    });

    if (res.success) {
      const createdActivity = { ...newActivity, _id: res.newActivities._id }
      onActivityCreated(createdActivity)

      setNewActivity({
        name: '',
        isParent: false,
        desciption: '',
        idType: '650a77bcaed54943b3b370ba',
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
