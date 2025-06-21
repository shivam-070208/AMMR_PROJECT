import React, { useState } from "react";
import { useApi } from "../context/Contextprovider";

const AddItemForm = () => {
  const {Api} = useApi()
  const [message,setMessage] = useState(null)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.coverImage || formData.additionalImages.length <=0){
      setMessage('all field required')
    }
    const form = new FormData();
    form.append("Name", formData.name);
    form.append("ItemType", formData.type);
    form.append("Description", formData.description);
    if (formData.coverImage) {
      form.append("Images", formData.coverImage);
    }
    formData.additionalImages.forEach((img, idx) => {
      form.append("Images", img);
    });
      try {
        console.log(Api)
        const response = await fetch(`${Api}/add`, {
          method: 'POST',
          body: form,
       
        });
        if (!response.ok) {
          setMessage('Failed to add item');
        } else {
          setMessage('Item added successfully');
          setFormData({
        name: "",
        type: "",
        description: "",
        coverImage: null,
        additionalImages: [],
          });
        }
      } catch (error) {
        setMessage('An error occurred');
      }

  };


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "coverImage") {
      if (files[0] && files[0].type.startsWith("image/")) {
        setFormData((prev) => ({
          ...prev,
          coverImage: files[0],
        }));
      }
    } else if (name === "additionalImages") {
      const validFiles = Array.from(files).filter(
        (file) => file.type.startsWith("image/")
      );
      setFormData((prev) => ({
        ...prev,
        additionalImages: [
          ...prev.additionalImages,
          ...validFiles.slice(0, 4 - prev.additionalImages.length),
        ],
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 bg-[#111111c7] backdrop-blur-lg text-center  rounded-2xl space-y-6 mt-24 "
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Add New Item
      </h2>

      <div>
        <label className="block text-sm font-medium text-left text-gray-700 dark:text-gray-300">
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
        <label className="block text-sm font-medium text-left text-gray-700 dark:text-gray-300">
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

      <div>
        <label className="block text-sm font-medium text-left text-gray-700 dark:text-gray-300">
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
        <label
          htmlFor="coverImage"
          className=" w-40 h-40 relative mx-auto  grid place-items-center cursor-pointer border-1 border-dashed text-sm font-medium text-gray-300"
        >
          Cover Image
          {formData.coverImage && (
            <>
              <img
                src={URL.createObjectURL(formData.coverImage)}
                className="w-full absolute pointer-events-none h-full object-cover"
                alt="Cover Preview"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-600 text-white rounded px-2 py-1 text-xs z-10 flex items-center"
                onClick={e => {
                  e.stopPropagation();
                  setFormData(prev => ({ ...prev, coverImage: null }));
                }}
                title="Delete"
              >
               
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            
              </button>
            </>
          )}
        </label>
        <input
          type="file"
          id="coverImage"
          name="coverImage"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="inline-block">
        <label
          htmlFor="additionalImages"
          className=" w-40 h-40 md:ml-3 mx-auto relative grid place-items-center cursor-pointer border-1 border-dashed text-sm font-medium text-gray-300"
        >
          Additional Images
          <div className="flex flex-col flex-wrap absolute w-full h-full">
            {formData.additionalImages.map((img, idx) => (
              <div key={idx} className="relative w-1/2 h-1/2">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Additional Preview ${idx + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-600 text-white rounded px-1 py-0.5 text-xs z-10 flex items-center"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      additionalImages: prev.additionalImages.filter((_, i) => i !== idx),
                    }));
                  }}
                  title="Delete"
                >
                  {/* Trash SVG icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </label>
        <input
          type="file"
          name="additionalImages"
          id="additionalImages"
          accept="image/*"
          multiple
          
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
            {message && <p className="text-sm pt-4 text-yellow-100">{message}</p>}
      <div className="">
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
