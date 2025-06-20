import React, { useState } from "react";

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: null,
    additionalImages: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
   
      setFormData({ ...formData, [name]: value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 bg-[#111111c7] backdrop-blur-lg  rounded-2xl space-y-6 mt-24 "
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Add New Item
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Item Name
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none text-gray-800 dark:text-white"
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Item Type
        </label>
        <select
          name="type"
          required
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none text-gray-800 dark:text-white"
        >
          <option value="">Select Type</option>
          <option value="Shirt">Shirt</option>
          <option value="Pant">Pant</option>
          <option value="Shoes">Shoes</option>
          <option value="Sports Gear">Sports Gear</option>
           <option value="Others">Others</option>
        </select>
      </div>

      {/* Item Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Item Description
        </label>
        <textarea
          name="description"
          rows="4"
          required
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none resize-none text-gray-800 dark:text-white"
        ></textarea>
      </div>

    
      <div className="inline-block">
        <label htmlFor="coverImage" className=" w-40 h-40  grid place-items-center cursor-pointer border-1 border-dashed text-sm font-medium text-gray-300">
          Cover Image
        </label>
        <input
          type="file"
      id="coverImage"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Additional Images */}
      <div className="inline-block">
        <label htmlFor="additionalImages" className=" w-40 h-40 md:ml-3  grid place-items-center cursor-pointer border-1 border-dashed text-sm font-medium text-gray-300">
          Additional Images
        </label>
        <input
          type="file"
          name="additionalImages"
          id="additionalImages"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Submit Item
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;
