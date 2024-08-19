import React, { useEffect } from 'react';
// import './styles/KakaoMap.css';

//
//
//

interface Place {
  place_name: string;
  address_name: string;
  phone: string;
  x: string;
  y: string;
}

interface KakaoMapProps {
  searchKeyword: string;
  onSearchResults: (results: Place[]) => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

//
//
//

const SearchLocationKakaoMap: React.FC<KakaoMapProps> = ({ searchKeyword, onSearchResults }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=8820634f5fbd72b7d80d62b934c94d7d&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('map') as HTMLElement;
          const mapOption = {
            center: new window.kakao.maps.LatLng(37.5665, 126.978),
            level: 3,
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          // 여기에서 `kakao.maps.services.Places`가 정의되었는지 확인
          if (window.kakao.maps.services) {
            const ps = new window.kakao.maps.services.Places();

            if (searchKeyword) {
              ps.keywordSearch(searchKeyword, (data: Place[], status: string) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  onSearchResults(data);
                  displayPlaces(map, data);
                } else {
                  onSearchResults([]);
                }
              });
            }
          } else {
            console.error('kakao.maps.services가 로드되지 않았습니다.');
          }
        });
      } else {
        console.error('카카오 맵 API가 로드되지 않았습니다.');
      }
    };

    document.head.appendChild(script);
  }, [searchKeyword, onSearchResults]);

  const displayPlaces = (map: any, places: Place[]) => {
    const bounds = new window.kakao.maps.LatLngBounds();

    places.forEach((place) => {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: markerPosition,
      });

      bounds.extend(markerPosition);
    });

    map.setBounds(bounds);
  };

  return <div id="map" style={{ width: '100%', height: '12rem', marginBottom: '0.5rem' }}></div>;
};

export default SearchLocationKakaoMap;
