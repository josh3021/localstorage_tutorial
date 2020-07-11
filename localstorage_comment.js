const CURRENT_COUNTRY = "currentCountry";

// Chrome, Mozilla, Opera, WebKit은 이렇게
if (document.addEventListener) {
  // jquery onload로도 됨
  document.addEventListener("DOMContentLoaded", () => {
    /**
     * Initialize 검증
     */
    initializeValidate("none");
    // if (!result) return window.location.reload();
    /**
     * 검증 종료
     */

    // class로 이벤트 attach
    const flags = document.querySelectorAll(".flag");
    for (const i of flags) {
      // while로 바꿔도 무관
      i.addEventListener("click", (e) => {
        // 깃발을 보여주고
        const result = showFlag();
        if (!result) {
          e.preventDefault();
          return window.location.reload();
        }
        // 선택된 깃발을 숨긴다

        const id = e.target.id;
        if (id) {
          hideFlag(id);
        }
      });
    }
  });
}

function initializeValidate(display) {
  const validFlags = isStoredItemValid();
  const country = getStoredItem();

  try {
    if (validFlags.includes(country)) {
      return triggerDisplay(country, display);
    }
    throw new Error({
      code: 400,
      message:
        "언어설정에 비정상적인 값이 인식되었습니다.\n언어가 재설정됩니다.",
    });
  } catch (err) {
    alert(JSON.stringify(err));
    // 여기에서 서버에서 받는 값을 localStorage로 넣어주고 리로드
    // (*주의: 이미지의 id attribute와 서버의 값은 **무조건** 같게 설정을 해놓으셔야합니다.)
    // 비동기 하려면 async await 혹은 promise를 **꼭꼭꼭** 사용해서 요청하고 setItem
    // 'korea'는 예시
    localStorage.setItem(CURRENT_COUNTRY, "korea");
    // window.location.reload();
  }
}

function validateStore(display) {
  /**
   * 만약에 localStorage에 이상한 값이 들어왔으면 이 국기 셀렉트는 완전히 먹통이 된다.
   * 그래서 처음에 국기가 가능한 것들만 먼저 가져와서 검증을 해야함
   *
   * 방법: 가능한 국기들을 validFlags 배열 안에 모두 넣고, localStorage에서 가져온 값은 onloadCountry안에 넣는다.
   * validFlags에 onloadCountry값이 없으면 localstorage에서 지워버린다.
   *
   *
   */
  const validFlags = isStoredItemValid();
  const country = getStoredItem();

  try {
    if (document.getElementById("country").innerText !== country) {
      throw {
        code: 406,
        message: "임의적인 값 변경이 감지되었습니다. 언어가 재설정됩니다.",
      };
    }

    if (validFlags.includes(country)) {
      triggerDisplay(country, display);
      return true;
    }
    throw {
      code: 400,
      message:
        "언어설정에 비정상적인 값이 인식되었습니다. 언어가 재설정됩니다.",
    };
  } catch (err) {
    alert(JSON.stringify(err));
    // 여기에서 서버에서 받는 값을 localStorage로 넣어주고 리로드
    // (*주의: 이미지의 id attribute와 서버의 값은 **무조건** 같게 설정을 해놓으셔야합니다.)
    // 비동기 하려면 async await 혹은 promise를 **꼭꼭꼭** 사용해서 요청하고 setItem
    // 'korea'는 예시
    localStorage.setItem(CURRENT_COUNTRY, "korea");
    return false;
  }
}

function isStoredItemValid() {
  const validFlags = [];
  const flags = document.querySelectorAll(".flag-img");
  for (let i = 0, fl = flags.length; i < fl; i += 1) {
    validFlags.push(flags[i].id); //원래는 그냥 push 하면 안되고 immutable하게 push해야되지만
  }
  return validFlags;
}

function getStoredItem() {
  return localStorage.getItem(CURRENT_COUNTRY);
}

function showFlag() {
  // 먼저 숨겨져 있던 깃발을 다시 보여주고
  return validateStore("block");
  // const currentCountry = getStoredItem();
  // triggerDisplay(currentCountry, "block");
}

function hideFlag(targetId) {
  localStorage.setItem(CURRENT_COUNTRY, targetId);
  triggerDisplay(targetId, "none");
}

function triggerDisplay(targetId, display) {
  // id로 받은 img태그 부모인 a tag를 숨기자 || 보여주자
  document.getElementById(targetId).parentElement.style.display = display;
  document.getElementById("country").innerText = targetId;
}
