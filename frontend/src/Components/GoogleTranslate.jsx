import React, { useEffect } from 'react';
import styled from 'styled-components';

const TranslateContainer = styled.div`
  background-color: #fff4e4;
  color: #2b1a12;
  width: 85%;
  max-width: 1184px;
  margin: 40px auto;
  line-height: 1.3;
  overflow-y: auto;
  top: 0 !important;

  .translate {
    /* Add your specific styles for translate paragraph if needed */
  }

  .notranslate {
    /* Add your specific styles for notranslate if needed */
  }

  .skiptranslate,
  .goog-logo-link,
  .gskiptranslate,
  .goog-te-banner-frame,
  #goog-gt-tt,
  .goog-te-balloon-frame,
  div#goog-gt- {
    display: visible !important;
  }

  .goog-te-gadget {
    font-size: 14px !important;
    color: #2b1a12 !important;
  }

  .goog-text-highlight {
    background: none !important;
    box-shadow: none !important;
  }

  #google_translate_element select {
    background: #2b1a12;
    color: #fff4e4;
    border: none;
    font-weight: bold;
    border-radius: 3px;
    padding: 8px 12px;
  }
`;

const GoogleTranslate = () => {
  useEffect(() => {
    const googleTranslateScript = document.createElement('script');
    googleTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    googleTranslateScript.async = true;
    document.body.appendChild(googleTranslateScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: 'true',
          includedLanguages: 'hi,en,bn,ar,ja,iw',
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL
        },
        'google_translate_element'
      );
    };
  }, []);

  return (
    <TranslateContainer>
      <div id="google_translate_element"></div>
      <p className="translate">
        In the heart of the bustling city, amidst the towering skyscrapers and endless streams of people, there lies a hidden oasis of tranquility. Tucked away down a narrow alley, a quaint café beckons with the aroma of freshly brewed coffee and the promise of a quiet retreat from the chaos outside. Inside, the soft murmur of conversation mingles with the gentle hum of jazz music playing in the background. The walls are adorned with local artwork, each piece telling a story of the vibrant community that calls this place home. Seated at a corner table, a young writer scribbles furiously in a worn notebook, lost in the world of their own creation. Across the room, a group of friends gathers, their laughter ringing out like a melody in the air. Outside, the city buzzes with energy, but within these walls, time seems to slow down. Here, in this cozy sanctuary, strangers become friends, and worries fade away with each sip of steaming hot coffee. As the day fades into evening, the café takes on a new glow, illuminated by the warm glow of fairy lights strung overhead.
      </p>
      <br />
      <small className="notranslate">2024 Fuad Hasan Shihab</small>
    </TranslateContainer>
  );
};

export default GoogleTranslate;
