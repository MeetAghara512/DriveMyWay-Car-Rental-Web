import React, { useRef, useState } from "react";
import SellCarUserInput from "./SellCarUserInput";
import "./SellCar.css";

function SellCar() {
  // const inputRef = useRef(null); // Reference to the hidden file input
  // const [image, setImage] = useState(null); // Store the file object
  // const [fileName, setFileName] = useState("No selected File"); // Store the file name
  // const [base64Image, setBase64Image] = useState(""); // Store the Base64 string
  // const [showImage, setShowImage] = useState(false); // Control image display

  // const ImageClickHandler = () => {
  //   inputRef.current.click(); // Simulate a click on the hidden file input
  // };

  // const ImageChangeHandler = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImage(file); // Store the file object
  //     setFileName(file.name); // Set the file name

  //     // Convert the file to Base64
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result; // Store the Base64 string
  //       setBase64Image(base64String); // Set the Base64 string in state
  //       // console.log("Base64 String:", base64String); // Log the Base64 string
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handlesubmit = () => {
  //   if (base64Image) {
  //     setShowImage(true); // Show the uploaded image
  //   }
  // };
  const [postImage, setPostImage] = useState({ myFile: "" });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage({ ...postImage, myFile: base64 });
  };
  console.log(postImage);
  return (
    <div>
      {/* <div>
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={ImageChangeHandler}
        />
        <button onClick={ImageClickHandler}>Choose File</button>
        <button onClick={handlesubmit}>Submit</button>
      </div> */}
      <div className="App">
        {/* <form onSubmit={handleSubmit}> */}
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={postImage.myFile} alt="" />
        </label>

        <input
          type="file"
          lable="Image"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

        <h3>Doris Wilder</h3>
        <span>Designer</span>

        <button type="submit">Submit</button>
        {/* </form> */}
      </div>

      <div className="inline-block">
        {/* {showImage && base64Image && (
          <div>
            <p>Uploaded Image:</p>
            <img
              src={base64Image}
              alt="Uploaded"
              style={{ width: "200px", height: "200px", marginTop: "10px" }}
            />
          </div>
        )} */}
        <SellCarUserInput
        postImage={postImage}
        // image={image}
        // fileName={fileName}
        // base64={base64Image}
        />
      </div>
    </div>
  );
}

export default SellCar;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
