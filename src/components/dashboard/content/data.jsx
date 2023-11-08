import { useEffect, useState } from 'react';
import axios from 'axios';

import { BiUser, BiReceipt, BiFilter, BiSearch, BiNote, BiPlus, BiCheckCircle, BiDotsVerticalRounded, BiXCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export const Data = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://node-mongodb-api-datn.onrender.com/v1/api/user/getAllUser', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
        setUserData(response.data.usersWithRoles);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/login');
          console.error('Unauthorized: Token expired, logging in again...');
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="data">
      <div className="recents">
        <div className="header">
          <BiReceipt className='bx ' />
          <h3>Recent</h3>
          <BiFilter className='bx ' />
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
                  <p>{user.name}</p>
                </td>
                <td>{user.age}</td>
                <td>{user.gmail}</td>
                <td>{user.address}</td>
                {/* <td><span className="status pending">Pending</span></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="reminders">
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
      </div>

    </div>
  );
};
