import { useState, useEffect } from 'react';
import { BiFilter, BiNote, BiPlus, BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';

import { activitiesServiceApi } from '@/api/activities';
import ActivityForm from './formActivity'
import ConfirmDelete from '@/components/confirmDelete ';
import ActivityItem from './ActivityItem';

export const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [selectedActivtyForUpdate, setSelectedActivityForUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllActivities();
  }, [offset, limit]);

  const getAllActivities = async () => {
    activitiesServiceApi.getAllActivities(offset, limit)
      .then((res) => {
        setActivities(res.activities);
        setHasNextPage(res.activities.length === limit);
      }).catch((error) => {
        console.error('Error fetching data:', error);
      }).finally(() => {
        setLoading(false);
      })
  };

  const handleActivityCreated = (activity) => {
    toast.success('Activity created successfully');
    setActivities((prevData) => [...prevData, activity]);
    if (activities.length + 1 > limit) {
      setOffset((prevOffset) => prevOffset + limit);
      setHasNextPage(true);
    }
  };

  const handleActivityUpdated = (updatedActivity) => {
    toast.success('Activity updated successfully');
    console.log('updated Activity', updatedActivity)
    setActivities((prevData) => {
      const updatedData = prevData.map((activity) =>
        activity._id === updatedActivity._id ? { ...activity, ...updatedActivity } : activity
      );
      console.log('Updated data:', updatedData);
      return updatedData;
    });
  };

  const handleDeleteActivities = async (activitiesID) => {
    try {
      toast.info(<ConfirmDelete onConfirm={() => confirmDelete(activitiesID)} onCancel={() => toast.dismiss()} />, {
      });
    } catch (error) {
      console.error('Error showing confirmation:', error);
    }
  };

  const confirmDelete = (activitiesID) => {
    activitiesServiceApi.deleteActivities({ data: { idActivities: activitiesID } })
      .then(res => {
        console.log(res);
        getAllActivities()

      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleToggleActivityForm = (activity = null) => {
    if (activity === null) {
      setSelectedActivityForUpdate(null);
    } else {
      setSelectedActivityForUpdate(activity);
    }
    setShowActivityForm((prev) => !prev);
  };

  const handleNextPage = () => {
    if (activities.length === limit) {
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
        <h3>Activities</h3>
        <BiFilter className='bx ' />
        <button onClick={() => handleToggleActivityForm()}>
          <BiPlus className='bx ' />
        </button>
      </div>
      <table className="activities-table">
        <thead>
          <tr>
            <th className='name'>Name</th>
            <th className='description'>Description</th>
            <th className='txt-right action'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => {
            return (
              <ActivityItem
                key={activity._id}
                activity={activity}
                handleToggleActivityForm={handleToggleActivityForm}
                handleDeleteActivities={handleDeleteActivities}
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
        showActivityForm && (
          <ActivityForm
            onClose={handleToggleActivityForm}
            onActivityCreated={handleActivityCreated}
            onActivityUpdated={handleActivityUpdated}
            activityDataToUpdate={selectedActivtyForUpdate}
          />
        )
      }
      <ToastContainer />
    </div>
  )
}
