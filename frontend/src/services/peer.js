class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }

  async getAnswer(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }
  // async getAnswer(offer) {
  //   try {
  //     if (this.peer.signalingState === "have-remote-offer" || this.peer.signalingState === "stable") {
  //       await this.peer.setRemoteDescription(offer);
  //       const ans = await this.peer.createAnswer();
  //       await this.peer.setLocalDescription(ans);
  //       return ans;
  //     } else {
  //       console.error('Cannot set remote description. Peer connection is not in the expected state.');
  //       this.resetPeerConnection();
  //     }
  //   } catch (error) {
  //     console.error('Error in getAnswer:', error);
  //     this.resetPeerConnection();
  //   }
  // }

  // async setLocalDescription(ans) {
  //   try {
  //     if (this.peer.signalingState === "have-remote-offer") {
  //       await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
  //     } else {
  //       console.error('Cannot set remote description. Peer connection is not in a "have-remote-offer" state.');
  //       this.resetPeerConnection();
  //     }
  //   } catch (error) {
  //     console.error('Error in setLocalDescription:', error);
  //     this.resetPeerConnection();
  //   }
  // }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }

  endCall() {
    if (this.peer) {
      // Stop all tracks on local streams
      this.peer.getSenders().forEach(sender => {
        if (sender.track) {
          sender.track.stop();
        }
      });

      // Close the peer connection
      this.peer.close();

      // Reset the peer connection
      this.peer = null;

      // Reinitialize the peer connection for future calls
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });

      console.log('Call ended and peer connection reset.');
    }
  }

  resetPeerConnection() {
    console.log('Resetting peer connection...');
    if (this.peer) {
      this.peer.close();
      this.peer = null;
    }
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
  }
}

export default new PeerService();
