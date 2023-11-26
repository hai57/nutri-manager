import { useEffect, useState } from 'react';
import { BiUser, BiReceipt, BiSearch, BiPlus, BiTrash, BiArrowToLeft, BiArrowToRight, BiRefresh } from 'react-icons/bi';

import { userServiceApi } from '@/api/user';
import UserForm from './formUser'


export const UsersInfo = () => {
  const [userData, setUserData] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);

  useEffect(() => {
    getAllUser();
  }, [offset, limit]);

  const getAllUser = async () => {
    try {
      const response = await userServiceApi.getAllUser(offset, limit);
      setUserData(response.usersWithRoles);
      setHasNextPage(response.usersWithRoles.length === limit);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleUserCreated = (newUser) => {
    setUserData((prevData) => [...prevData, newUser]);
  };


  const handleUserUpdated = (updatedUser) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user._id === updatedUser._id ? updatedUser : user,
      )
    );
  };
  const handleToggleUserForm = (user = null) => {
    console.log(selectedUserForUpdate)
    setSelectedUserForUpdate(user);
    setShowUserForm((prev) => !prev);
  };
  const handleDeleteUser = async (userId) => {
    try {
      const response = await userServiceApi.deleteUser({ data: { idUser: userId } });

      if (response.message === 'Request Accepted') {
        setUserData((prevData) => prevData.filter((user) => user._id !== userId));
      } else {
        console.error('Unexpected success message. Response:', response);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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
        </div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Age</th>
              <th>Gmail</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id}>
                <td>
                  <BiUser className='bx img' />
                  <p>{user && user.name}</p>
                </td>
                <td>{user && user.age}</td>
                <td>{user && user.gmail}</td>
                <td>{user && user.address}</td>
                {/* <td><span className="status pending">Pending</span></td> */}
                <td className='fl-right'>
                  <BiRefresh className='bx' onClick={() => handleToggleUserForm(user)} />
                  <BiTrash className='bx' onClick={() => handleDeleteUser(user._id)} />
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
      </div>
      {showUserForm  && (
        <UserForm
          onClose={handleToggleUserForm}
          onUserCreated={handleUserCreated}
          onUserUpdated={handleUserUpdated}
          userDataToUpdate={selectedUserForUpdate}
        />
      )}
    </div>
  );
};
