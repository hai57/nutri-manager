import { useEffect, useState } from 'react';
import { BiUser, BiReceipt, BiSearch, BiPlus, BiX } from 'react-icons/bi';

import { userServiceApi } from '@/api/user';
import CreateUserForm from './formUser'


export const Data = () => {
  const [userData, setUserData] = useState([]);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userServiceApi.getAllUser();
        setUserData(response.usersWithRoles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUserCreated = (newUser) => {
    setUserData((prevData) => [...prevData, newUser]);
  };

  const handleToggleCreateUserForm = () => {
    setShowCreateUserForm((prev) => !prev);
  };

  const handleDeleteUser = async (userId) => {
    try {
      console.log(userId);
      const response = await userServiceApi.deleteUser({ userId });
      if (response.status === 200) {
        console.log("User deleted successfully:", response.data);
        setUserData((prevData) => prevData.filter((user) => user.id !== userId));
      } else {
        console.error('Error deleting user. Response:', response);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
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
          <BiPlus className='bx ' onClick={handleToggleCreateUserForm} />
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
            {userData.map((user, index) => (
              <tr key={index}>
                <td>
                  <BiUser className='bx img' />
                  <p>{user && user.name}</p>
                </td>
                <td>{user && user.age}</td>
                <td>{user && user.gmail}</td>
                <td>{user && user.address}</td>
                {/* <td><span className="status pending">Pending</span></td> */}
                <td>
                  <BiX className='bx img' onClick={() => handleDeleteUser(user._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showCreateUserForm && (
        <CreateUserForm
          onClose={handleToggleCreateUserForm}
          onUserCreated={handleUserCreated}
        />
      )}

      {/* <div className="reminders">
        <div className="header">
          <BiNote className='bx ' />
          <h3>Remiders</h3>
          <BiFilter className='bx ' />
          <BiPlus className='bx ' />
        </div>
        <ul className="task-list">
          <li className="completed">
            <div className="task-title">
              <BiCheckCircle className='bx ' />
              <p>Break fast</p>
            </div>
            <BiDotsVerticalRounded className='bx ' />
          </li>
          <li className="completed">
            <div className="task-title">
              <BiCheckCircle className='bx ' />
              <p>Go to Gym</p>
            </div>
            <BiDotsVerticalRounded className='bx ' />
          </li>
          <li className="not-completed">
            <div className="task-title">
              <BiXCircle className='bx ' />
              <p>Legs exercise</p>
            </div>
            <BiDotsVerticalRounded className='bx ' />
          </li>
        </ul>
      </div> */}

    </div>
  );
};
