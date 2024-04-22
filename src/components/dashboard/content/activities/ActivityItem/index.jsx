/* eslint-disable react/prop-types */
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import { Routing } from '@/utils/routing';

const ActivityItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { activity, handleToggleActivityForm, handleDeleteActivities } = props
  return (
    <tr className="process">
      <td>{activity.activityName}</td>
      <td>{activity.description ?? ""}</td>

      <td className='txt-right'>
        {activity.isParent && (
          <a href={`${Routing.subActivities.path}/${activity.activityId}`}>
            <BiPlus className='bx' />
          </a>
        )}
        <button className='btn' onClick={() => handleToggleActivityForm(activity)} >
          <BiEdit className='bx' />
        </button>
        <button className='btn' onClick={() => handleDeleteActivities(activity.activityId)} >
          <BiTrash className='bx ' />
        </button>
      </td>
    </tr>
  );
};

export default ActivityItem;
