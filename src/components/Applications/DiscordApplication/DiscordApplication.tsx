import { LanyardDiscordCard } from "discord-card-react";
import React, { useState } from "react";
import Window from "../../Window/Window";
import "discord-card-react/styles";

const DiscordApplication = ({
  isOpen,
  isHidden,
  handleClose,
  handleHide,
}: {
  isOpen: boolean;
  isHidden: boolean;
  handleClose: () => void;
  handleHide: () => void;
}) => {
  const [message, setMessage] = useState("");

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
  }
  return (
    isOpen && (
      <Window
        name="Discord"
        isHidden={isHidden}
        handleClose={handleClose}
        handleHide={handleHide}
        width={332}
        height={653}
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
            memberSince={{
              title: "Alive since",
              discordJoinDate: "Feb 9th 1999",
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
              placeholder: "Message @miguelhigueradev",
            }}
          />
        </div>
      </Window>
    )
  );
};

export default DiscordApplication;
