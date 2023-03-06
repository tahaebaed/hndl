import React from 'react';

const Fieldset = ({ inputs, legend }) => {
  return (
    <fieldset className='info-wrapper'>
      <legend>
        <h2>{legend}</h2>
      </legend>
      <div className='info-wrapper_inputs'>
        {inputs.map((inpt, index) => (
          <label key={index}>
            <h6>{inpt.title}</h6>
            {inpt.type === 'select' ? (
              <select className='form-control' defaultValue='' {...inpt.register}>
                {inpt.options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={inpt.types}
                className='form-control'
                placeholder={inpt.placeholder}
                min={0}
                {...inpt.register}
              />
            )}

            <span>
              {inpt.span} {inpt.sup && <sup>{inpt.sup}</sup>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default Fieldset;
