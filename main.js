import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./scss/main.scss";

const ACCORDION_ID = "js-accordion";
const ACCORDION_ITEM_CLASS = "accordion__item";
const ACCORDION_BTN_CLASS = "accordion__header-btn";
const ACCORDION_IS_OPEN_CLASS = "accordion__item--is-open";

const processAccordionInteractions = () => {
  const accordion = document.getElementById(ACCORDION_ID);

  const closeAllOpenedItems = () => {
    const openedItems = accordion.querySelectorAll(
      `.${ACCORDION_IS_OPEN_CLASS}`
    );

    openedItems.forEach((item) => {
      if (!item) return;

      const buttonTag = item.querySelector(`.${ACCORDION_BTN_CLASS}`);
      const contentDiv = buttonTag.nextElementSibling;

      item.classList.remove(ACCORDION_IS_OPEN_CLASS);
      contentDiv.style.maxHeight = null;
    });
  };

  const onAccordionHeaderClick = (e) => {
    const liTag = e.target.closest(`.${ACCORDION_ITEM_CLASS}`);
    const buttonTag = e.target.closest(`.${ACCORDION_BTN_CLASS}`);

    if (!buttonTag || !liTag) return;

    const contentDiv = buttonTag.nextElementSibling;
    if (!contentDiv) return;

    const isOpen = liTag.classList.contains(ACCORDION_IS_OPEN_CLASS);

    closeAllOpenedItems();

    if (isOpen) return;

    liTag.classList.toggle(ACCORDION_IS_OPEN_CLASS);
    contentDiv.style.maxHeight = `${contentDiv.scrollHeight + 57.6 + 12}px`;
  };

  accordion.addEventListener("click", onAccordionHeaderClick);
  accordion.querySelector(`.${ACCORDION_BTN_CLASS}`).click(); // open first element
};

const main = (() => {
  processAccordionInteractions();
})();
