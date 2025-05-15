import React, { useState } from 'react';

const CustomOrderForm = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "dz2mtwmcx"); // Replace with your Cloudinary preset

    try {
      // Correct Cloudinary upload URL
      const response = await fetch("https://api.cloudinary.com/v1_1/dz2mtwmcx/image/upload", { // Replace "dz2mtwmcx" with your Cloudinary cloud name
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary error response:", errorData); // Log the error response
        throw new Error(`Failed to upload image: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();

      if (!data.secure_url) {
        throw new Error("Image URL not returned from Cloudinary");
      }

      const imageUrl = data.secure_url;

      // Compose WhatsApp message
      const message = encodeURIComponent(
        `Hello, I would like to request a custom furniture item.\n\nDescription: ${description}\n\nReference Image: ${imageUrl}`
      );

      const phoneNumber = "+254768453840"; // Your WhatsApp number
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

      setSubmitted(true);
    } catch (error) {
      console.error("Upload failed:", error);
      alert(`Failed to upload image. Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Request Custom Furniture</h2>

      {submitted ? (
        <div className="text-green-600 font-semibold">Thank you! Your request has been submitted.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Upload Reference Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Describe Your Custom Furniture</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., A walnut wood dining table with curved legs..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring"
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition"
          >
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
};

export default CustomOrderForm;
