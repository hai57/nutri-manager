/* eslint-disable react/prop-types */
import { BiEdit, BiTrash } from 'react-icons/bi';

const SubActivityItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { subActivity, handleToggleSubActivityForm, handleDeleteSubActivities } = props

  return (
    <tr className="process">
      <td>{subActivity.subActivityName}</td>
      <td>{subActivity.amount ?? ""}</td>
      <td>{subActivity.unit}</td>

      <td className='txt-right'>
        <button className='btn' onClick={() => handleToggleSubActivityForm(subActivity)} >
          <BiEdit className='bx' />
        </button>
        <button className='btn' onClick={() => handleDeleteSubActivities(subActivity.subActivityId)} >
          <BiTrash className='bx ' />
        </button>

      </td>
    </tr>
  );
};

export default SubActivityItem;
