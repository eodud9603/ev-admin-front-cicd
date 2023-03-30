import React, { useEffect, useRef } from "react";
import { useMapStore } from "src/store/store";
import { MarkerClustering } from "./cluster";

declare global {
  /** @description lint 설정에 따른 오류 방지 (interface명 I 접두사 이슈) */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    naver: any;
  }
}

interface IMapBaseProps {
  markerList: {
    stationId: string;
    stationName: string;
    regionGroupId: string;
    addr: string;
    addrDetail: string;
    lat: number;
    long: number;
  }[];
  children?: React.ReactElement | React.ReactElement[];
}

const { naver } = window;

/**
 * 네이버 지도 클러스터 사용 공통 컴포넌트
 * @description children을 넣으려면, css > z-index 추가할 것
 */
const ClusterMapBase = (props: IMapBaseProps) => {
  const { markerList, children } = props;
  const mapStore = useMapStore();

  /** store ref */
  const getUseMapStoreRef = useRef(mapStore);
  /** map div ref */
  const mapElement = useRef<HTMLDivElement>(null);
  /** naver map ref */
  const mapRef = useRef<any>(null);
  /** naver map center position ref */
  const mapCenterRef = useRef({
    lat: 36.704882,
    long: 127.917245,
  });
  /** naver map markers ref */
  const markerRefs = useRef<any[]>([]);
  /** naver map marker click popup ref */
  const infoWindowRefs = useRef<any[]>([]);

  useEffect(() => {
    if (!mapElement.current || !naver) {
      return;
    }

    const { lat, long } = mapCenterRef.current;
    const location = new naver.maps.LatLng(lat, long);
    const mapOptions = {
      center: location,
      zoom: 7, //지도의 초기 줌 레벨
      minZoom: 7, //지도의 최소 줌 레벨
      zoomControl: false,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    mapRef.current = map;
  }, []);

  /* map store 초기화 */
  useEffect(() => {
    const mapStore = getUseMapStoreRef.current;

    return () => {
      mapStore.initMap();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    // 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
    const getClickHandler = (seq: number) => {
      return function () {
        const marker = markerRefs.current[seq];
        const infoWindow = infoWindowRefs.current[seq];

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(mapRef.current, marker);
        }
      };
    };

    /* 마커 등록 */
    const listCount = markerList.length;
    for (let i = 0; i < listCount; i++) {
      const chargerStation = markerList[i];
      const position = new naver.maps.LatLng(
        chargerStation.lat,
        chargerStation.long
      );
      const marker = new naver.maps.Marker({
        position,
        icon,
      });
      /* 마커 클릭 이벤트 리스너 등록 */
      naver.maps.Event.addListener(marker, "click", getClickHandler(i));

      /* 마커 > 팝업창 생성 */
      const infoWindow = new naver.maps.InfoWindow({
        content: getPopup(chargerStation),
        disableAnchor: true /* 기본 말풍선 꼬리 활성화 여부 */,
        borderWidth: 0 /* 두께 */,
        pixelOffset: 145 /* 정보창 offset */,
        maxWidth: 290 /* 최대 너비 */,
        backgroundColor: "transparent",
      });
      /** 팝업창 > 버튼 태그 목록 */
      const buttons = [
        ...infoWindow.getContentElement().querySelectorAll("button"),
      ];

      const [closeButton, previousButton] = buttons.splice(0, 2);
      const nextButton = buttons.pop();

      // /* 팝업창 닫기 버튼 클릭 이벤트 리스너 등록 */
      closeButton.addEventListener("click", getClickHandler(i), false);
      // /* 이전 버튼 클릭 이벤트 리스너 등록 */
      previousButton.addEventListener(
        "click",
        () => {
          console.log("previous button click");
        },
        false
      );
      // /* 다음 버튼 클릭 이벤트 리스너 등록 */
      nextButton.addEventListener(
        "click",
        () => {
          console.log("next button click");
        },
        false
      );
      /** 페이지 버튼 목록 > 클릭 이벤트 리스너 등록 */
      for (const pageButton of buttons) {
        pageButton.addEventListener(
          "click",
          (e) => {
            console.log(e.target.value);
          },
          false
        );
      }

      /** 마커&팝업창 데이터 추가 */
      infoWindowRefs.current.push(infoWindow);
      markerRefs.current.push(marker);
    }

    /* 마커 클러스터링 */
    new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 15,
      map: mapRef.current,
      markers: markerRefs.current,
      disableClickZoom: false,
      gridSize: 120,
      icons: [
        getHtmlMarker(30),
        getHtmlMarker(40),
        getHtmlMarker(50),
        getHtmlMarker(60),
        getHtmlMarker(70),
      ],
      indexGenerator: [10, 100, 200, 500, 1000],
      stylingFunction: function (clusterMarker: any, count: string) {
        clusterMarker.getElement().firstChild.textContent = count;
      },
    });
  }, [markerList]);

  return (
    <div ref={mapElement} className={"d-flex flex-grow-1 position-relative"}>
      {children}
    </div>
  );
};

