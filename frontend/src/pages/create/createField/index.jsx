import React, { useEffect, useState } from "react";
import { ColorPicker } from "antd";
import UploadImage from "@/components/upload/image";
import Input from "@/ui/input";
import Textarea from "@/ui/textarea";
import "./index.css";

function CreateField() {
  const [accentColor, setAccentColor] = useState("#00A9FF");
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const [github, setGithub] = useState(null);
  const [price, setPrice] = useState(null);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--create-accent", accentColor);
  }, [accentColor]);

  return (
    <div className="createField">
      <div className="createFieldTop">
        <UploadImage
          image={banner}
          setImage={setBanner}
          className="createFieldBanner"
          iconClassName="createUploadIcon"
          text="Upload Banner"
        />

        <UploadImage
          image={logo}
          setImage={setLogo}
          className="createFieldLogo"
          iconClassName="createUploadIcon"
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
          <Input
            title="Name"
            placeholder="Enter Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            title="Email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="createFieldItems">
          <Input
            title="Twitter"
            placeholder="Enter Twitter"
            name="twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
          <Input
            title="Github"
            placeholder="Enter Github"
            name="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <Input
          title="Monthly Subscription Price (BNB)"
          placeholder="Enter Subscription Price"
          type="number"
          price={true}
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyPress={(event) => {
            if (!/[0-9+.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
        <Textarea
          title="About"
          placeholder="Enter About"
          rows={3}
          name="about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          maxLength={512}
        />
      </div>

      <button className="createFieldButton">Create Field</button>
    </div>
  );
}

export default CreateField;
