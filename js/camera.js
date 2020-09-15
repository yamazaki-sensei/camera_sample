function openCamera() {
  var video = document.querySelector("video");
  navigator.mediaDevices =
    navigator.mediaDevices ||
    (navigator.mozGetUserMedia || navigator.webkitGetUserMedia
      ? {
          getUserMedia: function (c) {
            return new Promise(function (y, n) {
              (navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(
                navigator,
                c,
                y,
                n
              );
            });
          },
        }
      : null);
  var constraints = {
    audio: false,
    video: { facingMode: "environment" },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      stream.getVideoTracks().forEach((t) => {
        window.alert(JSON.stringify(t.getCapabilities()));
      });
      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        video.play();
      };
    })
    .catch(function (err) {
      console.log(err);
    });
}
