import React, { useEffect, useState } from "react";
import { ColorPicker } from "antd";
import UploadImage from "@/components/upload/image";
import Input from "@/ui/input";
import Textarea from "@/ui/textarea";
import "./index.css";

function EditField() {
  const [accentColor, setAccentColor] = useState("#00A9FF");
  const [banner, setBanner] = useState("https://dag.gen.tr/images/dag.jpg");
  const [logo, setLogo] = useState(
    "https://scontent.fist4-1.fna.fbcdn.net/v/t39.30808-6/291697540_2383961388429443_3147310218374195011_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZMyegMmGx7MAX_rXikR&_nc_ht=scontent.fist4-1.fna&oh=00_AfBb3FucPV56mfNXMSRxCxo7Gkmb3sLf2RJtFYwtF0OW7w&oe=65545330"
  );
  const [name, setName] = useState("null");
  const [email, setEmail] = useState("null");
  const [twitter, setTwitter] = useState("null");
  const [github, setGithub] = useState("null");
  const [price, setPrice] = useState(2);
  const [about, setAbout] = useState("null");

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

      <button className="createFieldButton">Update</button>
    </div>
  );
}

export default EditField;
