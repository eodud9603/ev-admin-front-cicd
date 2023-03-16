import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { InputGroup, Label, ModalBody, ModalFooter } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import useInputs from "src/hooks/useInputs";

const categoryList = [
  {
    categoryId: 1,
    text: "가입 승인",
  },
  {
    categoryId: 2,
    text: "결제 카드",
  },
  {
    categoryId: 3,
    text: "충전기 계약",
  },
  {
    categoryId: 4,
    text: "충전기 사용",
  },
  {
    categoryId: 5,
    text: "기타",
  },
];

interface ICategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ICategoryItemProps {
  text: string;
}

interface ICategoryItemRef {
  checked: boolean;
  onChangeChecked: (bool: boolean) => void;
  data: ICategoryItemProps;
}

const CategoryModal = (props: ICategoryModalProps) => {
  const { isOpen, onClose } = props;
  const { categoryText, onChange } = useInputs({
    categoryText: "",
  });
  const [page, setPage] = useState(1);

  const itemsRef = useRef<ICategoryItemRef[]>([]);

  return (
    <ModalBase title={"카테고리명"} isOpen={isOpen} onClose={onClose}>
      {/* 카테고리 인풋 */}
      <ModalBody
        style={{ height: "70vh", overflowY: "scroll" }}
        className={"p-0 pt-4 pb-2"}
      >
        <section
          className={
            "mb-3 mx-2 py-3 px-3 bg-light bg-opacity-50 border rounded"
          }
        >
          <InputGroup>
            <Label
              for={"categoryText"}
              className={"font-size-16 fw-bold m-0 me-3 align-self-center"}
            >
              카테고리명
            </Label>
            <TextInputBase
              className={"rounded-start"}
              name={"categoryText"}
              placeholder={"카테고리명을 입력해주세요."}
              value={categoryText}
              onChange={onChange}
            />
            <ButtonBase label={"추가"} color={"dark"} />
          </InputGroup>
        </section>

        {/* 카테고리 목록 헤더 */}
        <div
          className={
            "mb-3 px-2 pb-2 border-bottom " +
            "d-flex align-items-center justify-content-between"
          }
        >
          <span className={"font-size-16 fw-semibold"}>카테고리 목록</span>

          <ButtonBase
            className={"w-md"}
            label={"선택 삭제"}
            color={"dark"}
            onClick={() => {
              /** @TODO 카테고리 삭제 로직 추가 */

              for (const category of itemsRef.current) {
                category.onChangeChecked(false);
              }
            }}
          />
        </div>
        <div className={"mx-2"}>
          {/* 카테고리 목록 */}
          {categoryList.map((category, index) => (
            <CategoryItem
              ref={(ref: ICategoryItemRef) => (itemsRef.current[index] = ref)}
              key={index}
              {...category}
            />
          ))}
        </div>
      </ModalBody>

      <ModalFooter
        className={"p-0 pt-2 pb-3 d-flex flex-column align-items-center"}
      >
        <PaginationBase setPage={setPage} data={{}} />
        <ButtonBase
          className={"w-md"}
          label={"저장하기"}
          onClick={() => {
            /** @TODO 저장하기 로직 추가 */
          }}
        />
      </ModalFooter>
    </ModalBase>
  );
};

export default CategoryModal;

const CategoryItem = forwardRef<ICategoryItemRef, ICategoryItemProps>(
  (props, ref) => {
    const { text } = props;
    const [checked, setChecked] = useState(false);
    const { categoryItemName: categoryItemText, onChange } = useInputs({
      categoryItemName: text,
    });

    useImperativeHandle(
      ref,
      () => ({
        checked,
        onChangeChecked: (bool: boolean) => setChecked(bool),
        data: props,
      }),
      [checked, props]
    );

    return (
      <div className={"mb-3 d-flex align-items-center gap-2"}>
        <CheckBoxBase
          name={"categoryItemName"}
          label={""}
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
        <TextInputBase
          bsSize={"lg"}
          name={"categoryItemName"}
          value={categoryItemText}
          onChange={onChange}
        />
        <ButtonBase
          className={"width-110"}
          label={"수정"}
          color={"turu"}
          onClick={() => {
            /** @TODO 수정 로직 추가 ㄴ*/
          }}
        />
        <ButtonBase
          className={"width-110"}
          label={"삭제"}
          color={"dark"}
          onClick={() => {
            /** @TODO 삭제 로직 추가 */
          }}
        />
      </div>
    );
  }
);
