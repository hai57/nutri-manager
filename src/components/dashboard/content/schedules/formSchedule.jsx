/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BiX } from 'react-icons/bi';


import { scheduleServiceApi } from '@/api/schedule';

const ScheduleForm = ({ onClose, onScheduleCreated, onScheduleUpdated, scheduleDataToUpdate }) => {
  const [newSchedule, setNewSchedule] = useState({
    nameSchedule: '',
    type: '',
    timeLine: [{
      startTime: '',
      endTime: '',
      activity: '',
      subActivities: []
    }],
  });

  const formFields = [
    {
      label: 'Tên hoạt động',
      type: 'text',
      value: newSchedule.nameSchedule,
      placeholder: 'Nhập tên hoạt động',
      onChange: (value) => handleFieldChange('nameSchedule', value),
    },
    {
      label: 'Loại hoạt động',
      type: 'text',
      value: newSchedule.type,
      placeholder: 'Nhập loại hoạt động',
      onChange: (value) => handleFieldChange('type', value),
    },
    ...newSchedule.timeLine.map((tl, index) => (
      [
        {
          label: `Thời gian bắt đầu - Hoạt động ${index + 1}`,
          type: 'text',
          value: tl.startTime,
          placeholder: 'Nhập thời gian bắt đầu',
          onChange: (value) => handleFieldChange(`timeLine[${index}].startTime`, value),
        },
        {
          label: `Thời gian kết thúc - Hoạt động ${index + 1}`,
          type: 'text',
          value: tl.endTime,
          placeholder: 'Nhập thời gian kết thúc',
          onChange: (value) => handleFieldChange(`timeLine[${index}].endTime`, value),
        },
        {
          label: `Hoạt động - Hoạt động ${index + 1}`,
          type: 'text',
          value: tl.activity,
          placeholder: 'Nhập hoạt động',
          onChange: (value) => handleFieldChange(`timeLine[${index}].activity`, value),
        },
      ]
    )),
  ];

  useEffect(() => {
    if (scheduleDataToUpdate) {
      setNewSchedule(scheduleDataToUpdate);
    } else {
      setNewSchedule(prevSchedule => ({ ...prevSchedule }));
    }
  }, [scheduleDataToUpdate]);

  const scheduleAction = () => {
    if (!newSchedule) {
      toast.error('Please fill in all required fields.');
      return;
    }

    scheduleDataToUpdate ? updateSchedule() : createSchedule()

  };

  const updateSchedule = async () => {
    scheduleServiceApi.updateSchedule({
      ...newSchedule,
      scheduleId: newSchedule._id,
      name: newSchedule.nameSchedule
    })
      .then((res) => {
        if (res.success) {
          onScheduleUpdated(newSchedule);
          setNewSchedule({
            name: '',
            isParent: false,
            desciption: '',
            idType: '',
          })
          onClose();
        } else {
          console.error("Error updating schedule:", res);
        }
      })
      .catch((error) => {
        console.error("Error updating schedule:", error);
      });
  };

  const createSchedule = async () => {
    const res = await scheduleServiceApi.createSchedule({
      ...newSchedule
    });

    if (res.success) {
      const createdSchedule = { ...newSchedule, _id: res.schedule._id }
      onScheduleCreated(createdSchedule)

      setNewSchedule({
        name: '',
        isParent: false,
        desciption: '',
        idType: '650a77bcaed54943b3b370ba',
      });
      onClose();
    }
  }

  const handleFieldChange = (fieldName, value) => {
    setNewSchedule((prevActivity) => ({
      ...prevActivity,
      [fieldName]: value,
    }));
  };

  return (
    <div className="popup-overlay">
      <div className="popup activity">
        <BiX onClick={onClose} className='bx end' />
        <div className="header">
          <h3>{updateSchedule}</h3>
        </div>
        <form>
          <div className='form-content'>
            <div className='form-warpper'>
              <label>Tên hoạt động</label>
              <input
                type="text"
                value={newSchedule.nameSchedule}
                placeholder="Nhập tên hoạt động"
                onChange={(e) => handleFieldChange('nameSchedule', e.target.value)}
              />
            </div>
            <div className='form-warpper'>
              <label>Loại hoạt động</label>
              <input
                type="text"
                value={newSchedule.type}
                placeholder="Nhập loại hoạt động"
                onChange={(e) => handleFieldChange('type', e.target.value)}
              />
            </div>
            {newSchedule.timeLine.map((tl, index) => (
              <div className='form-warpper' key={index}>
                <label>{`Thời gian bắt đầu - Hoạt động ${index + 1}`}</label>
                <input
                  type="text"
                  value={tl.startTime}
                  placeholder="Nhập thời gian bắt đầu"
                  onChange={(e) => handleFieldChange(`timeLine[${index}].startTime`, e.target.value)}
                />
                <label>{`Thời gian kết thúc - Hoạt động ${index + 1}`}</label>
                <input
                  type="text"
                  value={tl.endTime}
                  placeholder="Nhập thời gian kết thúc"
                  onChange={(e) => handleFieldChange(`timeLine[${index}].endTime`, e.target.value)}
                />
                <label>{`Hoạt động - Hoạt động ${index + 1}`}</label>
                <input
                  type="text"
                  value={tl.activity}
                  placeholder="Nhập hoạt động"
                  onChange={(e) => handleFieldChange(`timeLine[${index}].activity`, e.target.value)}
                />
              </div>
            ))}
          </div>
        </form>
        <div className='footer-popup end'>
          <button onClick={onAccept} className='btn'>
            CHẤP NHẬN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;
