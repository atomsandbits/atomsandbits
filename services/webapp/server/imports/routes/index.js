import { Geometries } from '/server/imports/db';

Picker.route('/geometry/:_id/image/medium', function(params, req, res, next) {
  const { _id } = params;
  const geometry = Geometries.findOne(_id, { fields: { 'images.512': 1 } });
  const b64str = geometry.images
    ? geometry.images['512'].split('data:image/png;base64,')[1]
    : null;
  const image = Buffer.from(b64str, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': image.length,
  });
  res.end(image);
});
