import React, { useEffect, useState } from "react";
import { ColorPicker } from "antd";
import UploadImage from "@/components/upload/image";
import Input from "@/ui/input";
import Textarea from "@/ui/textarea";
import "./index.css";
import { api } from "../../../utils/api";
import toast from "react-hot-toast";
import { useAccount, useSwitchNetwork, useNetwork } from "wagmi";
import { useNavigate } from "react-router-dom";
import multiTxCreateBucket from "../../../utils/multiTx";
import { useSigner } from "../../../utils/useSigner";
import { bluefieladdress, bluefieldAbi } from "../../../contract/bluefield";
import { writeContract } from "../../../utils/writeContract";
import { ethers } from "ethers";
function CreateField() {
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const signer = useSigner();
  const navigate = useNavigate();
  const { address, connector } = useAccount();
  const [accentColor, setAccentColor] = useState("#00A9FF");
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const [github, setGithub] = useState(null);
  const [price, setPrice] = useState(null);
  const [about, setAbout] = useState(null);
  const abi = ["function grant(address ,uint32 ,uint256 )"];
  useEffect(() => {
    document.documentElement.style.setProperty("--create-accent", accentColor);
  }, [accentColor]);


  const [step,setStep] = useState(0);


  const localItems = JSON.parse(localStorage.getItem("createItems"));


  console.log(localItems, "localItems");

  const uploadPhoto = async (img) => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const { data: res } = await api.post("img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res, "photo")
      return res.url;
    } catch (error) {
      console.log(error);

      return "err";
    }
  };
  const [loading, setLoading] = useState({
    imageLoading: false,
    uploadLoading: false,
  });
  const handleSaveUser = async () => {
    try {
      setLoading({ ...loading, imageLoading: true });
      const logoUrl = await uploadPhoto(logo);
      const bannerUrl = await uploadPhoto(banner);
      setLoading({ uploadLoading: true, imageLoading: false });
      if (logoUrl === "err" || bannerUrl === "err") {
        toast.error("Error uploading image");
        setLoading({ uploadLoading: false, imageLoading: false });
        return;
      }
    
      const groupId = await multiTxCreateBucket(
        name,
        address,
        await connector?.getProvider(),
        switchNetworkAsync,
        chain?.id
      );
          console.log("burdasın", signer)


        let localItem_ = JSON.stringify({
          name: name,
          price: price,
          groupId: groupId,
        })



        localStorage.setItem("createItems",localItem_)

        const { data: res } = await api.post("user", {
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
          bucketName: name,
          owner: address,
        });
        console.log(res, "res");
        setLoading({ ...loading, uploadLoading: false });
    
          window.location.reload();
      //web 3 area

      
    } catch (error) {
      setLoading({ imageLoading: false, uploadLoading: false });
      console.log(error);
    }
  };


const [step2Loading,setStep2Loading] = useState(false);
  const handleStep2 = async () => {
    setStep2Loading(true);
    try{

      // step 2
      await writeContract({
        signer: signer,
        address: "0x50B3BF0d95a8dbA57B58C82dFDB5ff6747Cc1a9E",
        abi: abi,
        method: "grant",
        args: [bluefieladdress[97], 4, "2000000000"],
        chainId: 97,
        switchNetworkAsync: switchNetworkAsync,
      });

      console.log("burdasın 2 ")

      await writeContract({
        signer: signer,
        address: bluefieladdress[97],
        abi: bluefieldAbi,
        method: "registerField",
        args: [localItems?.name, localItems?.groupId, ethers.utils.parseEther(localItems?.price?.toString())],
        chainId: 97,
        switchNetworkAsync: switchNetworkAsync,
      });

      console.log("burdasın 3 ")

      let name = localItems?.name;

      localStorage.removeItem("createItems");
      navigate(`/${name}`);

    }catch(error){
      console.log(error)
    }
    setStep2Loading(false);
  }


  useEffect(() => {
    if(localItems?.groupId){
      setStep(1)
    }
  }, [localItems])


  if(step == 0){

  

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

      <button
        className="createFieldButton"
        style={{
          cursor: loading.imageLoading || loading.uploadLoading ? "wait" : "",
          opacity: loading.imageLoading || loading.uploadLoading ? "0.5" : "",
        }}
        disabled={loading.imageLoading || loading.uploadLoading}
        onClick={() => handleSaveUser()}
      >
        {loading.imageLoading
          ? "Image Uploading..."
          : loading.uploadLoading
          ? "Loading..."
          : "Setup Greenfield"}
      </button>
    </div>
  );
}else if(step == 1){

  return (
    <div className="createFieldStep2">
      <div className="createFieldStep2Items">

      <div className="createFieldStep2Item">
        <span>
          Group Id 
        </span>
        <span>
          {localItems?.groupId}
        </span>
      </div>

     

      <div className="createFieldStep2Item">
        <span>
          Name
        </span>
        <span>
          {localItems?.name}
        </span>
      </div>

      <div className="createFieldStep2Item">
        <span>
          Price
        </span>
        <span>
          {localItems?.price}
        </span>
      </div>
      </div>


      <button
        onClick={() => handleStep2()}
        disabled={step2Loading}
        style={{
          cursor: step2Loading ? "not-allowed" : "pointer",
          opacity: step2Loading ? "0.5" : "1",
        }}
      >
        Register Group{step2Loading && "..."}
      </button>
    </div>
  )
}
}

export default CreateField;
