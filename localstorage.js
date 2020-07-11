const CURRENT_COUNTRY = "currentCountry";

const agent = window.navigator.userAgent.toLowerCase();

document.addEventListener("DOMContentLoaded", () => {
  initializeValidate("none");

  const flags = document.querySelectorAll(".flag");
  for (const i of flags) {
    i.addEventListener("click", (e) => {
      const result = showFlag();
      if (!result) {
        e.preventDefault();
        return window.location.reload();
      }
      const id = e.target.id;
      if (id) {
        hideFlag(id);
      }
    });
  }
});

function initializeValidate(display) {
  const validFlags = isStoredItemValid();
  const country = getStoredItem();

  if (validFlags.includes(country)) return triggerDisplay(country, display);
  else {
    localStorage.setItem(CURRENT_COUNTRY, "korea");
    return triggerDisplay(localStorage.getItem(CURRENT_COUNTRY), display);
  }
}

function validateStore(display) {
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
    localStorage.setItem(CURRENT_COUNTRY, "korea");
    return false;
  }
}

function isStoredItemValid() {
  const validFlags = [];
  const flags = document.querySelectorAll(".flag-img");
  for (let i = 0, fl = flags.length; i < fl; i += 1) {
    validFlags.push(flags[i].id);
  }
  return validFlags;
}

function getStoredItem() {
  return localStorage.getItem(CURRENT_COUNTRY);
}

function showFlag() {
  return validateStore("block");
}

function hideFlag(targetId) {
  localStorage.setItem(CURRENT_COUNTRY, targetId);
  triggerDisplay(targetId, "none");
}

function triggerDisplay(targetId, display) {
  document.getElementById(targetId).parentElement.style.display = display;
  document.getElementById("country").innerText = targetId;
}
