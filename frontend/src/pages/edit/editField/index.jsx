import React, { useEffect, useState } from "react";
import { ColorPicker } from "antd";
import UploadImage from "@/components/upload/image";
import Input from "@/ui/input";
import Textarea from "@/ui/textarea";
import "./index.css";
import { api } from "../../../utils/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
function EditField() {
  const { address } = useAccount();
  const navigate = useNavigate();
  const { id } = useParams();
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

  const uploadPhoto = async (img) => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const { data: res } = await api.post("img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.url;
    } catch (error) {
      console.log(error);

      return "err";
    }
  };

  const fetchFieldDetails = async () => {
    try {
      const { data: res } = await api.get(`user/${id}`);
      setAccentColor(res.data.accentColor);
      setBanner(res.data.banner);
      setLogo(res.data.logo);
      setName(res.data.name);
      setEmail(res.data.social_media.email);
      setTwitter(res.data.social_media.twitter);
      setGithub(res.data.social_media.github);
      setPrice(res.data.price);
      setAbout(res.data.about);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFieldDetails();
  }, [id]);
  const [loading, setLoading] = useState({
    imageLoading: false,
    uploadLoading: false,
  });
  const handleUpdateUser = async () => {
    try {
      setLoading({ ...loading, imageLoading: true });

      const logoUrl = typeof logo != "string" ? await uploadPhoto(logo) : logo;
      const bannerUrl =
        typeof banner != "string" ? await uploadPhoto(banner) : banner;
      setLoading({ uploadLoading: true, imageLoading: false });
      if (logoUrl === "err" || bannerUrl === "err") {
        toast.error("Error uploading image");
        setLoading({ uploadLoading: false, imageLoading: false });
        return;
      }

      const { data: res } = await api.put("user", {
        name: name,
        social_media: {
          twitter: twitter,
          github: github,
          email: email,
        },
        price: price,
        about: about,
        logo: logoUrl,
        banner: bannerUrl,
        accentColor: accentColor,
        bucketName: "",
        owner: address,
      });
      setLoading({ ...loading, uploadLoading: false });
      // navigate(`/${name}`);
    } catch (error) {
      console.log(error);
      setLoading({ imageLoading: false, uploadLoading: false });
    }
  };

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
            disabled={true}
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
          disabled={true}
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

      <button
        disabled={loading.imageLoading || loading.uploadLoading}
        style={{
          cursor: loading.imageLoading || loading.uploadLoading ? "wait" : "",
          opacity: loading.imageLoading || loading.uploadLoading ? "0.5" : "",
        }}
        onClick={() => {
          handleUpdateUser();
        }}
        className="createFieldButton"
      >
        {loading.imageLoading
          ? "Image Uploading..."
          : loading.uploadLoading
          ? "Loading..."
          : "Create Field"}
      </button>
    </div>
  );
}

export default EditField;
