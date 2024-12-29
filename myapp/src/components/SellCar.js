import React from "react";
import { useRef } from "react";
import { useState } from "react";
import './SellCar.css';
import {MdCloudUpload , MdDelete} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai';
import SellCarUserInput from "./SellCarUserInput";

function SellCar(){
      const inputRef=useRef(null);
      const [image,setImage]=useState("");
      const [fileName,setFileName]=useState("No select File")

      const ImageClickHandler = () =>{
            inputRef.current.click();
      }
      const ImageChangeHandler = (event) =>{
            const file = event.target.files[0];
            const filename = event.target.files[0].name;
            setFileName(filename);
            setImage(file);
      }
      return(
            <>
                  <div>
                  <form onClick={ImageClickHandler} className="ForImageInput">
                        <div onClick={ImageClickHandler}>
                              {
                                    image ? 
                                    (<img src={URL.createObjectURL(image)} className="w-[500px] h-[300px]" alt="Img No load"></img>) : 
                                    (<>
                                    <MdCloudUpload color="#1457cf" size={60} className="m-auto"></MdCloudUpload>
                                    <p>Browes Files to upload</p>
                                    </>) 
                              }
                              <input type="file" ref={inputRef} onChange={ImageChangeHandler} className="hidden "></input>
                        </div>
                  </form>
                  <section className="FileNameDisplayBlock flex gap-2">
                        <AiFillFileImage color="#1475cf" className=""></AiFillFileImage>
                        <span className="FileNameDisplay">
                              {fileName}
                        </span>
                        <span>
                              <MdDelete onClick={()=>{
                                    setFileName("No selected File");
                                    setImage(null);
                              }}></MdDelete>
                        </span>
                  </section>
                  </div>
                  <div className="inline-block">
                        <SellCarUserInput></SellCarUserInput>
                  </div>
            </>
      )
}

export default SellCar;