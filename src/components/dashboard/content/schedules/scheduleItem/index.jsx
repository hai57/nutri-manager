/* eslint-disable react/prop-types */
import React from 'react';

import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import { Routing } from '@/utils/routing';

const ScheduleItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { schedule, handleToggleSheduleForm, handleDeleteSchedules } = props

  return (
    <tr className="process">
      <td>{schedule.userCreate}</td>
      <td>{schedule.nameSchedule}</td>
      <td>{schedule.createAt}</td>

      <td >
        {schedule.timeLine.map((timeLineItem, index) => (

          <span key={index}>
            {timeLineItem.activity ? timeLineItem.activity.name : ""}
          </span>

        ))}
      </td>
      <td >
        {schedule.timeLine.map((timeLineItem, index) => (

          <span key={index}>
            {timeLineItem.startTime ? timeLineItem.startTime : ""}
          </span>

        ))}
      </td>
      <td >
        {schedule.timeLine.map((timeLineItem, index) => (

          <span key={index}>
            {timeLineItem.endTime ? timeLineItem.endTime : ""}
          </span>

        ))}
      </td>
      <td className='txt-right'>
        <button className='btn' onClick={() => handleToggleSheduleForm(schedule)} >
          <BiEdit className='bx' />
        </button>
        <button className='btn' onClick={() => handleDeleteSchedules(schedule._id)} >
          <BiTrash className='bx ' />
        </button>
      </td>
    </tr>
  );
};

export default ScheduleItem;
