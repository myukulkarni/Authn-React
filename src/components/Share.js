import React, { useState } from 'react';
import { FaShareAlt, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';  // Import the share icons from react-icons

const ShareButton = ({ productUrl }) => {
  const [showOptions, setShowOptions] = useState(false);  // State to toggle visibility of share options
  const shareLink = productUrl || window.location.href;  // Default to current page if no product URL is provided

  // Social media share URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}&text=Check out this product!`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=Check out this product! ${encodeURIComponent(shareLink)}`;

  // Function to toggle the visibility of the share options
  const toggleShareOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div style={{ display: 'inline-block', marginTop: '10px' }}>
      {/* Show Share Icon */}
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
          color: '#0073e6',
        }}
        onClick={toggleShareOptions}
      >
        <FaShareAlt />
      </button>

      {/* Show Share Options (Facebook, Twitter, WhatsApp) */}
      {showOptions && (
        <div style={{ marginTop: '10px' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#1877f2',
              marginRight: '10px',
            }}
            onClick={() => window.open(facebookShareUrl, '_blank')}
          >
            <FaFacebook />
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#1da1f2',
              marginRight: '10px',
            }}
            onClick={() => window.open(twitterShareUrl, '_blank')}
          >
            <FaTwitter />
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#25d366',
              marginRight: '10px',
            }}
            onClick={() => window.open(whatsappShareUrl, '_blank')}
          >
            <FaWhatsapp />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
