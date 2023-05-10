interface IErrorModalProps {
  className: string;
  title: string;
  content: string;
  confirmHandler?: () => void;
}

export const showErrorModal = ({
  className,
  title,
  content,
  confirmHandler,
}: IErrorModalProps) => {
  /* classNam에 해당하는 에러 모달이 있는 경우(opened), 재생성X  */
  const existModal = document.body.querySelector(`.${className}`);
  if (existModal) {
    return;
  }

  /* 에러 모달 > 생성  */
  const modal = document.createElement("div");
  modal.classList.add(`${className}-container`);
  modal.innerHTML = createPermissionModal({ className, title, content });

  /* 에러 모달 > 버튼 이벤트 등록  */
  const closeBtn = modal.querySelector(`.${className}-confirm-button`);
  closeBtn?.addEventListener(
    "click",
    () => {
      modal.classList.remove(`${className}-show`);
      modal.remove();
      !!confirmHandler && confirmHandler();
    },
    false
  );

  /* 에러 모달 > 추가  */
  document.body?.appendChild(modal);
  setTimeout(() => {
    modal.classList.add(`${className}-show`);
  }, 0);
};

/** 에러 모달 UI */
const createPermissionModal = ({
  className,
  title,
  content,
}: IErrorModalProps) => `
  <style>
    .${className}-container {
        position: relative;
        z-index: 100; 
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    .${className}-show {
        opacity: 1;
    }

    .${className} {
        display: block;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    
    .${className}-overlay {
        position: fixed;
        z-index: 9998;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    .${className}-content {
        position: relative;
        top: 20px;
        z-index: 9999;
        margin: auto;
        width: 80%;
        max-width: 500px;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  </style>

  <div class="${className}">
    <div class="${className}-overlay" />

    <div class="${className}-content">
      <div class="modal-header">
        <h5 class="modal-title">${title}</h5>
      </div>

      <div>
        <p 
          style='white-space: pre-wrap;' class='font-size-14 fw-semibold'
        >${content}</p>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-turu ${className}-confirm-button">
          확인
        </button>
      </div>
    </div>
  </div>
`;
