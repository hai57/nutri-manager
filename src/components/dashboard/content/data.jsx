import { BiUser, BiReceipt, BiFilter, BiSearch, BiNote, BiPlus, BiCheckCircle, BiDotsVerticalRounded, BiXCircle } from 'react-icons/bi'
export const Data = () => {
  return (
    <div class="data">
      <div class="recents">
        <div class="header">
          <BiReceipt class='bx ' />
          <h3>Recent</h3>
          <BiFilter class='bx ' />
          <BiSearch class='bx ' />
        </div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <BiUser className='bx img' />
                <p>John Doe</p>
              </td>
              <td>14-08-2023</td>
              <td><span class="status completed">Completed</span></td>
            </tr>
            <tr>
              <td>
                <BiUser className='bx img' />
                <p>John Doe</p>
              </td>
              <td>14-08-2023</td>
              <td><span class="status pending">Pending</span></td>
            </tr>
            <tr>
              <td>
                <BiUser className='bx img' />
                <p>John Doe</p>
              </td>
              <td>14-08-2023</td>
              <td><span class="status process">Processing</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="reminders">
        <div class="header">
          <BiNote class='bx ' />
          <h3>Remiders</h3>
          <BiFilter class='bx ' />
          <BiPlus class='bx ' />
        </div>
        <ul class="task-list">
          <li class="completed">
            <div class="task-title">
              <BiCheckCircle class='bx ' />
              <p>Break fast</p>
            </div>
            <BiDotsVerticalRounded class='bx ' />
          </li>
          <li class="completed">
            <div class="task-title">
              <BiCheckCircle class='bx ' />
              <p>Go to Gym</p>
            </div>
            <BiDotsVerticalRounded class='bx ' />
          </li>
          <li class="not-completed">
            <div class="task-title">
              <BiXCircle class='bx ' />
              <p>Legs exercise</p>
            </div>
            <BiDotsVerticalRounded class='bx ' />
          </li>
        </ul>
      </div>

    </div>
  );
};
