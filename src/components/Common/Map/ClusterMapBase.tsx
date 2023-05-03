import React, { useEffect, useRef } from "react";
import { MARKER_IMAGE_URL } from "src/constants/marker";
import { MarkerClustering } from "src/components/Common/Map/cluster";

interface IMapBaseProps {
  markerList: {
    stationId: string;
    stationName: string;
    regionGroupId: string;
    addr: string;
    addrDetail: string;
    lat: number;
    long: number;
    status: string;
  }[];
  children?: React.ReactElement | React.ReactElement[];
}

const { naver } = window;

const naverSize = new naver.maps.Size(0, 0);
const markerSize = naverSize.clone().add(22, 32);
const clusterSize = (size: number) => naverSize.clone().add(size, size);

const infoWidth = 290;
const naverPoint = new naver.maps.Point(0, 0);
const infoPoint = naverPoint.clone().add(infoWidth / 2, 15);
const clusterPoint = (size: number) =>
  naverPoint.clone().add(size / 2, size / 2);

const INIT_MAP_CENTER = {
  lat: 36.704882,
  long: 127.917245,
};

/**
 * 네이버 지도 클러스터 사용 공통 컴포넌트
 * @description children을 넣으려면, css > z-index 추가할 것
 */
const ClusterMapBase = (props: IMapBaseProps) => {
  const { markerList, children } = props;

  /** map div ref */
  const mapElement = useRef<HTMLDivElement>(null);
  /** naver map ref */
  const mapRef = useRef<naver.maps.Map | null>(null);
  /** naver map markers ref */
  const markerRefs = useRef<naver.maps.Marker[]>([]);
  /** naver map marker click popup ref */
  const infoWindowRef = useRef<{
    currentSeq?: number;
    infoWindow: naver.maps.InfoWindow | null;
  }>({
    currentSeq: undefined,
    infoWindow: null,
  });

  useEffect(() => {
    if (!mapElement.current || !naver) {
      return;
    }

    const { lat, long } = INIT_MAP_CENTER;
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

  /* map > 마커, 클러스터 추가 */
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    // 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
    const getClickHandler = (seq: number) => {
      return function () {
        if (!mapRef.current) {
          return;
        }

        const marker = markerRefs.current[seq];
        const { currentSeq, infoWindow } = infoWindowRef.current;
        const isSameSeq = currentSeq === seq;
        /* 최초 등록한 팝업창 클릭한 충전소 데이터로 내용 변경  */
        infoWindow?.setContent(getPopup(markerList[seq]));

        /** 팝업창 > 버튼 태그 목록 */
        const buttons = [
          ...(infoWindow as any).getContentElement().querySelectorAll("button"),
        ];

        const [closeButton, previousButton] = buttons.splice(0, 2);
        const nextButton = buttons.pop();

        /* 이벤트 리스너 remove  */
        const eventRemoveHandler = () => {
          closeButton.removeEventListener("click", closeHandler, false);
          previousButton.removeEventListener("click", previousHandler, false);
          nextButton.removeEventListener("click", nextHandler, false);
        };

        /* 이벤트 리스너 함수 */
        const closeHandler = () => {
          eventRemoveHandler();
          infoWindow?.close();
        };
        const previousHandler = () => {
          console.log("previous button click");
        };
        const nextHandler = () => {
          console.log("next button click");
        };
        const pageHandler = (e: any) => {
          console.log("click page number: ", e.target.value);
        };

        /* 이벤트 리스너 등록 */
        closeButton.addEventListener("click", closeHandler, false);
        previousButton.addEventListener("click", previousHandler, false);
        nextButton.addEventListener("click", nextHandler, false);
        for (const pageButton of buttons) {
          pageButton.addEventListener("click", pageHandler, false);
        }

        /* 맵 위에 팝업창이 표시되는지 여부 */
        if (infoWindow?.getMap()) {
          /* 같은 마커 클릭 (팝업창 닫기) */
          if (isSameSeq) {
            eventRemoveHandler();
            infoWindow.close();
          } else {
            /* 다른 마커 클릭 (팝업창 열기) */
            infoWindow?.open(mapRef.current, marker);
          }
        } else {
          /* 클릭한 마커 기준 > 팝업창 열기 */
          infoWindow?.open(mapRef.current, marker);
        }

        infoWindowRef.current.currentSeq = seq;
      };
    };

    /* 마커 > 팝업창 생성 */
    const infoWindow = new naver.maps.InfoWindow({
      content: "<div />",
      disableAnchor: true /* 기본 말풍선 꼬리 활성화 여부 */,
      borderWidth: 0 /* 두께 */,
      pixelOffset: infoPoint /* 정보창 offset */,
      maxWidth: infoWidth /* 최대 너비 */,
      backgroundColor: "transparent",
    });
    /** 팝업창 데이터 추가 */
    infoWindowRef.current.infoWindow = infoWindow;

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
        icon: icon(chargerStation.status as keyof typeof MARKER_IMAGE_URL),
      });
      /* 마커 클릭 이벤트 리스너 등록 */
      naver.maps.Event.addListener(marker, "click", getClickHandler(i));

      /** 마커 데이터 추가 */
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

    return () => {
      /* 맵 제거하지 않고 맵 위 생성된 마커/팝업창 제거 */
      infoWindowRef.current.infoWindow?.setMap(null);
      for (let i = 0; i < markerRefs.current.length; i++) {
        markerRefs.current[i].setMap(null);
      }
      /* 마커/팝업창 ref 초기화 */
      markerRefs.current = [];
      infoWindowRef.current = {
        currentSeq: undefined,
        infoWindow: null,
      };
    };
  }, [markerList]);

  return (
    <div ref={mapElement} className={"d-flex flex-grow-1 position-relative"}>
      {children}
    </div>
  );
};

export default ClusterMapBase;

/** 임시 충전소 아이콘 */
const icon = (status: keyof typeof MARKER_IMAGE_URL) => ({
  content: `<img src="${MARKER_IMAGE_URL[status]}" 
                 width='22' 
                 height='32' 
                 alt='충전소 위치' 
            />`,
  size: markerSize,
});

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
    size: clusterSize(size),
    anchor: clusterPoint(size),
  };
};

/** infoWindow content (HTML string) */
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
                  <a href="/charger/charger/detail/${index}">
                    ${index < 9 ? `0${index + 1}` : index + 1}
                  </a>
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
        width: ${infoWidth}px; 
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
           <a href="/charger/station/detail/${chargerStation.stationId}">
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
