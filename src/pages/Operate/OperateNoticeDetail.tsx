import React, { useState } from "react";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import EditorBase from "src/components/Common/Editor/EditorBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";

const OperateNoticeDetail = () => {
  const [tabList, setTabList] = useState([{ label: "공지사항" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");

  const tabClickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setSelectedIndex(e.currentTarget.value);
  };

  const tabDeleteHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (tabList.length === 1) {
      return;
    }

    const tempList = [...tabList];
    const deleteIndex = Number(e.currentTarget.value);
    tempList.splice(deleteIndex, 1);

    const isExistTab = tempList[Number(selectedIndex)];
    if (!isExistTab) {
      setSelectedIndex(`${tempList.length - 1}`);
    }

    setTabList(tempList);
  };

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={tabClickHandler}
        onClose={tabDeleteHandler}
      />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "서비스 운영 관리", href: "" },
            { label: "공지사항", href: "" },
            { label: "공지사항 상세", href: "" },
          ]}
          title={"공지사항 상세"}
        />

        <EditorBase />
      </BodyBase>
    </ContainerBase>
  );
};

export default OperateNoticeDetail;
