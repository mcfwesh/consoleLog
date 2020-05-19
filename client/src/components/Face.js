import React, { Component } from "react";

export default class Face extends Component {
  // async start() {
  //   const container = document.createElement("div");
  //   container.style.position = "relative";
  //   document.body.append(container);
  //   const labeledFaceDescriptors = await loadLabeledImages();
  //   const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
  //   let image;
  //   let canvas;
  //   document.body.append("Loaded");
  //   imageUpload.addEventListener("change", async () => {
  //     if (image) image.remove();
  //     if (canvas) canvas.remove();
  //     image = await faceapi.bufferToImage(imageUpload.files[0]);
  //     container.append(image);
  //     canvas = faceapi.createCanvasFromMedia(image);
  //     container.append(canvas);
  //     const displaySize = { width: image.width, height: image.height };
  //     faceapi.matchDimensions(canvas, displaySize);
  //     const detections = await faceapi
  //       .detectAllFaces(image)
  //       .withFaceLandmarks()
  //       .withFaceDescriptors();
  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);
  //     const results = resizedDetections.map((d) =>
  //       faceMatcher.findBestMatch(d.descriptor)
  //     );
  //     results.forEach((result, i) => {
  //       const box = resizedDetections[i].detection.box;
  //       const drawBox = new faceapi.draw.DrawBox(box, {
  //         label: result.toString(),
  //       });
  //       drawBox.draw(canvas);
  //     });
  //   });
  // }
  // loadLabeledImages() {
  //   const labels = ["Dioni"];
  //   return Promise.all(
  //     labels.map(async (label) => {
  //       const descriptions = [];
  //       for (let i = 1; i <= 4; i++) {
  //         const img = await faceapi.fetchImage(
  //           `https://raw.githubusercontent.com/dionifss/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`
  //         );
  //         const detections = await faceapi
  //           .detectSingleFace(img)
  //           .withFaceLandmarks()
  //           .withFaceDescriptor();
  //         descriptions.push(detections.descriptor);
  //       }

  //       return new faceapi.LabeledFaceDescriptors(label, descriptions);
  //     })
  //   );
  // }
  render() {
    return (
      <div>
        <h1>Facerecognition</h1>
        <input type="file" id="imageUpload"></input>
      </div>
    );
  }
}
