import { useState } from "react";

export default function AdminImageUpload() {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "footster"); // from Cloudinary
    data.append("cloud_name", "dcsmtagf7");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dcsmtagf7/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploaded = await res.json();
    setImage(uploaded.secure_url); // <-- this is the final Cloudinary URL
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={uploadImage} />
      
      {preview && <img src={preview} alt="preview" width="100" />}
      {image && (
        <p>
          Uploaded URL: <a href={image} target="_blank">{image}</a>
        </p>
      )}
    </div>
  );
}
