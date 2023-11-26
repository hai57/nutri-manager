import { useState, useEffect } from 'react';

import { BiFilter, BiNote, BiPlus, BiTrash, BiArrowToLeft, BiArrowToRight, BiRefresh } from 'react-icons/bi';
import { activitiesServiceApi } from '@/api/activities';
import ActivityForm from './formActivity'

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
  }, [offset,limit]);

  const getAllActivities = async () => {
    try {
      const response = await activitiesServiceApi.getAllActivities(offset,limit);
      setActivities(response.activities);
      setHasNextPage(response.activities.length === limit);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleActivityCreated = (newActivity) => {
    setActivities((prevData) => [...prevData, newActivity]);
  };
  const handleActivityUpdated = (updatedActivity) => {
    setActivities((prevData) =>
      prevData.map((activity) =>
      activity._id === updatedActivity._id ? updatedActivity : activity,
      )
    );
  };
  const handleDeleteActivities = async (activitiesID) => {
    try {
      // CHi dinh thuoc tinh cho delete
      const response = await activitiesServiceApi.deleteActivities({data: { idActivities: activitiesID },});
      if (response.message === 'Request Accepted') {
        setActivities((prevData) => prevData.filter((activity) => activity._id !== activitiesID));
      } else {
        console.error('Unexpected success message. Response:', response);
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };
  const handleToggleActivityForm = ( activity = null) => {
    setSelectedActivityForUpdate(activity);
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
    <div className="activities container">
      <div className="header">
        <BiNote className='bx ' />
        <h3>Activities</h3>
        <BiFilter className='bx ' />
        <BiPlus className='bx ' onClick={() => handleToggleActivityForm()}/>
      </div>
      <table className="activities-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th className='fl-right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id} className="process">
              <td>{activity.name}</td>
              <td>{activity.description}</td>
              <td className='fl-right'>
                <BiRefresh className='bx' onClick={() => handleToggleActivityForm(activity)} />
                <BiTrash className='bx ' onClick={() => handleDeleteActivities(activity._id)} />
              </td>
            </tr>
          ))}
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
        {showActivityForm  && (
        <ActivityForm
          onClose={handleToggleActivityForm}
          onActivityCreated={handleActivityCreated}
          onActivityUpdated={handleActivityUpdated}
          activityDataToUpdate={selectedActivtyForUpdate}
        />
      )}
    </div>
  )
}
