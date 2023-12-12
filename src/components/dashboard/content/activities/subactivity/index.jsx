/* eslint-disable react/prop-types */
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';

const ActivityItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { activity, handleToggleActivityForm, getSubActivityForActivity, handleDeleteActivities } = props

  return (
    <tr className="process">
      <td>{activity.name}</td>
      <td>{activity.desciption ?? ""}</td>

      <td className='txt-right'>
        <BiPlus className='bx' />
        <BiEdit className='bx' onClick={() => handleToggleActivityForm(activity, getSubActivityForActivity(activity._id))} />
        <BiTrash className='bx ' onClick={() => handleDeleteActivities(activity._id, getSubActivityForActivity(activity._id))} />
      </td>
    </tr>
  );
};

export default ActivityItem;
