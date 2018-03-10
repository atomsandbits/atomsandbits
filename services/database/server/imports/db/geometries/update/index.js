import moment from 'moment';
import logger from '/both/imports/logger';
import { Geometries } from '/both/imports/collections';

const addUserToGeometry = ({
  geometryId = isRequired('geometryId'),
  userId = isRequired('userId'),
  tags = [],
}) => {
  const geometryWithUser = Geometries.findOne(
    {
      _id: geometryId,
      'users._id': userId,
    },
    { fields: { _id: 1 } },
  );
  if (geometryWithUser) {
    // TODO: Make sure tags are added to user's object
    return 1;
  }
  return Geometries.update(geometryId, {
    $push: {
      users: {
        _id: userId,
        createdAt: moment().valueOf(),
        tags,
      },
    },
  });
};

export { addUserToGeometry };
export default { addUserToGeometry };
