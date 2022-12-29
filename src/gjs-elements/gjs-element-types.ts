export interface GjsElementTypeRegistry {
  ACTION_BAR: "ACTION_BAR";
  BOX: "BOX";
  BUTTON_BOX: "BUTTON_BOX";
  BUTTON_GROUP: "BUTTON_GROUP";
  BUTTON: "BUTTON";
  CHECK_BUTTON: "CHECK_BUTTON";
  EXPANDER: "EXPANDER";
  FLOW_BOX_ENTRY: "FLOW_BOX_ENTRY";
  FLOW_BOX: "FLOW_BOX";
  FRAME: "FRAME";
  GRID_ITEM: "GRID_ITEM";
  GRID: "GRID";
  HEADER_BAR: "HEADER_BAR";
  IMAGE: "IMAGE";
  LABEL: "LABEL";
  LINK_BUTTON: "LINK_BUTTON";
  M_BIG: "M_BIG";
  M_BOLD: "M_BOLD";
  M_ITALIC: "M_ITALIC";
  M_MONOSPACE: "M_MONOSPACE";
  M_SMALL: "M_SMALL";
  M_SPAN: "M_SPAN";
  M_STRIKETHROUGH: "M_STRIKETHROUGH";
  M_SUBSCRIPT: "M_SUBSCRIPT";
  M_SUPERSCRIPT: "M_SUPERSCRIPT";
  M_UNDERLINE: "M_UNDERLINE";
  MARKUP: "MARKUP";
  NUMBER_INPUT: "NUMBER_INPUT";
  POPOVER_CONTENT: "POPOVER_CONTENT";
  POPOVER_TARGET: "POPOVER_TARGET";
  POPOVER: "POPOVER";
  PRESSABLE: "PRESSABLE";
  RADIO_BOX: "RADIO_BOX";
  RADIO_BUTTON: "RADIO_BUTTON";
  REVEALER: "REVEALER";
  SCROLL_BOX: "SCROLL_BOX";
  SELECTOR: "SELECTOR";
  SEPARATOR: "SEPARATOR";
  SIZE_GROUP_BOX: "SIZE_GROUP_BOX";
  SLIDER_POPUP_BUTTON: "SLIDER_POPUP_BUTTON";
  SLIDER: "SLIDER";
  SPINNER: "SPINNER";
  STACK_SCREEN: "STACK_SCREEN";
  STACK_SWITCHER: "STACK_SWITCHER";
  STACK: "STACK";
  SWITCH: "SWITCH";
  TEXT_AREA: "TEXT_AREA";
  TEXT_ENTRY: "TEXT_ENTRY";
  TOOLBAR_BUTTON: "TOOLBAR_BUTTON";
  TOOLBAR_ITEM: "TOOLBAR_ITEM";
  TOOLBAR_RADIO_BUTTON: "TOOLBAR_RADIO_BUTTON";
  TOOLBAR_SEPARATOR: "TOOLBAR_SEPARATOR";
  TOOLBAR_TOGGLE_BUTTON: "TOOLBAR_TOGGLE_BUTTON";
  TOOLBAR: "TOOLBAR";
  WINDOW: "WINDOW";
}

export type GjsElementTypes = keyof GjsElementTypeRegistry;
