class PeerService {
  constructor() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
          ],
        },
      ],
    });
  }

  async createOffer() {
    const offer = await this.peer.createOffer();

    await this.peer.setLocalDescription(offer);

    return offer;
  }

  async createAnswer(offer) {
    await this.peer.setRemoteDescription(
      new RTCSessionDescription(offer)
    );

    const answer = await this.peer.createAnswer();

    await this.peer.setLocalDescription(answer);

    return answer;
  }

  async setRemoteAnswer(answer) {
    if (this.peer.currentRemoteDescription) return;

    await this.peer.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  }

  async addIceCandidate(candidate) {
    if (!candidate) return;

    try {
      await this.peer.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    } catch (err) {
      console.log("ICE Error:", err);
    }
  }

  close() {
    this.peer.close();

    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
          ],
        },
      ],
    });
  }
}

const peer = new PeerService();

export default peer;