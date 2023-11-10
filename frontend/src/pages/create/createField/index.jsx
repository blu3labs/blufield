import React,{useEffect, useState} from "react";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { ColorPicker } from "antd";
import Input from "@/ui/input";
import Textarea from "@/ui/textarea";
import "./index.css";

function CreateField() {

  const [accentColor, setAccentColor] = useState("#00A9FF");

  useEffect(() => {
    document.documentElement.style.setProperty("--create-accent", accentColor);
  }, [accentColor])


  return (
    <div className="createField">
      <div className="createFieldTop">
        <button className="createFieldBanner">
          <RiUploadCloud2Fill className="uploadIcon" />
          <span>Upload Banner</span>
        </button>

        <button className="createFieldLogo">
          <RiUploadCloud2Fill className="uploadIcon" />
          <span>Upload Logo</span>
        </button>

        <ColorPicker
          showText={(color) => "Accent Color"}
          className="createFieldPicker"
          value={accentColor}
          onChange={(e) => setAccentColor(e.toHexString())}
        
        />
      </div>

      <div className="createFieldBody">
        <div className="createFieldItems">
          <Input title="Name" placeholder="Enter Name" name="name" />
          <Input title="Email" placeholder="Enter Email" name="email" />
        </div>

        <div className="createFieldItems">
          <Input title="Twitter" placeholder="Enter Twitter" name="twitter" />
          <Input title="Github" placeholder="Enter Github" name="github" />
        </div>
        <Input
          title="Monthly Subscription Price (BNB)"
          placeholder="Enter Subscription Price"
          type="number"
          price={true}
          name="price"
        />
        <Textarea
          title="About"
          placeholder="Enter About"
          rows={3}
          name="about"
        />
      </div>

      <button className="createFieldButton">Create Field</button>
    </div>
  );
}

export default CreateField;
