import React, { useEffect, useRef } from "react";
import { MARKER_IMAGE_URL } from "src/constants/marker";
import { useMapStore } from "src/store/store";

interface IMapBaseProps {
  lat?: number;
  long?: number;
  onChangeLocation?: (lat: number, long: number) => void;
  isInitMarker?: boolean;
  children?: React.ReactElement | React.ReactElement[];
}

const { naver } = window;

/**
 * 네이버 지도 단일 마커 표시 공통 컴포넌트
 * @description children을 넣으려면, css > z-index 추가할 것
 */
const SingleMapBase = (props: IMapBaseProps) => {
  const { lat, long, onChangeLocation, isInitMarker = false, children } = props;
  const mapStore = useMapStore();

  /** store ref */
  const getUseMapStoreRef = useRef(mapStore);
  /** store > function ref */
  const onChangeLocationRef = useRef(onChangeLocation);
  /** map div ref */
  const mapElement = useRef<HTMLDivElement>(null);
  /** naver map ref */
  const mapRef = useRef<naver.maps.Map | null>(null);
  /** naver map center position ref */
  const mapCenterRef = useRef({
    lat: lat || 37.378553955447,
    long: long || 127.11254077891,
  });
  /** 단일 marker ref */
  const markerRef = useRef<naver.maps.Marker | null>(null);

  useEffect(() => {
    if (!mapElement.current || !naver) {
      return;
    }

    const { lat, long } = mapCenterRef.current;
    const location = new naver.maps.LatLng(lat, long);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: false,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    mapRef.current = map;

    /* 지도 이벤트 리스너 */
    naver.maps.Event.addListener(map, "bounds_changed", function () {
      const { x, y } = map.getCenter();

      mapCenterRef.current = {
        lat: y,
        long: x,
      };
    });

    getUseMapStoreRef.current.setMarker(() => {
      const { lat, long } = mapCenterRef.current;
      const position = new naver.maps.LatLng(lat, long);

      !!onChangeLocationRef.current && onChangeLocationRef.current(lat, long);

      /* 마커가 존재할 경우, 마커 위치 이동 */
      if (markerRef.current) {
        markerRef.current.setPosition(position);
        return;
      }

      /* 마커 생성 */
      const marker = new naver.maps.Marker({
        position,
        icon,
        map: mapRef.current || undefined,
      });
      markerRef.current = marker;
    });

    /** 지도 init 로드 시, 마커까지 생성 여부 */
    if (isInitMarker) {
      const { lat, long } = mapCenterRef.current;
      const position = new naver.maps.LatLng(lat, long);

      const marker = new naver.maps.Marker({
        position,
        icon,
        map: mapRef.current,
      });
      markerRef.current = marker;
    }
  }, [isInitMarker]);

  /* map store 초기화 */
  useEffect(() => {
    const mapStore = getUseMapStoreRef.current;

    return () => {
      mapStore.initMap();
    };
  }, []);

  /* 줌 레벨 변경 이벤트 */
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    mapRef.current?.setZoom(mapStore.zoom, true);
  }, [mapStore.zoom]);

  /* 지도 위치 이동 이벤트 */
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    /* 위/경도 정보 존재 여부 체크 */
    if (!lat || !long || isNaN(Number(lat)) || isNaN(Number(long))) {
      return;
    }

    /* 위/경도 정보 유효값 체크 (한국 위/경도 범위) */
    const validLat = lat >= 33 && lat <= 43;
    const validLong = long >= 124 && long <= 132;
    if (!validLat || !validLong) {
      return;
    }

    const location = new naver.maps.LatLng(lat, long);
    mapRef.current?.panTo(location);
  }, [lat, long]);

  return (
    <div ref={mapElement} className={"d-flex flex-grow-1 position-relative"}>
      {children}

      {/* 임시 중심좌표 라인 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          zIndex: 1,
          height: 1,
          width: "100%",
          backgroundColor: "red",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          zIndex: 1,
          width: 1,
          height: "100%",
          backgroundColor: "red",
        }}
      />
    </div>
  );
};

export default SingleMapBase;

/** 임시 충전소 아이콘 */
const icon = {
  content: `<img src="${MARKER_IMAGE_URL.full}" 
                 width='22' 
                 height='32' 
                 alt='충전소 위치' 
            />`,
  size: new naver.maps.Size(22, 32),
};
