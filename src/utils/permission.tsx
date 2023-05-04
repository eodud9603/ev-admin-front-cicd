/** 계정 권한 오류 모달 */
export const showPermissionErrorModal = () => {
  /* 권한 모달이 있는 경우, 제거  */
  const existModal = document.body.querySelector(".permission-modal");
  existModal?.remove();

  /* 권한 모달 > 생성  */
  const modal = document.createElement("div");
  modal.classList.add("container");
  modal.innerHTML = createPermissionModal;

  /* 권한 모달 > 버튼 이벤트 등록  */
  const closeBtn = modal.querySelector(".permission-confirm-button");
  closeBtn?.addEventListener(
    "click",
    () => {
      modal.classList.remove("show"); // 모달 숨기기 애니메이션 시작
      modal.remove();
    },
    false
  );

  /* 권한 모달 > 추가  */
  document.body?.appendChild(modal);
  setTimeout(() => {
    modal.classList.add("show");
  }, 0);
};

/** 권한 모달 UI */
const createPermissionModal = `
  <style>
    .container {
        position: relative;
        z-index: 100; 
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    .show {
        opacity: 1;
    }

    .permission-modal {
        display: block;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    
    .permission-modal-overlay {
        position: fixed;
        z-index: 9998;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    .permission-modal-content {
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

  <div class="permission-modal">
    <div class="permission-modal-overlay" />

    <div class="permission-modal-content">
      <div class="modal-header">
        <h5 class="modal-title">계정 권한 오류</h5>
      </div>

      <div>
        <p class='font-size-14 fw-semibold'>
          관리자에게 문의하여 기능 <span class="fw-bold text-turu">권한</span>을 요청하세요.
        </p>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-turu permission-confirm-button">
          확인
        </button>
      </div>
    </div>
  </div>
`;
