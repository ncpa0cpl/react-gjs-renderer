import { DataType } from "dilswer";
import type Gdk from "gi://Gdk";
import Gtk from "gi://Gtk";
import { EventPhase } from "../../../reconciler/event-phase";
import type { GjsContext } from "../../../reconciler/gjs-renderer";
import type { HostContext } from "../../../reconciler/host-context";
import type { GjsElement } from "../../gjs-element";
import { diffProps } from "../../utils/diff-props";
import { ChildOrderController } from "../../utils/element-extenders/child-order-controller";
import { ElementLifecycleController } from "../../utils/element-extenders/element-lifecycle-controller";
import type { SyntheticEvent } from "../../utils/element-extenders/event-handlers";
import { EventHandlers } from "../../utils/element-extenders/event-handlers";
import type { DiffedProps } from "../../utils/element-extenders/map-properties";
import { PropertyMapper } from "../../utils/element-extenders/map-properties";
import { ensureNotText } from "../../utils/ensure-not-string";
import type { MouseButtonPressEvent } from "../../utils/gdk-events/mouse-button-press-event";
import { parseMouseButtonPressEvent } from "../../utils/gdk-events/mouse-button-press-event";
import { parseCrossingEvent } from "../../utils/gdk-events/pointer-event";
import type { AlignmentProps } from "../../utils/property-maps-factories/create-alignment-prop-mapper";
import { createAlignmentPropMapper } from "../../utils/property-maps-factories/create-alignment-prop-mapper";
import type { MarginProps } from "../../utils/property-maps-factories/create-margin-prop-mapper";
import { createMarginPropMapper } from "../../utils/property-maps-factories/create-margin-prop-mapper";
import type { StyleProps } from "../../utils/property-maps-factories/create-style-prop-mapper";
import { createStylePropMapper } from "../../utils/property-maps-factories/create-style-prop-mapper";
import type { TextNode } from "../markup/text-node";

type PressablePropsMixin = AlignmentProps & MarginProps & StyleProps;

export interface PressableProps extends PressablePropsMixin {
  onClick?: (event: SyntheticEvent<MouseButtonPressEvent>) => void;
  onRelease?: (event: SyntheticEvent<MouseButtonPressEvent>) => void;
  onMouseEnter?: (event: SyntheticEvent<PointerEvent>) => void;
  onMouseLeave?: (event: SyntheticEvent<PointerEvent>) => void;
  /**
   * If set to true, the pressable element will intercept mouse events
   * on it's children. Meaning children will not receive any mouse
   * events.
   */
  interceptChildEvents?: boolean;
  /**
   * Determine if the Pressable should be drawn or not (this does not
   * include it's children, only the Pressable itself).
   *
   * By default this is set to `false` and as a result any styles
   * applied to the Pressable will not be visible.
   */
  draw?: boolean;
}

export class PressableElement implements GjsElement<"PRESSABLE", Gtk.EventBox> {
  static getContext(
    currentContext: HostContext<GjsContext>
  ): HostContext<GjsContext> {
    return currentContext;
  }

  readonly kind = "PRESSABLE";
  widget = new Gtk.EventBox();

  private parent: GjsElement | null = null;

  private readonly lifecycle = new ElementLifecycleController();
  private children = new ChildOrderController(this.lifecycle, this.widget);
  private handlers = new EventHandlers<Gtk.EventBox, PressableProps>(
    this.lifecycle,
    this.widget
  );
  private readonly propsMapper = new PropertyMapper<PressableProps>(
    this.lifecycle,
    createAlignmentPropMapper(this.widget),
    createMarginPropMapper(this.widget),
    createStylePropMapper(this.widget),
    (props) =>
      props
        .interceptChildEvents(DataType.Boolean, (v = false) => {
          this.widget.set_above_child(v);
        })
        .draw(DataType.Boolean, (v = false) => {
          this.widget.set_visible_window(v);
        })
  );

  constructor(props: DiffedProps) {
    this.handlers.bind("button-press-event", "onClick", (e: Gdk.EventButton) =>
      parseMouseButtonPressEvent(e)
    );
    this.handlers.bind(
      "button-release-event",
      "onRelease",
      (e: Gdk.EventButton) => parseMouseButtonPressEvent(e)
    );
    this.handlers.bind(
      "enter-notify-event",
      "onMouseEnter",
      parseCrossingEvent,
      EventPhase.Action
    );
    this.handlers.bind(
      "leave-notify-event",
      "onMouseLeave",
      parseCrossingEvent,
      EventPhase.Action
    );

    this.updateProps(props);

    this.lifecycle.emitLifecycleEventAfterCreate();
  }

  updateProps(props: DiffedProps): void {
    this.lifecycle.emitLifecycleEventUpdate(props);
  }

  // #region This widget direct mutations

  appendChild(child: GjsElement | TextNode): void {
    ensureNotText(child);

    child.notifyWillAppendTo(this);
    this.children.addChild(child);
    this.widget.show_all();
  }

  insertBefore(newChild: GjsElement | TextNode, beforeChild: GjsElement): void {
    ensureNotText(newChild);

    newChild.notifyWillAppendTo(this);

    this.children.insertBefore(newChild, beforeChild);

    this.widget.show_all();
  }

  remove(parent: GjsElement): void {
    parent.notifyWillUnmount(this);

    this.lifecycle.emitLifecycleEventBeforeDestroy();

    this.widget.destroy();
  }

  render() {
    this.parent?.widget.show_all();
  }

  // #endregion

  // #region Element internal signals

  notifyWillAppendTo(parent: GjsElement): void {
    this.parent = parent;
  }

  notifyWillUnmount(child: GjsElement): void {
    this.children.removeChild(child);
  }

  // #endregion

  // #region Utils for external use

  show() {
    this.widget.visible = true;
  }

  hide() {
    this.widget.visible = false;
  }

  diffProps(
    oldProps: Record<string, any>,
    newProps: Record<string, any>
  ): DiffedProps {
    return diffProps(oldProps, newProps, true);
  }

  // #endregion
}
