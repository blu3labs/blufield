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
      desc: "Express Your Thoughts",
      desc1: " Use words to articulate your thoughts and narrate your stories.",
    },
    {
      image: Audio,
      title: "Audio",
      desc: "Voice Your Expression",
      desc1: `Share your emotions, memories, or thoughts in an audio format.`,
    },
    {
      image: Video,
      title: "Video",
      desc: "Visual Storytelling",
      desc1: "Share your stories and experiences through video content.",
    },
  ];
  return (
    <div className="homeWrapper">
      <div className="homeHeader">Blufield</div>
      {/* <div className="homeTitle">Lorem, ipsum dolor.</div> */}
      <div className="homeSubtitle">
      A dynamic platform for personalized text, audio, and video sharing, connecting through diverse expressions.
            </div>

      <div className="homeItems">
        {items.map((item, index) => (
          <div className="homeItem" key={index}>
            <div className="homeItemTitle">{item.title}</div>
            <img src={item.image} alt="" draggable={false} />
            <div className="homeItemDesc">

              {item.desc}
              <br/>
              {item.desc1}
            </div>
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
