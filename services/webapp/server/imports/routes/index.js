import cookie from 'cookie';
import { Geometries } from '/server/imports/db';

Picker.route(
  '/geometry/:_id/image/medium',
  (params, request, response, next) => {
    const { _id } = params;
    const geometry = Geometries.findOne(_id, { fields: { 'images.512': 1 } });
    if (!geometry) {
      response.writeHead(404);
      response.end();
      return;
    }
    const imageBinary = geometry.images ? geometry.images['512'] : null;
    if (!imageBinary || typeof imageBinary === 'string') {
      response.writeHead(404);
      response.end();
      return;
    }
    const image = Buffer.from(imageBinary, 'binary');
    response.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': image.length,
    });
    response.end(image);
  }
);

Picker.route('/', (params, request, response, next) => {
  const cookies = request.headers.cookie
    ? cookie.parse(request.headers.cookie)
    : {};
  if (!cookies['meteor-login-token']) {
    response.writeHead(301, {
      Location: process.env.ROOT_URL + 'new-calculation',
    });
    response.end();
  } else {
    next();
  }
});
