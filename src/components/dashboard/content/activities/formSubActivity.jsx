import { useState, useEffect } from 'react';

import { activitiesServiceApi } from '@/api/activities';

// eslint-disable-next-line react/prop-types
const SubActivityForm = () => {
  const [newSubActivity, setNewSubActivity] = useState({
    content: ''
  });

  useEffect(() => {
    if (subActivityDataToUpdate) {
      setNewSubActivity(subActivityDataToUpdate);
    } else {
      setNewSubActivity(prev => ({ ...prev }));
    }
  }, [subActivityDataToUpdate]);

  const handleFieldChange = (fieldName, value) => {
    setNewSubActivity({
      ...newSubActivity,
      [fieldName]: value,
    });
  };

  const subActivityAction = () => {
    if (!newSubActivity.content) {
      toast.error('Please fill in all required fields.');
      return;
    }

    subActivityDataToUpdate ? updateSubActivity() : createSubActivity()
  };

  const updateSubActivity = async () => {
    // Thực hiện logic cập nhật dựa trên newSubActivity và activityId
    const res = await activitiesServiceApi.updateSubActivity({
      ...newSubActivity,
      subsactivitiesID: newSubActivity._id
    });
    if (res.message === "Request Accepted") {
      console.log(res);
      onSubActivityUpdated(newSubActivity)
      onClose();
    }
  }
  const createSubActivity = async () => {
    // Thực hiện logic tạo mới dựa trên newSubActivity và activityId
    const res = await activitiesServiceApi.createSubActivity({
      ...newSubActivity,
      idActivities: activityId,
    });

    // Xử lý phản hồi từ API, ví dụ: kiểm tra res.success
    if (res.success) {
      onSubActivityCreated({ ...newSubActivity, _id: res.newSubActivity._id });
      setNewSubActivity({ content: '' });
      onClose();
    }
  };
  return (
    <>
      <input
        className='inp'
        type="text"
        value={newSubActivity.content}
        placeholder='content'
        onChange={(e) => handleFieldChange('content', e.target.value)}
      />
    </>
  );
};

export default SubActivityForm;
