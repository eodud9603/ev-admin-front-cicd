import React, { useState } from "react";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";

export const ChargerTrouble = () => {
  const [selected, setSelected] = useState("");

  return (
    <ContainerBase>
      <div className={"mt-4 mx-5"}>
        <TabGroup
          list={[{ label: "공지사항" }, { label: "충전소 관리" }]}
          selectedIndex={selected}
          onClick={(e) => setSelected(e.currentTarget.value)}
        />
      </div>
      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "#1" },
            { label: "충전소 및 충전기 관리", href: "/charger/" },
            { label: "충전기 고장/파손 관리", href: "/charger/trouble" },
          ]}
        />
      </BodyBase>
    </ContainerBase>
  );
};
