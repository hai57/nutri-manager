import { useState, useEffect } from 'react';
import { BiFilter, BiNote, BiPlus, BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';

import { scheduleServiceApi } from '@/api/schedule';
import ScheduleItem from './scheduleItem';
import ScheduleForm from './formSchedule';

export const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [selectedScheduleForUpdate, setSelectedScheduleForUpdate] = useState(null)
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSchedule();
  }, [offset, limit]);

  const getSchedule = async () => {
    scheduleServiceApi.getSchedule(offset, limit)
      .then((res) => {
        console.log(res)
        setSchedules(res.items);
        setHasNextPage(res.items.length === limit);
      }).catch((error) => {
        console.error('Error fetching data:', error);
      }).finally(() => {
        setLoading(false);
      })
  };

  const handleToggleSheduleForm = (schedule = null) => {
    if (schedule === null) {
      setSelectedScheduleForUpdate(null);
    } else {
      console.log(schedule);
      setSelectedScheduleForUpdate(schedule);
    }
    setShowScheduleForm((prev) => !prev);
  };

  const handleSheduleCreated = (schedule) => {
    toast.success('Activity created successfully');
    setSchedules((prevData) => [...prevData, schedule]);
    if (schedules.length + 1 > limit) {
      setOffset((prevOffset) => prevOffset + limit);
      setHasNextPage(true);
    }
  };

  const handleScheduleUpdated = (updatedSchedule) => {
    toast.success('Activity updated successfully');
    setSchedules((prevData) => {
      const updatedData = prevData.map((schedule) =>
        schedule._id === updatedSchedule._id ? { ...schedule, ...updatedSchedule } : schedule
      );
      return updatedData;
    });
  }

  const handleDeleteSchedules = async (scheduleId) => {
    try {
      toast.info(<ConfirmDelete onConfirm={() => confirmDelete(scheduleId)} onCancel={() => toast.dismiss()} />, {
      });
    } catch (error) {
      console.error('Error showing confirmation:', error);
    }
  };

  const handleNextPage = () => {
    if (schedules.length === limit) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="activities container recents">
      <div className="header">
        <BiNote className='bx ' />
        <h3>Lịch trình</h3>
        <BiFilter className='bx ' />
        <button onClick={() => handleToggleSheduleForm()}>
          <BiPlus className='bx ' />
        </button>
      </div>
      <table className="activities-table">
        <thead>
          <tr>
            <th className='w-15'>Người tạo</th>
            <th className='w-15'>Tên lịch trình</th>
            <th className='w-15'>Thòi gian tạo</th>
            <th className='w-15'>Hoạt động</th>
            <th className='w-10'>Bắt đầu</th>
            <th className='w-10'>Kết thúc</th>
            <th className='txt-center w-15'>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => {
            return (
              <ScheduleItem
                key={schedule.id}
                schedule={schedule}
                handleToggleSheduleForm={handleToggleSheduleForm}
                handleDeleteSchedules={handleDeleteSchedules}
              />
            )
          })}
        </tbody>
      </table>

      <div className="pos-center">
        <BiArrowToLeft
          className={`bx ${offset === 0 ? 'disabled' : ''}`}
          onClick={offset === 0 ? null : handlePrevPage}
        />
        <span>{`${offset / limit + 1}`}</span>
        <BiArrowToRight
          className={`bx ${!hasNextPage ? 'disabled' : ''}`}
          onClick={!hasNextPage ? null : handleNextPage}
        />
      </div>
      {
        showScheduleForm && (
          <ScheduleForm
            onClose={handleToggleSheduleForm}
            onScheduleCreated={handleSheduleCreated}
            onScheduleUpdated={handleScheduleUpdated}
            scheduleDataToUpdate={selectedScheduleForUpdate}
          />
        )
      }

      <ToastContainer />
    </div>
  )
}
