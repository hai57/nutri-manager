import { useState, useEffect } from 'react';
import { BiArrowToLeft, BiArrowToRight, BiNote, BiPlus } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { activitiesServiceApi } from '@/api/activities';
import SubActivityItem from './SubActivityItem';
import ConfirmDelete from '@/components/confirmDelete ';
import SubActivityForm from './formSubActivity';

export const SubActivity = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState([])
  const [subActivities, setSubActivities] = useState([])
  const [showSubActivity, setShowSubActivity] = useState(false)
  const [selecteSubdActivtyForUpdate, setSelectedSubActivityForUpdate] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubActivities();
    getActivityById()
  }, [offset, limit, id]);

  const getSubActivities = () => {
    activitiesServiceApi.getSubActivitiesByIdActivity(id, offset, limit)
      .then((res) => {
        console.log(res)
        setSubActivities(res.subActivities);
        setHasNextPage(res.subActivities.length === limit);
      }).catch((error) => {
        console.error('Error fetching data:', error);
      }).finally(() => {
        setLoading(false);
      })
  };

  const getActivityById = () => {
    activitiesServiceApi.getActivityById(id)
      .then((res) => {
        console.log(res.activity)
        setActivity(res.activity)
      }).catch((error) => {
        console.error('Error fetching activity by ID:', error);
      })


  };

  const handleSubActivityCreated = (subActivity) => {
    toast.success('Activity created successfully');
    console.log('sub', subActivity)
    setSubActivities((prevData) => [...prevData, subActivity]);
    if (subActivities.length + 1 > limit) {
      setOffset((prevOffset) => prevOffset + limit);
      setHasNextPage(true);
    }
  };

  const handleSubActivityUpdated = (updatedSubActivity) => {
    toast.success('Activity updated successfully');
    console.log('updated Activity', updatedSubActivity)
    setSubActivities((prevData) => {
      const updatedData = prevData.map((subActivity) =>
        subActivity._id === updatedSubActivity._id ? { ...subActivity, ...updatedSubActivity } : subActivity
      );
      console.log('Updated data:', updatedData);
      return updatedData;
    });
  };

  const handleDeleteSubActivities = async (subActivitiesID) => {
    try {
      toast.info(<ConfirmDelete onConfirm={() => confirmDelete(subActivitiesID)} onCancel={() => toast.dismiss()} />, {
      });
    } catch (error) {
      console.error('Error showing confirmation:', error);
    }
  };

  const confirmDelete = (subActivitiesID) => {
    activitiesServiceApi.deleteSubActivities({ data: { subActivitiesID: subActivitiesID } })
      .then(res => {
        console.log(res);
        getSubActivities()

      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleToggleSubActivityForm = (subActivity = null) => {
    if (subActivity === null) {
      setSelectedSubActivityForUpdate(null);
    } else {
      setSelectedSubActivityForUpdate(subActivity);
    }
    setShowSubActivity((prev) => !prev);
  };


  const handleNextPage = () => {
    if (subActivities.length === limit) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="activities container recents">
      <div className="header">
        <BiNote className='bx ' />
        <h3>
          Sub Activities Of
          <span className="capitalize"> {activity.name}</span>
        </h3>
        <button onClick={() => handleToggleSubActivityForm()}>
          <BiPlus className='bx ' />
        </button>
      </div>
      <table className="activities-table">
        <thead>
          <tr>
            <th className='name'>Name</th>
            <th className='amount'>Amount</th>
            <th className='unit'>Unit</th>
            <th className='txt-right action'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subActivities.map((subActivity) => {
            return (
              <SubActivityItem
                key={subActivity._id}
                subActivity={subActivity}
                handleDeleteSubActivities={handleDeleteSubActivities}
                handleToggleSubActivityForm={handleToggleSubActivityForm}
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
      {showSubActivity && (
        <SubActivityForm
          idActivity={id}
          onClose={handleToggleSubActivityForm}
          onSubActivityCreated={handleSubActivityCreated}
          onSubActivityUpdated={handleSubActivityUpdated}
          subActivityDataToUpdate={selecteSubdActivtyForUpdate}
        />
      )
      }
      <ToastContainer />
    </div>
  );

}
