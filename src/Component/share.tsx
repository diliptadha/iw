import { useState, useEffect } from "react";
import Image from "next/image";
import { Images } from "@/constant";

const ShareOptions = ({ onOptionClick }) => {
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [isXS, setIsXS] = useState(false);

  useEffect(() => {
    const updateIsXS = () => {
      setIsXS(window.innerWidth < 600);
    };

    updateIsXS();
    window.addEventListener("resize", updateIsXS);

    return () => {
      window.removeEventListener("resize", updateIsXS);
    };
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const shareOptions = [
    { name: "Copy Link", icon: Images.COPY_LINK, action: handleCopyLink },
    {
      name: "Facebook",
      icon: Images.FACEBOOK,
      action: () => onOptionClick("https://www.facebook.com"),
    },
    {
      name: "Mail",
      icon: Images.MAIL,
      action: () =>
        onOptionClick(
          `mailto:?subject=Check%20this%20out&body=${encodeURIComponent(
            window.location.href
          )}`
        ),
    },
    {
      name: "Twitter",
      icon: Images.X,
      action: () => onOptionClick("https://twitter.com"),
    },
  ];

  if (isXS) {
    shareOptions.push(
      {
        name: "WhatsApp",
        icon: Images.WHATSAPP,
        action: () =>
          onOptionClick(
            "https://wa.me/?text=" + encodeURIComponent(window.location.href)
          ),
      },
      {
        name: "SMS",
        icon: Images.SMS,
        action: () =>
          onOptionClick(
            "sms:&body=" + encodeURIComponent(window.location.href)
          ),
      }
    );
  }

  return (
    <div className="absolute mt-2 top-10 right-0 bg-white border rounded-lg shadow-lg">
      {shareOptions.map((option) => (
        <div
          key={option.name}
          className="flex items-center p-2"
          onClick={option.action}
        >
          <Image
            src={option.icon}
            width={20}
            height={20}
            alt={option.name}
            className="mr-2 cursor-pointer"
          />
          <span className="cursor-pointer">{option.name}</span>
        </div>
      ))}
      {copySuccess && (
        <span className="text-green-500">Link copied to clipboard!</span>
      )}
    </div>
  );
};

export default ShareOptions;
