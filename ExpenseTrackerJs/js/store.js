/**
 * dateList {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
  }[]
 * detailList {
    2: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }[]
  }
 */
export const store = {
  currentFunds: 0,
  isFirstEdit: true,
  todayId: 1,
  dateList: [
    {
      id: 1,
      date: new Date().toLocaleDateString(),
    },
  ],
  detailList: {},
};

export function initStore() {
  let storage = sessionStorage.getItem("store");

  if (!storage) {
    updateStorage();
    storage = sessionStorage.getItem("store");
  }

  const parsed = JSON.parse(storage) || {};
  const {
    dateList = [],
    detailList = [],
    todayId = null,
    currentFunds = 0,
    isFirstEdit = true,
  } = parsed;

  store.currentFunds = currentFunds;
  store.isFirstEdit = isFirstEdit;
  store.dateList = dateList;
  store.detailList = detailList;
  store.todayId = todayId;
}

export function addNewHistory(newHistory) {
  try {
    if (store.detailList[store.todayId]) {
      store.detailList[store.todayId].push(newHistory);
    } else {
      store.detailList[store.todayId] = [newHistory];
    }

    // ✅ 수입 제거: 지출만 반영
    store.currentFunds -= newHistory.amount;

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export function removeHistory(dateId, itemId) {
  try {
    store.detailList[dateId] = store.detailList[dateId].filter(
      ({ id, amount }) => {
        if (id === Number(itemId)) {
          // ✅ 삭제 시 지출 복구 (자산 다시 더해줌)
          store.currentFunds += amount;
        }
        return id !== Number(itemId);
      }
    );

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export function updateStorage() {
  sessionStorage.setItem("store", JSON.stringify(store));
}
