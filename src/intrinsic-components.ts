import type { GjsElementTypes } from "./gjs-elements/gjs-element-types";

const IntrinsicElem = <E extends GjsElementTypes>(v: E): E => v;

/** Equivalent to the Gtk.ActionBar widget. */
export const ActionBar = IntrinsicElem("ACTION_BAR");
/** Equivalent to the Gtk.Box widget. */
export const Box = IntrinsicElem("BOX");
/**
 * Equivalent to the Gtk.Button widget. Only accepts strings as
 * children.
 */
export const Button = IntrinsicElem("BUTTON");
/**
 * Equivalent to the Gtk.Button widget. Only accepts other React
 * elements as children.
 */
export const ButtonBox = IntrinsicElem("BUTTON_BOX");
/** Equivalent to the Gtk.ButtonBox widget. */
export const ButtonGroup = IntrinsicElem("BUTTON_GROUP");
/** Equivalent to the Gtk.CheckButton widget. */
export const CheckButton = IntrinsicElem("CHECK_BUTTON");
/** Equivalent to the Gtk.Expander widget. */
export const Expander = IntrinsicElem("EXPANDER");
/** Equivalent to the Gtk.FlexBox widget. */
export const FlowBox = IntrinsicElem("FLOW_BOX");
/** Equivalent to the Gtk.FlexBoxChild widget. */
export const FlowBoxEntry = IntrinsicElem("FLOW_BOX_ENTRY");
/** Equivalent to the Gtk.Frame widget. */
export const Frame = IntrinsicElem("FRAME");
/** Equivalent to the Gtk.Grid widget. */
export const Grid = IntrinsicElem("GRID");
/** A component that must wrap each child of a `<Grid />`. */
export const GridItem = IntrinsicElem("GRID_ITEM");
/** Equivalent to the Gtk.HeaderBar widget. */
export const HeaderBar = IntrinsicElem("HEADER_BAR");
/** Equivalent to the Gtk.Button widget. */
export const Label = IntrinsicElem("LABEL");
/** Equivalent to the Gtk.LinkButton widget. */
export const LinkButton = IntrinsicElem("LINK_BUTTON");
/** Equivalent to the Gtk.SpinButton widget. */
export const NumberInput = IntrinsicElem("NUMBER_INPUT");
/** Equivalent to the Gtk.Image widget. */
export const Image = IntrinsicElem("IMAGE");
/** Equivalent to the Gtk.EventBox widget. */
export const Pressable = IntrinsicElem("PRESSABLE");
/** Equivalent to the Gtk.Box widget. */
export const RadioBox = IntrinsicElem("RADIO_BOX");
/** Equivalent to the Gtk.RadioButton widget. */
export const RadioButton = IntrinsicElem("RADIO_BUTTON");
/** Equivalent to the Gtk.Revealer widget. */
export const Revealer = IntrinsicElem("REVEALER");
/** Equivalent to the Gtk.ScrolledWindow widget. */
export const ScrollBox = IntrinsicElem("SCROLL_BOX");
/** Built on top of the Gtk.ComboBox widget. */
export const Selector = IntrinsicElem("SELECTOR");
/** Equivalent to the Gtk.Separator widget. */
export const Separator = IntrinsicElem("SEPARATOR");
/** Equivalent to the Gtk.Spinner widget. */
export const Spinner = IntrinsicElem("SPINNER");
/** Built on top of Gtk.Box and Gtk.SizeGroup. */
export const SizeGroupBox = IntrinsicElem("SIZE_GROUP_BOX");
/** Equivalent to the Gtk.ScaleButton widget. */
export const SliderPopupButton = IntrinsicElem("SLIDER_POPUP_BUTTON");
/** Equivalent to the Gtk.Scale widget. */
export const Slider = IntrinsicElem("SLIDER");
/**
 * Equivalent to the Gtk.Box widget. Specifically made to add items to
 * a Stack.
 */
export const StackScreen = IntrinsicElem("STACK_SCREEN");
/** Equivalent to the Gtk.Switch widget. */
export const Switch = IntrinsicElem("SWITCH");
/** Equivalent to the Gtk.TextView widget. */
export const TextArea = IntrinsicElem("TEXT_AREA");
/** Equivalent to the Gtk.Entry widget. */
export const TextInput = IntrinsicElem("TEXT_ENTRY");
/** Equivalent to the Gtk.Toolbar widget. */
export const Toolbar = IntrinsicElem("TOOLBAR");
/** Equivalent to the Gtk.ToolButton widget. */
export const ToolbarButton = IntrinsicElem("TOOLBAR_BUTTON");
/** Equivalent to the Gtk.ToolItem widget. */
export const ToolbarItem = IntrinsicElem("TOOLBAR_ITEM");
/** Equivalent to the Gtk.RadioToolButton widget. */
export const ToolbarRadioButton = IntrinsicElem("TOOLBAR_RADIO_BUTTON");
/** Equivalent to the Gtk.ToggleToolButton widget. */
export const ToolbarToggleButton = IntrinsicElem("TOOLBAR_TOGGLE_BUTTON");
/** Equivalent to the Gtk.ToolSeparator widget. */
export const ToolbarSeparator = IntrinsicElem("TOOLBAR_SEPARATOR");
/** Equivalent to the Gtk.Window widget. */
export const Window = IntrinsicElem("WINDOW");

export { Popover } from "./gjs-elements/gtk3/popover/component";
export { createStack, useStack } from "./gjs-elements/gtk3/stack/use-stack";

// #region Markup

/**
 * Equivalent to the Gtk.Label widget. Allows to use a Pango Markup
 * syntax for displaying text.
 */
export const Markup = IntrinsicElem("MARKUP");
/** A Markup element. Must be used inside a `<Markup />`. */
export const Span = IntrinsicElem("M_SPAN");
/** A Markup element. Must be used inside a `<Markup />`. */
export const Big = IntrinsicElem("M_BIG");
/** A Markup element. Must be used inside a `<Markup />`. */
export const Bold = IntrinsicElem("M_BOLD");
/** A Markup element. Must be used inside a `<Markup />`. */
export const Italic = IntrinsicElem("M_ITALIC");
/** A Markup element. Must be used inside a `<Markup />`. */
export const Monospace = IntrinsicElem("M_MONOSPACE");
/** A Markup element. Must be used inside a `<Markup />`. */
export const Small = IntrinsicElem("M_SMALL");
/** A Markup element. Must be used inside a `<Markup />`. */
export const Strike = IntrinsicElem("M_STRIKETHROUGH");
/** A Markup element. Must be used inside a `<Markup />`. */
export const Sub = IntrinsicElem("M_SUBSCRIPT");
/** A Markup element. Must be used inside a `<Markup />`. */
export const Sup = IntrinsicElem("M_SUPERSCRIPT");
/** A Markup element. Must be used inside a `<Markup />`. */
export const Underline = IntrinsicElem("M_UNDERLINE");
