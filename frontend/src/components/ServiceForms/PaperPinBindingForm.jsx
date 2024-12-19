import React from 'react';

const PaperPinBindingForm = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Color of Binding</label>
        <input
          type="text"
          name="bindingColor"
          value={formData.bindingColor || ''}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter color of binding"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Paper Quality</label>
        <input
          type="text"
          name="paperQuality"
          value={formData.paperQuality || ''}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter paper quality"
        />
      </div>
    </>
  );
};

export default PaperPinBindingForm;
