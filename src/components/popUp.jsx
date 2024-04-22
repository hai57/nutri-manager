/* eslint-disable react/prop-types */
import { BiX } from 'react-icons/bi';

const Popup = ({ onClose, title, formFields, onAccept }) => {
  const hasUserField = formFields.some(field => field.label === 'Email');

  return (
    <div className="popup-overlay">
      <div className={`popup activity${hasUserField ? ' user' : ''}`}>
        <BiX onClick={onClose} className='bx end' />
        <div className="header">
          <h3>{title}</h3>
        </div>
        <form>
          <div className='form-content'>
            {formFields.map((field, index) => (

              <div key={index} className='form-warpper'>
                <label>{field.label}</label>
                {field.type === 'text' ? (
                  <input
                    className='inp'
                    type="text"
                    value={field.value || ''}
                    placeholder={field.placeholder || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                ) : null}
                {field.type === 'password' ? (
                  <input
                    className='inp'
                    type="password"
                    value={field.value || ''}
                    placeholder={field.placeholder || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                ) : null}
                {field.type === 'number' ? (
                  <input
                    className='inp'
                    type="number"
                    value={field.value || ''}
                    placeholder={field.placeholder || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                ) : null}
                {field.type === 'checkbox' ? (
                  <input
                    className='ck-box'
                    type='checkbox'
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                ) : null}
                {field.type === 'select' ? (
                  <select
                    className='inp'
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {field.options.map((option, optionIndex) => (
                      <option
                        key={optionIndex}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : null}
                {field.type === 'date' ? (
                  <input
                    className='inp'
                    type="date"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    max="9999-12-31"
                    min="1000-01-01"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </form>
        <div className='footer-popup end'>
          <button onClick={onAccept} className='btn'>
            CHẤP NHẬN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