export default ClusterMapBase;

/** 임시 충전소 아이콘 */
const icon = {
  content:
    "<img src='https://content.humaxcharger.com/resources/img/marker_able.png' width='22' height='32' alt='충전소 위치' />",
  size: new naver.maps.Size(22, 32),
};

/** 임시 클러스터 마커 */
const getHtmlMarker = (size: number) => {
  return {
    content: `<div 
                style='cursor:pointer; 
                       display: flex;  
                       justify-content:center; 
                       align-items: center; 
                       width: ${size}px; 
                       height: ${size}px; 
                       border-radius: 50%; 
                       background-color: #FC6C00; 
                       color: white; 
                       font-weight: 600;
                      ' 
              />`,
    size: new naver.maps.Size(size, size),
    anchor: new naver.maps.Point(size / 2, size / 2),
  };
};

const getPopup = (chargerStation: {
  stationName: string;
  stationId: string;
  addr: string;
  addrDetail: string;
}) => {
  /** 임시 목록 */
  const testList = new Array(20).fill(undefined);
  /** 테이블 로우 */
  const rows = testList.reduce((acc: string, cur, index) => {
    acc += `
            <tr key="${index}" style="
              text-align:center;
              border-bottom: 1px solid #BDBDBD;
              height: 38px;
            ">
              <td>
                <span>
                  ${index < 9 ? `0${index + 1}` : index + 1}
                </span>
              </td>
              <td>
                <span>
                  급속
                </span>
              </td>
              <td>
                <span>
                  연결
                </span>
              </td>
              <td>
                <span>
                  충전대기
                </span>
              </td>
            </tr>
          `;

    return acc;
  }, "");

  return `
    <div style="
        overflow: hidden;
        display: flex; 
        flex-direction: column; 
        width: 290px; 
        height: 411px;
        max-height: 411px;
        justify-content: space-between;
        box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.18);
        border-radius: 5px;
        background-color: #fff;
      ">
      <section style="
        margin: 0px;
        padding: 0px;
        padding: 12px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid lightGrey;
      ">
        <p style="
          margin: 0px;
          padding: 0px;
          font-size: 14px;
          font-weight: 800;
        ">
          ${chargerStation.stationName}:
           <a href="/charger/chargerStation/detail/${chargerStation.stationId}">
            ${chargerStation.stationId}
           </a>
        </p>
        <button type="button" style="
          border: none;
          background-color: transparent;
          font-size: 16px;
        ">
          &#x2715
        </button>
      </section>
      <section style="
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-between;
      ">
        <div style="
          display:flex; 
          flex-direction:column; 
          flex: 1;
        ">
          <p style="
            margin: 0px;
            padding: 0px;
            font-size: 14px;
            font-weight: 800;
            padding: 16px 10px;
          ">
            주소 ${chargerStation.addr}, ${chargerStation.addrDetail}
          </p>
          <table style="width: 100%">
            <thead style="
              border-bottom: 1px solid #BDBDBD;
            ">
              <tr style="
                  background-color: #F6F7F9; 
                  text-align:center; 
                  height: 41px;
                ">
                <th>
                  <span>
                    관리번호
                  </span>
                </th>
                <th>
                  <span>
                    급/완속
                  </span>
                </th>
                <th>
                  <span>
                    통신상태 
                  </span>
                </th>
                <th>
                  <span>
                    충전기상태
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </section>
      <div style="
        padding: 20px 10px;
        display: flex;
        align-items: center;
        align-self: center;
      ">
        <button type="button" style="
          width: 35px;
          height:35px;
          border: none;
          background-color: #DCDCDC;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          color: #7C7F87;
        ">
          <<
        </button>
        <button type="button" value="1" style="
          padding: 0px 8px;
          height: 35px;
          border: none;
          background-color: #7C7F87;
          color: #FFF;
        ">
          1
        </button>
        <button type="button" style="
          width: 35px;
          height:35px;
          border: none;
          background-color: #DCDCDC;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          color: #7C7F87;
        ">
          >>
        </button>
      </div>
    </div>
  `;
};
