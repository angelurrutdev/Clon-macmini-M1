import { handleActiveMenu } from "./modules/menu.js";
import { activePanel } from "./modules/active-panel.js";
import { handleActiveTabs } from "./modules/tabs.js";
import { securityPanelScroll } from "./modules/padlock-animate.js";

handleActiveMenu();
activePanel();
handleActiveTabs();
securityPanelScroll();