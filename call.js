let localVideo = document.getElementById("local-video")
let remoteVideo = document.getElementById("remote-video")

localVideo.style.opacity = 0
remoteVideo.style.opacity = 0

localVideo.onplaying = () => { localVideo.style.opacity = 1 }
remoteVideo.onplaying = () => { remoteVideo.style.opacity = 1 }

let username
function sendroomId() {


    username = document.getElementById("username-input").value
    init({
        type: "store_user"
    })
    document.getElementById('username-input').value = "";
    alert(username + " no user is connected")

}

let callRece
function start() {

    callRece = document.getElementById("username-input").value
    startCall({
        type: "store_user"
    })
    document.getElementById('username-input').value = "";
}



let peer
function init(userId) {
    userId.username=username
    peer = new Peer(username, {
        host: '192.168.135.147',
        port: 9000,
        path: '/video-chat-v1/android-video-call-app'
    })

    listen()
}

let localStream
function listen() {
    peer.on('call', (call) => {

        navigator.getUserMedia({
            audio: true, 
            video: true
        }, (stream) => {
            localVideo.srcObject = stream
            localStream = stream

            call.answer(stream)
            call.on('stream', (remoteStream) => {
                remoteVideo.srcObject = remoteStream

                remoteVideo.className = "primary-video"
                localVideo.className = "secondary-video"

            })

        })
        
    })
}

function startCall(otherUserId) {
    otherUserId.callRece=callRece
    navigator.getUserMedia({
        audio: true,
        video: true
    }, (stream) => {

        localVideo.srcObject = stream
        localStream = stream

        const call = peer.call(callRece, stream)
        call.on('stream', (remoteStream) => {
            remoteVideo.srcObject = remoteStream

            remoteVideo.className = "primary-video"
            localVideo.className = "secondary-video"
        })

    })
}

// function toggleVideo(b) {
//     if (b == "true") {
//         localStream.getVideoTracks()[0].enabled = true
//     } else {
//         localStream.getVideoTracks()[0].enabled = false
//     }
// } 

// function toggleAudio(b) {
//     if (b == "true") {
//         localStream.getAudioTracks()[0].enabled = true
//     } else {
//         localStream.getAudioTracks()[0].enabled = false
//     }
// } 
let isAudio = true
function muteAudio() {
    isAudio = !isAudio
    localStream.getAudioTracks()[0].enabled = isAudio
}

let isVideo = true
function muteVideo() {
    isVideo = !isVideo
    localStream.getVideoTracks()[0].enabled = isVideo
}
function closs(){
const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("my channel");
dc.onclose = () => {
    console.log("datachannel close");
  };
}