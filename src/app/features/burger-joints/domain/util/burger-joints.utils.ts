import { isAfter } from 'date-fns';
import {
  BurgerJointMarkers,
  BurgerJointPhotoUrl,
  BurgerJointRawPhoto,
  BurgerJointRawPhotos,
  BurgerJoints,
  BurgerJointsRaw,
} from '../../model/burger-joints.model';

export const burgerJointsInRadius = (
  burgerJointsRaw: BurgerJointsRaw,
  radius: number
): BurgerJointsRaw =>
  burgerJointsRaw.filter((burgerJoint) => burgerJoint.distance > radius);

export const rawDataToBurgerJoints = (
  burgerJointsRaw: BurgerJointsRaw,
  photoSize: number
): BurgerJoints =>
  burgerJointsRaw.map((rawBurgerJoint) => ({
    id: rawBurgerJoint.fsq_id,
    location: rawBurgerJoint.geocodes.main,
    name: rawBurgerJoint.name,
    photoUrl: findLatestPhotoUrl(rawBurgerJoint.photos, photoSize),
  }));

export const toBurgerJointMarkers = (
  burgerJoints: BurgerJoints
): BurgerJointMarkers =>
  burgerJoints.map((burgerJoint) => ({
    id: burgerJoint.id,
    label: burgerJoint.name,
    location: {
      lat: Number(burgerJoint.location.latitude),
      lng: Number(burgerJoint.location.longitude),
    },
    title: burgerJoint.name,
  }));

function findLatestPhotoUrl(
  photos: BurgerJointRawPhotos,
  photoSize: number
): BurgerJointPhotoUrl {
  const latestPhoto = photos.reduce<BurgerJointRawPhoto | undefined>(
    (latest, photo) => {
      if (!latest) {
        return photo;
      }

      return isAfter(photo.created_at, latest.created_at) ? photo : latest;
    },
    undefined
  );
  return (
    latestPhoto &&
    `${latestPhoto.prefix}${photoSize}x${photoSize}${latestPhoto.suffix}`
  );
}
