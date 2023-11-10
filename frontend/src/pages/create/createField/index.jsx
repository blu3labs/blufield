import React, { useEffect, useState } from "react";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { ColorPicker } from "antd";
import UploadFile from "./components/uploadFile";
import Input from "@/ui/input";
import Textarea from "@/ui/textarea";
import "./index.css";

function CreateField() {
  const [accentColor, setAccentColor] = useState("#00A9FF");
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--create-accent", accentColor);
  }, [accentColor]);

  console.log(banner);
  console.log(logo);

  return (
    <div className="createField">
      <div className="createFieldTop">
        <UploadFile
          image={banner}
          setImage={setBanner}
          className="createFieldBanner"
          text="Upload Banner"
        />

     

        <UploadFile
          image={logo}
          setImage={setLogo}
          className="createFieldLogo"
          text="Upload Logo"
        />

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
