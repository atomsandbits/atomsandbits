
import SpeckRenderer from 'speck-renderer';

const speck = new SpeckRenderer({
  canvasContainerID: 'canvas-container',
  canvasID: 'speck-canvas',
});
speck.gui.preset = "Cartoon";
speck.gui.preset = "BallAndStick";
speck.gui.__folders.Detail.__controllers[2].setValue(512)
speck.gui.__folders.Detail.__controllers[0].setValue(100)
if (window.location.hash) {
  const xyz = window.decodeURIComponent(window.location.hash.slice(1));
  console.log(xyz);
  speck.loadStructure(xyz)
}

setTimeout(() => {
  const dataURL = document.createElement('div');
  dataURL.innerHTML = speck.renderer.dataURL;
  dataURL.setAttribute('id', 'data-url');
  document.body.appendChild(dataURL);
}, 30)
