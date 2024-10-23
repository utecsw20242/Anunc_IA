import slideUp from "./slideUp";
import slideDown from "./slideDown";
import getParents from "./getParents";

// Función para manejar el enlace actual
export const currentLink = (selector) => {
    let elements = document.querySelectorAll(selector);
    elements.forEach((item) => {
        const activeRouterLink = item.classList.contains("active");
        if (activeRouterLink) {
            let parents = getParents(item, `.menu-base`, "menu-item");
            parents.forEach((parent) => {
                parent.classList.add(
                    "[&>*]:text-blue-600", "[&>*]:dark:text-blue-600",
                    "active",
                    "current"
                );
                let subItem = parent.querySelector(`.sub-menu`);
                if (subItem) subItem.style.display = "block";
            });
        } else {
            item.parentElement.classList.remove(
                "[&>*]:text-blue-600", "[&>*]:dark:text-blue-600",
                "active",
                "current"
            );
        }
    });
};

// Función para desplegar un dropdown
export const dropdownToggle = (elm) => {
    let parent = elm.parentElement;
    let nextElm = elm.nextElementSibling;
    let speed = nextElm.children.length > 5 ? 400 + nextElm.children.length * 10 : 400;
    if (!parent.classList.contains("active")) {
        parent.classList.add("[&>*]:text-blue-600", "[&>*]:dark:text-blue-600", "active");
        slideDown(nextElm, speed);
    } else {
        parent.classList.remove("[&>*]:text-blue-600", "[&>*]:dark:text-blue-600", "active");
        slideUp(nextElm, speed);
    }
};

// Función para cerrar los hermanos del menú desplegable
export const closeSiblings = (elm) => {
    let parent = elm.parentElement;
    let siblings = parent.parentElement.children;
    Array.from(siblings).forEach((item) => {
        if (item !== parent) {
            item.classList.remove("[&>*]:text-blue-600", "[&>*]:dark:text-blue-600", "active");
            if (item.classList.contains("has-sub")) {
                let subItem = item.querySelectorAll(`.sub-menu`);
                subItem.forEach((child) => {
                    child.parentElement.classList.remove("[&>*]:text-blue-600", "[&>*]:dark:text-blue-600", "active");
                    slideUp(child, 400);
                });
            }
        }
    });
};
