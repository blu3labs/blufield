import React from "react";
import Video from "@/assets/video.jpeg";
import Text from "@/assets/text.jpeg";
import Audio from "@/assets/audio.jpeg";
import "./index.css";

function Home() {
  let items = [
    {
      image: Text,
      title: "Text",
      desc: "Express Your Thoughts: Share your ideas or stories in written form.",
    },
    {
      image: Audio,
      title: "Audio",
      desc: `Voice Your Expression: Share your emotions, memories, or thoughts in an audio format.`,
    },
    {
      image: Video,
      title: "Video",
      desc: "Visual Storytelling: Share your stories and experiences through video content.",
    },
  ];
  return (
    <div className="homeWrapper">
      <div className="homeHeader">Blufield</div>
      {/* <div className="homeTitle">Lorem, ipsum dolor.</div> */}
      <div className="homeSubtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </div>

      <div className="homeItems">
        {items.map((item, index) => (
          <div className="homeItem" key={index}>
            <div className="homeItemTitle">{item.title}</div>
            <img src={item.image} alt="" draggable={false} />
            <div className="homeItemDesc">{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="homeSocials">
        <a
          href="https://twitter.com/blu3labs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href="mailto:contact@blu3.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
      </div>
    </div>
  );
}

export default Home;
