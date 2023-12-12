import { useState, useEffect } from 'react';
import { BiFilter, BiNote, BiPlus, BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { activitiesServiceApi } from '@/api/activities';
import ActivityForm from './formActivity'
import ConfirmDelete from '@/components/confirmDelete ';
import ActivityItem from './subactivity';

export const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [subActivities, setSubActivities] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [selectedActivtyForUpdate, setSelectedActivityForUpdate] = useState(null);
  // const [showCheckboxes, setShowCheckboxes] = useState(false);
  // const [selectedActivity, setSelectedActivity] = useState([]);
  // const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllActivities();
    getSubActivities();
  }, [offset, limit]);

  const getAllActivities = async () => {
    try {
      const response = await activitiesServiceApi.getAllActivities(offset, limit);
      console.log(response);
      setActivities(response.activities);
      setHasNextPage(response.activities.length === limit);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const getSubActivities = async () => {
    try {
      const response = await activitiesServiceApi.getSubActivities(offset, limit);
      console.log(response)
      setSubActivities(response.subActivities);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityCreated = ({ activity, subActivity }) => {
    toast.success('Activity created successfully');
    console.log(activity)
    console.log(subActivity)
    setActivities((prevData) => [...prevData, activity]);
    if (subActivity) {
      // Cập nhật danh sách subActivities nếu có
      setSubActivities((prevSubActivities) => [...prevSubActivities, subActivity]);

    }
    //Kiem tra xem tao moi co vuot qua gioi han trang hien tai khong
    if (activities.length + 1 > limit) {
      // tang offset de chuyen trang
      setOffset((prevOffset) => prevOffset + limit);
      setHasNextPage(true);
      console.log(activities)
      console.log(subActivities)
    }
  };

  const handleActivityUpdated = ({ updatedActivity, updatedSubActivity }) => {
    toast.success('Activity updated successfully');
    setActivities((prevData) =>
      prevData.map((activity) =>
        activity._id === updatedActivity._id ? updatedActivity : activity,
      )
    );
    setSubActivities((prevSubActivities) =>
      prevSubActivities.map((subActivity) =>
        subActivity._id === updatedSubActivity._id ? updatedSubActivity : subActivity
      )
    );
  };
  const handleDeleteActivities = async (activitiesID, subActivitiesID) => {
    try {
      // Hien thi confirm toast
      toast.info(<ConfirmDelete onConfirm={() => confirmDelete(activitiesID, subActivitiesID)} onCancel={() => toast.dismiss()} />, {
      });
    } catch (error) {
      console.error('Error showing confirmation:', error);
    }
  }
  const confirmDelete = async (activitiesID, subActivitiesID) => {

    const deleteActivityPromise = activitiesServiceApi.deleteActivities({ data: { idActivities: activitiesID } });

    if (subActivitiesID) {
      const deleteSubActivityPromise = activitiesServiceApi.deleteSubActivities({ data: { subActivitiesID: subActivitiesID } });
      await Promise.all([deleteActivityPromise, deleteSubActivityPromise]);
    } else {
      // Chỉ gọi API xóa activity nếu không có subActivitiesID hoặc indexOfDeleted nằm trong khoảng trang hiện tại
      await deleteActivityPromise;
    }

    // Xử lý kết quả
    console.log(activities);
    getAllActivities();
    getSubActivities()

    if (activities.length === limit) {
      setHasNextPage(false);

    }
  };

  const handleToggleActivityForm = (activity = null, subActivity = null) => {
    if (activity === null && subActivity === null) {
      setSelectedActivityForUpdate(null);
    } else {
      setSelectedActivityForUpdate({ activity, subActivity });
    }
    setShowActivityForm((prev) => !prev);
  };

  // const handleToggleCheckboxes = () => {
  //   setShowCheckboxes((prev) => !prev);
  // };

  // const handleActivityCheckboxToggle = (activitiesID, subActivitiesID) => {
  //   if (selectAllCheckbox) {
  //     // Nếu "Chọn tất cả" đã được chọn, khi click vào bất kỳ checkbox nào cũng sẽ bỏ chọn "Chọn tất cả"
  //     setSelectAllCheckbox(false);
  //   }

  //   if (subActivitiesID === undefined) {
  //     // Nếu không có subActivitiesID, chỉ thêm hoặc loại bỏ activity
  //     setSelectedActivity((prev) =>
  //       prev.includes(activitiesID)
  //         ? prev.filter((id) => id !== activitiesID)
  //         : [...prev, activitiesID]
  //     );
  //   } else {
  //     // Nếu có subActivitiesID, thêm cả activity và subActivity (nếu có)
  //     setSelectedActivity((prev) =>
  //       prev.includes(activitiesID) && prev.includes(subActivitiesID._id)
  //         ? prev.filter((id) => id !== activitiesID && id !== subActivitiesID._id)
  //         : [...prev, activitiesID, subActivitiesID._id]
  //     );
  //   }
  // };

  // const confirmDeleteMulti = async (activitiesIDs) => {

  //   const deletePromises = activitiesIDs.map((activitiesID) => {
  //     // Lấy thông tin subActivity cho activityID
  //     const subActivity = getSubActivityForActivity(activitiesID);

  //     // Tạo mảng promises cho cả activity và subActivity
  //     const promises = [
  //       activitiesServiceApi.deleteActivities({ data: { idActivities: activitiesID } }),
  //     ];

  //     if (subActivity) {
  //       promises.push(
  //         activitiesServiceApi.deleteSubActivities({ data: { subActivitiesID: subActivity._id } })
  //       );
  //     }

  //     return Promise.all(promises);
  //   });

  //   Promise.all(deletePromises)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((errors) => {
  //       console.error(errors);
  //     })
  //     .finally(() => {
  //       getAllActivities();

  //       setSelectedActivity([]);
  //       setShowCheckboxes(false);
  //       setSelectAllCheckbox(false)
  //     });
  // };

  const getSubActivityForActivity = (activityID) => {
    return subActivities.find((subActivity) => subActivity.idActivities === activityID);
  };

  // const handleSelectAllCheckbox = () => {
  //   setSelectAllCheckbox((prev) => !prev);
  //   setSelectedActivity(() => selectAllCheckbox ? [] : activities.map(activity => activity._id));
  // };

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
        <BiPlus className='bx ' onClick={() => handleToggleActivityForm()} />
        {/* <BiTrash className='bx ' onClick={handleToggleCheckboxes} /> */}
      </div>
      <table className="activities-table">
        <thead>
          <tr>
            {/* {showCheckboxes && (
              <th className='select'>Select <input
                className='ck-box'
                type="checkbox"
                checked={selectAllCheckbox}
                onChange={handleSelectAllCheckbox}
              /></th>
            )} */}
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
                // showCheckboxes={showCheckboxes}
                handleToggleActivityForm={handleToggleActivityForm}
                // selectedActivity={selectedActivity}
                // handleActivityCheckboxToggle={handleActivityCheckboxToggle}
                getSubActivityForActivity={getSubActivityForActivity}
                handleDeleteActivities={handleDeleteActivities}
              />
            )
          })}
        </tbody>
      </table>
      {/* {showCheckboxes && (
        <div className='delete'>
          <div>
            <span>Select All</span>
            <input
              className='ck-box'
              type="checkbox"
              checked={selectAllCheckbox}
              onChange={handleSelectAllCheckbox}
            />
          </div>

          <button className='btn-delete' onClick={() => confirmDeleteMulti(selectedActivity)}>Delete</button>
        </div>
      )} */}
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
