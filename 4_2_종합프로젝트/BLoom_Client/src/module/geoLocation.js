function getLocation() {
  // GPS를 지원하면
  if (navigator.geolocation) {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function (error) {
          console.error(error);
          resolve({
            latitude: 37.450387263909235,
            longitude: 127.12967852927379,
          });
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    }).then((coords) => {
      console.log(`coords:${JSON.stringify(coords)}`);
      return coords;
    });
  } else {
    console.info("GPS를 지원하지 않습니다");
    return {
      // 가천대의 좌표
      latitude: 37.450387263909235,
      longitude: 127.12967852927379,
    };
  }
}

export { getLocation };
