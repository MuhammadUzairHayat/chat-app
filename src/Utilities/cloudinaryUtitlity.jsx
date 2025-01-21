// import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dmbdp6irh", // Replace with your Cloudinary cloud name
  api_key: "912342726693911",       // Replace with your API key
  api_secret: "tplETy7psp1tC7EsZGebEQdXZbg", // Replace with your API secret
});

// Function to upload image to Cloudinary
export const uploadToCloudinary = async (imageUrl, publicId = "default_public_id") => {
  try {
    const uploadResult = await cloudinary.uploader.upload(imageUrl, { public_id: publicId });
    return uploadResult.secure_url; // Return the hosted image URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

// Function to optimize Cloudinary image URL
export const optimizeImageUrl = (publicId) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
};

// Function to transform Cloudinary image (e.g., crop, resize)
export const transformImageUrl = (publicId, width, height) => {
  return cloudinary.url(publicId, {
    crop: "fill",
    gravity: "auto",
    width,
    height,
  });
};
