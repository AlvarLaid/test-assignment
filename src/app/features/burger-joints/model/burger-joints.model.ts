export type BurgerJointRaw = {
  distance: number;
  fsq_id: string;
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
  name: string;
  photos: {
    created_at: string;
    height: number;
    id: string;
    prefix: string;
    suffix: string;
    width: number;
  }[];
};

export type BurgerJointId = BurgerJointRaw['fsq_id'];

export type BurgerJointRawPhotos = BurgerJointRaw['photos'];

export type BurgerJointRawPhoto = BurgerJointRawPhotos[number];

export type BurgerJointsRaw = BurgerJointRaw[];

export type BurgerJointPlacesResponseBody = {
  context: {
    geo_bounds: {
      circle: {
        latitude: number;
        longitude: number;
      };
    };
  };
  results: BurgerJointRaw[];
};

export type BurgerJoint = {
  id: BurgerJointRaw['fsq_id'];
  location: BurgerJointRaw['geocodes']['main'];
  name: BurgerJointRaw['name'];
  photoUrl?: string;
};

export type BurgerJoints = BurgerJoint[];

export type BurgerJointPhotoUrl = BurgerJoint['photoUrl'];

export type BurgerJointMarker = {
  id: BurgerJointId;
  label: string;
  location: {
    lat: number;
    lng: number;
  };
  title: string;
};

export type BurgerJointMarkers = BurgerJointMarker[];
