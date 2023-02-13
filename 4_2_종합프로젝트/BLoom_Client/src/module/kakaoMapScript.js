const { kakao } = window;

const createKakaoMapScript = (
  lat = 33.450701,
  lng = 126.570667,
  selectPage = 1
) => {
  return new Promise((res) => {
    // 마커를 담을 배열입니다
    var markers = [];

    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(lat, lng), // 중심 좌표
      level: 7, // 확대 레벨
    };

    // 카카오 지도 생성
    const map = new kakao.maps.Map(container, options);

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 검색 옵션 객체
    var searchOption = {
      location: new kakao.maps.LatLng(lat, lng), // 중심 좌표. 특정 지역을 기준으로 검색
      radius: 10000, // 중심 좌표로부터의 거리 필터링 값
      size: 10, // 한 페이지에 보여질 목록의 개수
      page: selectPage,
    };

    // 키워드로 장소를 검색합니다
    ps.keywordSearch("정신과", placesSearchCB, searchOption);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        var searchResult = { data: [], page: -1 };

        pagination.gotoPage(selectPage);

        searchResult["data"] = data;
        searchResult["page"] = pagination.last;

        displayPlaces(data);

        res(searchResult);
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title) {
          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });
        })(marker, places[i].place_name);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
      });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }
  });
};

export { createKakaoMapScript };
