import React from 'react';

const ConfirmDelete = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <p>Are you sure you want to delete ?</p>
      <div className='btn-confirm'>
        <button className='btn' onClick={onConfirm}>Yes</button>
        <button className='btn danger' onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
