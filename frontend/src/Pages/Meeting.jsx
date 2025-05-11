import React from "react";
import VideoChat from "../Components/Meeting";
import SEO from "../Components/Seo";

function MeetingPage() {
  return (
    <>
      <SEO
        title="Video Consultation - Connect with Your Doctor Online"
        description="Schedule and join video consultations with doctors at your convenience. Our secure platform ensures privacy and ease of access for all your medical discussions."
        keywords="video consultation, online doctor meeting, virtual healthcare, telemedicine, secure medical consultation"
      />
      <VideoChat />
    </>
  );
}

export default MeetingPage;
