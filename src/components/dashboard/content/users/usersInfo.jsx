import { useEffect, useState } from 'react';
import { BiUser, BiReceipt, BiSearch, BiPlus, BiTrash, BiArrowToLeft, BiArrowToRight, BiEdit } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { userServiceApi } from '@/api/user';
import UserForm from './formUser'
import ConfirmDelete from '@/components/confirmDelete ';


export const UsersInfo = () => {
  const [userData, setUserData] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const selfUserData = useSelector((state) => state.selfAction.user);

  useEffect(() => {
    getAllUser();
  }, [offset, limit, selfUserData]);

  const getAllUser = async () => {
    userServiceApi.getAllUser(offset, limit)
      .then((res) => {
        console.log(res)
        console.log(selfUserData)
        const filteredUserData = res.usersWithRoles.filter(user => user._id !== selfUserData._id);

        setUserData(filteredUserData);
        setHasNextPage(filteredUserData.length === limit);
      }).catch((error) => {
        console.error('Error fetching data:', error);
      }).finally(() => {
        setLoading(false);
      })
  };

  const handleUserCreated = (newUser) => {
    toast.success('User created successfully');
    console.log(newUser);
    setUserData((prevData) => [...prevData, newUser]);
    //Kiem tra xem tao moi co vuot qua gioi han trang hien tai khong
    if (userData.length + 1 > limit) {
      // tang offset de chuyen trang
      setOffset((prevOffset) => prevOffset + limit);
      setHasNextPage(true);
    }

  };


  const handleUserUpdated = (updatedUser) => {
    toast.success('User updated successfully');
    setUserData((prevData) =>
      prevData.map((user) =>
        user._id === updatedUser._id ? updatedUser : user,
      )
    );
  };

  const handleToggleUserForm = (user = null) => {
    setSelectedUserForUpdate(user);
    setShowUserForm((prev) => !prev);
  };

  const handleDeleteUser = (userId) => {
    try {
      // Hien thi confirm toast
      toast.info(<ConfirmDelete onConfirm={() => confirmDelete(userId)} onCancel={() => toast.dismiss()} />, {
      });
    } catch (error) {
      console.error('Error showing confirmation:', error);
    }
  }

  const confirmDelete = (userId) => {
    userServiceApi.deleteUser({ data: { idUser: userId } })
      .then(res => {
        console.log(res);
        getAllUser()

      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleToggleCheckboxes = () => {
    console.log(selectedUsers)
    setShowCheckboxes((prev) => !prev);
  };

  const handleUserCheckboxToggle = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers((prev) =>
        prev.filter((id) => id !== userId)
      );
    } else {
      setSelectedUsers((prev) => [...prev, userId]);
    }
  };

  const confirmDeleteMulti = (userIds) => {
    const deletePromises = userIds.map((userId) => {
      return userServiceApi.deleteUser({ data: { idUser: userId } });
    });
    Promise.all(deletePromises)
      .then((res) => {
        console.log(res);
      })
      .catch((errors) => {
        // Xử lý lỗi nếu cần
        console.error(errors);
      })
      .finally(() => {
        getAllUser();

        setSelectedUsers([]);
        setShowCheckboxes(false);
      });
  };

  const handleNextPage = () => {
    if (userData.length === limit) {
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
    <div className="data">
      <div className="recents container">
        <div className="header">
          <BiReceipt className='bx ' />
          <h3>Recent</h3>
          <BiPlus className='bx ' onClick={() => handleToggleUserForm()} />
          <BiSearch className='bx ' />
          <BiTrash className='bx ' onClick={handleToggleCheckboxes} />
        </div>
        <table>
          <thead>
            <tr>
              {showCheckboxes && (
                <th className='select'>Select</th>
              )}
              <th >User</th>
              <th className='age'>Age</th>
              <th className='gmail'>Email</th>
              <th className='address'>Address</th>
              <th className='action txt-right'>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id} >
                {showCheckboxes && (
                  <td className='td-select'>
                    <input
                      className='ck-box'
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleUserCheckboxToggle(user._id)}
                    />
                  </td>
                )}
                <td className='td-user' >
                  <BiUser className='bx img' />
                  <p>{user && user.name}</p>
                </td>
                <td>{user && user.age}</td>
                <td>{user && user.gmail}</td>
                <td>{user && user.address}</td>
                {/* <td><span className="status pending">Pending</span></td> */}
                <td className='txt-right'>
                  <button className='btn' onClick={() => handleToggleUserForm(user)} >
                    <BiEdit className='bx' />
                  </button>
                  <button className='btn' onClick={() => handleDeleteUser(user._id)} >
                    <BiTrash className='bx ' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showCheckboxes && (
          <div className='delete'>
            <button className='btn-delete' onClick={() => confirmDeleteMulti(selectedUsers)}>Delete</button>
          </div>
        )}
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
      </div>
      {showUserForm && (
        <UserForm
          onClose={handleToggleUserForm}
          onUserCreated={handleUserCreated}
          onUserUpdated={handleUserUpdated}
          userDataToUpdate={selectedUserForUpdate}
        />
      )}
      <ToastContainer />
    </div>
  );
};
