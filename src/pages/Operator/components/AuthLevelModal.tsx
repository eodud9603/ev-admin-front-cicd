import React from "react";
import { Label, ModalBody, ModalFooter } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import { TableBase } from "src/components/Common/Table/TableBase";
import { ROLE_TABLE_LIST } from "src/constants/list";
import RoleCategoryItem from "./RoleCategoryItem";

interface IAuthLevelModalProps {
  type?: "WRITE" | "READ";
  isOpen: boolean;
  onClose: () => void;
}

const tableHeader = [
  {
    label: "1차",
  },
  {
    label: "2차",
  },
  {
    label: "편집",
  },
  {
    label: "조회",
  },
];

const AuthLevelModal = (props: IAuthLevelModalProps) => {
  const { type = "READ", isOpen, onClose } = props;

  const title = type === "WRITE" ? "권한등록" : "권한등록 내역";

  return (
    <ModalBase size={"lg"} isOpen={isOpen} onClose={onClose} title={title}>
      <ModalBody
        style={{ height: "70vh", overflowY: "scroll" }}
        className={"border border-0"}
      >
        <Label className={"mt-4 mb-3 font-size-14 text-secondary"}>
          <span className={"me-1 font-size-16 text-black fw-bold"}>목록</span>
          <span>(권한등급 : 최고 관리자)</span>
        </Label>
        <TableBase tableHeader={tableHeader}>
          <>
            {ROLE_TABLE_LIST.map((role, index) => (
              <RoleCategoryItem
                key={index}
                index={index}
                initialOpen={true}
                {...role}
              />
            ))}
          </>
        </TableBase>
      </ModalBody>
      <ModalFooter
        className={
          "my-4 border border-0 " +
          "d-flex align-items-center justify-content-center"
        }
      >
        {type === "READ" ? (
          <ButtonBase
            className={"width-110"}
            outline
            label={"닫기"}
            color={"secondary"}
            onClick={onClose}
          />
        ) : (
          <>
            <ButtonBase
              className={"width-110"}
              outline
              label={"닫기"}
              color={"secondary"}
              onClick={onClose}
            />
            <ButtonBase
              className={"width-110"}
              label={"적용"}
              color={"turu"}
              onClick={onClose}
            />
          </>
        )}
      </ModalFooter>
    </ModalBase>
  );
};

export default AuthLevelModal;
