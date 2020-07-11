var CURRENT_COUNTRY = "currentCountry";

var agent = navigator.appName;

// IE인지 판별
/**
 * IF(IE) -> true // 근데 ie 8이하 지원안할거임
 *
 * ELSE -> false
 */
// console.log(
//   (navigator.appName === "Netscape" &&
//     navigator.userAgent.search("Trident") !== -1) ||
//     agent.indexOf("msie") !== -1,
// );
var console = window.console || { log: function () {} };
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    enumerable: false,
    value: function (obj) {
      var newArr = this.filter(function (el) {
        return el == obj;
      });
      return newArr.length > 0;
    },
  });
}
// IE11
document.addEventListener("DOMContentLoaded", function () {
  initializeValidate("none");

  var flags = document.querySelectorAll(".flag");
  for (var i = 0, fl = flags.length; i < fl; i += 1) {
    flags[i].addEventListener("click", function (e) {
      var result = showFlag();
      if (!result) {
        e.preventDefault();
        return window.location.reload();
      }
      var id = e.target.id;
      if (id) {
        hideFlag(id);
      }
    });
  }
});

// Chrome, Mozilla, Opera, WebKit

function initializeValidate(display) {
  var validFlags = isStoredItemValid();
  var country = getStoredItem();

  if (validFlags.includes(country)) return triggerDisplay(country, display);
  else {
    localStorage.setItem(CURRENT_COUNTRY, "korea");
    return triggerDisplay(localStorage.getItem(CURRENT_COUNTRY), display);
  }
}

function validateStore(display) {
  var validFlags = isStoredItemValid();
  var country = getStoredItem();

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
  var validFlags = [];
  var flags = document.querySelectorAll(".flag-img");

  for (var i = 0, fl = flags.length; i < fl; i += 1) {
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
