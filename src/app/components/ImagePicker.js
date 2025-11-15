import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./ImagePicker.module.css";

export default function ImagePicker({ id, name, accept }) {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    // Handle file selection
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPreview(fileReader.result); // This is the base64 encoded image
      };
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imagePreview}>
        {preview ? (
          <Image src={preview} alt="preview" fill className={styles.previewImage} />
        ) : (
          <div className={styles.placeholder}>No image selected</div>
        )}
      </div>
      <input
        className={styles.hiddenInput}
        id={id}
        type="file"
        name={name}
        required
        accept={accept}
        ref={fileRef}
        onChange={handleChange}
      />

      <button type="button" className={styles.button} onClick={() => fileRef.current && fileRef.current.click()}>
        Choose Image
      </button>
    </div>
  );
}
