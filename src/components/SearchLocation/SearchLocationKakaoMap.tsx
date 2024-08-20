import React, { useEffect } from 'react';

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
  paginationRef: React.RefObject<HTMLDivElement>;
}

declare global {
  interface Window {
    kakao: any;
  }
}

//
//
//

const SearchLocationKakaoMap: React.FC<KakaoMapProps> = ({
  searchKeyword,
  onSearchResults,
  paginationRef,
}) => {
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

          if (window.kakao.maps.services) {
            const ps = new window.kakao.maps.services.Places();

            if (searchKeyword) {
              ps.keywordSearch(searchKeyword, (data: Place[], status: string, pagination: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  onSearchResults(data);
                  displayPlaces(map, data);

                  if (paginationRef.current) {
                    displayPagination(pagination);
                  } else {
                    console.log('pagination element not found');
                  }
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

  const displayPagination = (pagination: any) => {
    const paginationEl = paginationRef.current;
    if (!paginationEl) {
      return;
    }

    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.firstChild as Node);
    }

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i.toString();

      console.log(el);

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = (e) => {
          e.preventDefault();
          pagination.gotoPage(i);

          const top = document.getElementById('top');
          top?.scrollIntoView();
        };
      }

      fragment.appendChild(el);
    }

    paginationEl.appendChild(fragment);
  };

  return <div id="map" style={{ width: '100%', height: '12rem', marginBottom: '0.5rem' }}></div>;
};

export default SearchLocationKakaoMap;
