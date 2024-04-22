/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { activitiesServiceApi } from '@/api/activities';
import Popup from '@/components/popUp';


const SubActivityForm = ({ idActivity, onClose, onSubActivityCreated, onSubActivityUpdated, subActivityDataToUpdate }) => {
  const [newSubActivity, setNewSubActivity] = useState({
    subActivityName: '',
    amount: 0,
    unit: 'g'
  });
  const formFields = [
    {
      label: 'Tên hoạt động',
      type: 'text',
      value: newSubActivity.subActivityName,
      placeholder: 'Tên',
      onChange: (value) => handleFieldChange('subActivityName', value),
    },
    {
      label: 'Tốn',
      type: 'number',
      value: newSubActivity.amount,
      placeholder: 'Lượng',
      onChange: (value) => handleFieldChange('amount', value),
    },
    {
      label: 'Đơn vị',
      type: 'select',
      value: newSubActivity.unit,
      options: [
        { value: 'g', label: 'g' },
        { value: 'm', label: 'm' },
      ],
      onChange: (value) => handleFieldChange('unit', value),
    },
  ];

  useEffect(() => {
    if (subActivityDataToUpdate) {
      setNewSubActivity(subActivityDataToUpdate);
    } else {
      setNewSubActivity(prevActivity => ({ ...prevActivity }));
    }
  }, [subActivityDataToUpdate]);

  const activityAction = () => {
    if (!newSubActivity.subActivityName) {
      toast.error('Please fill in all required fields.');
      return;
    }

    subActivityDataToUpdate ? updateSubActivity() : createSubActivity()

  };

  const updateSubActivity = async () => {
    activitiesServiceApi.updateSubActivities({
      ...newSubActivity,
      subActivityId: newSubActivity.subActivityId
    })
      .then((res) => {
        if (res.success) {
          onSubActivityUpdated(newSubActivity);
          setNewSubActivity({
            subActivityName: '',
            amount: 0,
            unit: 'g'
          })
          onClose();
        } else {
          console.error("Error updating sub activity:", res);
        }
      })
      .catch((error) => {
        console.error("Error updating sub activity:", error);
      });
  };

  const createSubActivity = async () => {
    const res = await activitiesServiceApi.createSubActivities({
      ...newSubActivity,
      activityId: idActivity,
    });

    if (res.success) {
      console.log(res)
      const createdSubActivity = { ...newSubActivity, subActivityId: res.subactivity.subActivityId }
      onSubActivityCreated(createdSubActivity)

      setNewSubActivity({
        subActivityName: '',
        amount: 0,
        unit: 'g'
      });
      onClose();
    }
  }

  const handleFieldChange = (fieldName, value) => {
    setNewSubActivity((prevActivity) => ({
      ...prevActivity,
      [fieldName]: value,
    }));
  };

  return (
    <Popup
      onClose={onClose}
      title={subActivityDataToUpdate ? 'UPDATE SUB ACTIVITY' : 'CREATE NEW SUB ACTIVITY'}
      formFields={formFields}
      onAccept={activityAction}
    />
  );
};

export default SubActivityForm;
