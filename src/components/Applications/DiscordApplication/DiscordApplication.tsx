import { LanyardDiscordCard } from "discord-card-react";
import React, { useState } from "react";
import Window from "../../Window/Window";
import "discord-card-react/styles";
import { WindowProps } from "../../../shared/WindowProps";

const DiscordApplication = ({ winProps }: { winProps: WindowProps }) => {
  const [message, setMessage] = useState("");

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
  }
  return (
    winProps.isOpen && (
      <Window
        name="Discord"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={332}
        height={648}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
        nonResizable
      >
        <div style={{ display: "flex", backgroundColor: "purple" }}>
          <LanyardDiscordCard
            userId="205519765312241665"
            imageUrl="pfp.webp"
            bannerUrl="banner.webp"
            primaryColor="#007777"
            accentColor="#8500d3"
            basicInfo={{
              displayname: "Misfit",
              username: "misfitdude",
            }}
            badges={[
              { name: "Active Developer", iconUrl: "developer-badge.png" },
            ]}
            status={{
              status: "Tech nerd",
            }}
            aboutMe={{
              items: [
                {
                  text: "Passionate about technology",
                },
                {
                  text: "and coding especially",
                },
                {
                  text: "INTP",
                  marginBottom: 8,
                },
                {
                  text: "👨‍💻🖥️",
                },
              ],
            }}
            roles={{
              roles: [
                { name: "JavaScript", color: "#f7df1e" },
                { name: "TypeScript", color: "#007acc" },
                { name: "Java", color: "#f89820" },
                { name: "PHP", color: "#4f3e66" },
                { name: "React", color: "#61DBFB" },
                { name: "Vue", color: "#41B883" },
              ],
            }}
            priority="spotify"
            message={{
              handleInput: handleMessageChange,
              message: message,
              accentColor: "#8500d3",
              placeholder: "Message @misfitdude",
            }}
          />
        </div>
      </Window>
    )
  );
};

export default DiscordApplication;
