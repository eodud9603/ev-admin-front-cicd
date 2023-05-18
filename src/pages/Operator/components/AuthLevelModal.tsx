import React, { useEffect, useState } from "react";
import { Label, ModalBody, ModalFooter } from "reactstrap";
import { getAdminRoleList } from "src/api/admin/adminAPi";
import { IAdminMainRoleItem } from "src/api/admin/adminApi.interface";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import { ROLE_TYPE, TRoleTypeKey } from "src/constants/status";
import {
  RoleHeaderItem,
  RoleMainItem,
} from "src/pages/Operator/components/RoleItem";
interface IAuthLevelModalProps {
  type?: "WRITE" | "READ";
  isOpen: boolean;
  onClose: () => void;
  role: TRoleTypeKey;
}

const AuthLevelModal = (props: IAuthLevelModalProps) => {
  const { type = "READ", isOpen, onClose, role } = props;
  const title = type === "WRITE" ? "권한등록" : "권한등록 내역";

  const [list, setList] = useState<IAdminMainRoleItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      /** 권한 목록 가져오기 */
      const getRoleList = async () => {
        const { code, data: searchData } = await getAdminRoleList({ role });

        /** 성공 */
        const success = code === "SUCCESS" && !!searchData;
        if (success) {
          setList(searchData.elements ?? []);
        }
      };

      void getRoleList();
    }
  }, [isOpen, role]);

  return (
    <ModalBase size={"lg"} isOpen={isOpen} onClose={onClose} title={title}>
      <ModalBody
        style={{ height: "70vh", overflowY: "scroll" }}
        className={"border border-0"}
      >
        <Label className={"mt-4 mb-3 font-size-14 text-secondary"}>
          <span className={"me-1 font-size-16 text-black fw-bold"}>목록</span>
          <span>(권한등급 : {ROLE_TYPE[role] ?? "미지정"})</span>
        </Label>
        <RoleHeaderItem />
        {list.map((props) => (
          <RoleMainItem
            key={props.id}
            disabled={type === "READ"}
            initialOpen={true}
            setList={setList}
            {...props}
          />
        ))}
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
