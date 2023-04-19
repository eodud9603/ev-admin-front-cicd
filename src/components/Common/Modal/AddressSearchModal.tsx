import React from "react";
import ModalBase from "src/components/Common/Modal/ModalBase";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

interface IAddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onchange?: (data: {
    zipCode: string;
    address: string;
    jibun: string;
    road: string;
  }) => void;
}

const AddressSearchModal = (props: IAddressSearchModalProps) => {
  const { isOpen, onClose, onchange } = props;

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let roadAddress = data.roadAddress;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    if (data.buildingName) {
      roadAddress += ` (${data.buildingName})`;
    }

    /** 주소값 변경 시, 주소 데이터 콜백 */
    !!onchange &&
      void onchange({
        zipCode: data.zonecode,
        address: fullAddress,
        jibun: data.jibunAddress,
        road: roadAddress,
      });
    onClose();
  };

  return (
    <ModalBase isHeader={false} isOpen={isOpen} onClose={onClose}>
      <DaumPostcodeEmbed autoClose={false} onComplete={handleComplete} />
    </ModalBase>
  );
};

export default AddressSearchModal;
