import { validatePrice, validateRequired, toHidden, toShow } from "../util";
import { store, addNewHistory } from "../store";
import { renderHistoryList } from "./history-list";
import { renderCurrentAsset } from "./current-asset";

const $addItemButton = document.querySelector(".add-item-button");
const $addItemDetail = document.querySelector(".add-item-detail");
const $addItemDetailButton = document.querySelector(".item-submit-button");
const $addItemCategory = document.querySelector("#item-category");
const $addItemPrice = document.querySelector("#item-price");
const $addItemDescription = document.querySelector("#item-description");

export function initAddItem() {
  renderAddItemButton();
  addItemEditEventListener();
}

function renderAddItemButton() {
  if (store.isFirstEdit) return;
  toShow($addItemButton);
}

function addItemEditEventListener() {
  $addItemButton.addEventListener("click", function (event) {
    toHidden(event.target);
    toShow($addItemDetail);
  });

  $addItemDetailButton.addEventListener("click", function () {
    const category = $addItemCategory.value;
    const description = $addItemDescription.value;
    const priceValue = $addItemPrice.value;
    const amount = Number(priceValue); // ✅ 숫자로 변환

    if (!validateRequired({ category, description, price: amount })) {
      return alert("필수항목이 누락되었습니다.");
    }

    if (!validatePrice(store.currentFunds, amount)) {
      return alert("현재 자산 이상의 금액을 작성하셨습니다.");
    }

    const newHistory = {
      createAt: new Date().toISOString(), // ✅ ISO 문자열로 저장
      id: Date.now(),
      description,
      category,
      amount,
      fundsAtTheTime: store.currentFunds - amount, // 지출 후 자산
    };

    const isSuccess = addNewHistory(newHistory);
    if (!isSuccess) {
      alert("소비내역 저장에 실패했습니다.");
      return;
    }

    toHidden($addItemDetail);
    toShow($addItemButton);
    initAddItemInput();
    reRender();
  });
}

function reRender() {
  renderCurrentAsset();
  renderHistoryList();
}

function initAddItemInput() {
  $addItemCategory.value = "";
  $addItemDescription.value = "";
  $addItemPrice.value = "";
}
