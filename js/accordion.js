const ACCORDION_ID = "js-accordion";
const ACCORDION_ITEM_CLASS = "accordion__item";
const ACCORDION_BTN_CLASS = "accordion__header-btn";
const ACCORDION_IS_OPEN_CLASS = "accordion__item--is-open";

export const processAccordionInteractions = () => {
  const accordion = document.getElementById(ACCORDION_ID);

  const getOpenedItems = () => {
    const openedItems = accordion.querySelectorAll(
      `.${ACCORDION_IS_OPEN_CLASS}`
    );

    return openedItems;
  };

  const closeAllOpenedItems = () => {
    const openedItems = getOpenedItems();

    openedItems.forEach((item) => {
      if (!item) return;

      const buttonTag = item.querySelector(`.${ACCORDION_BTN_CLASS}`);
      const contentDiv = buttonTag.nextElementSibling;

      item.classList.remove(ACCORDION_IS_OPEN_CLASS);
      contentDiv.style.maxHeight = null;
    });
  };

  const setContentHeightInOpenedItems = () => {
    const openedItems = getOpenedItems();

    openedItems.forEach((item) => {
      if (!item) return;

      const buttonTag = item.querySelector(`.${ACCORDION_BTN_CLASS}`);

      const contentDiv = buttonTag.nextElementSibling;
      if (!contentDiv) return;

      contentDiv.style.maxHeight = `${contentDiv.scrollHeight + 57.6 + 12}px`; // add padding top/bottom
    });
  };

  const onAccordionHeaderClick = (e) => {
    const liTag = e.target.closest(`.${ACCORDION_ITEM_CLASS}`);

    if (!liTag) return;

    const isOpen = liTag.classList.contains(ACCORDION_IS_OPEN_CLASS);

    closeAllOpenedItems();

    if (isOpen) return;

    liTag.classList.toggle(ACCORDION_IS_OPEN_CLASS);
    setContentHeightInOpenedItems();
  };

  accordion.addEventListener("click", onAccordionHeaderClick);
  window.addEventListener("resize", setContentHeightInOpenedItems);
  accordion.querySelector(`.${ACCORDION_BTN_CLASS}`).click(); // open first element
};
