import { DataType } from "dilswer";
import Gdk from "gi://Gdk?version=3.0";
import Gtk from "gi://Gtk";
import type { GjsContext } from "../../../reconciler/gjs-renderer";
import type { HostContext } from "../../../reconciler/host-context";
import type { GjsElement } from "../../gjs-element";
import type { ElementMargin } from "../../utils/apply-margin";
import { diffProps } from "../../utils/diff-props";
import { ElementLifecycleController } from "../../utils/element-extenders/element-lifecycle-controller";
import type { SyntheticEvent } from "../../utils/element-extenders/event-handlers";
import { EventHandlers } from "../../utils/element-extenders/event-handlers";
import type { DiffedProps } from "../../utils/element-extenders/map-properties";
import { PropertyMapper } from "../../utils/element-extenders/map-properties";
import type { KeyPressEvent } from "../../utils/gdk-events/key-press-event";
import { parseEventKey } from "../../utils/gdk-events/key-press-event";
import type { AlignmentProps } from "../../utils/property-maps-factories/create-alignment-prop-mapper";
import { createAlignmentPropMapper } from "../../utils/property-maps-factories/create-alignment-prop-mapper";
import type { MarginProps } from "../../utils/property-maps-factories/create-margin-prop-mapper";
import { createMarginPropMapper } from "../../utils/property-maps-factories/create-margin-prop-mapper";
import type { StyleProps } from "../../utils/property-maps-factories/create-style-prop-mapper";
import { createStylePropMapper } from "../../utils/property-maps-factories/create-style-prop-mapper";

type TextEntryPropsMixin = AlignmentProps & MarginProps & StyleProps;

export interface TextEntryProps extends TextEntryPropsMixin {
  value?: string;
  margin?: ElementMargin;
  onChange?: (event: SyntheticEvent<{ text: string }>) => void;
  onKeyPress?: (event: SyntheticEvent<KeyPressEvent>) => void;
  onKeyRelease?: (event: SyntheticEvent<KeyPressEvent>) => void;
}

export class TextEntryElement implements GjsElement<"TEXT_ENTRY", Gtk.Entry> {
  static getContext(
    currentContext: HostContext<GjsContext>
  ): HostContext<GjsContext> {
    return currentContext;
  }

  readonly kind = "TEXT_ENTRY";
  private textBuffer = new Gtk.EntryBuffer();
  widget = new Gtk.Entry({
    buffer: this.textBuffer,
    visible: true,
  });

  private parent: GjsElement | null = null;

  private readonly lifecycle = new ElementLifecycleController();
  private readonly handlers = new EventHandlers<Gtk.Entry, TextEntryProps>(
    this.lifecycle,
    this.widget
  );

  private readonly propsMapper = new PropertyMapper<TextEntryProps>(
    this.lifecycle,
    createAlignmentPropMapper(this.widget),
    createMarginPropMapper(this.widget),
    createStylePropMapper(this.widget),
    (props) =>
      props.value(DataType.String, (v = "") => {
        this.widget.set_text(v);
      })
  );

  constructor(props: DiffedProps) {
    this.handlers.bind("changed", "onChange", () => ({
      text: this.widget.text,
    }));
    this.handlers.bind("key-press-event", "onKeyPress", (event: Gdk.EventKey) =>
      parseEventKey(event, Gdk.EventType.KEY_PRESS)
    );
    this.handlers.bind(
      "key-release-event",
      "onKeyRelease",
      (event: Gdk.EventKey) => parseEventKey(event, Gdk.EventType.KEY_RELEASE)
    );

    this.updateProps(props);

    this.lifecycle.emitLifecycleEventAfterCreate();
  }

  updateProps(props: DiffedProps): void {
    this.lifecycle.emitLifecycleEventUpdate(props);
  }

  // #region This widget direct mutations

  appendChild(): void {
    throw new Error("Text Entry cannot have children.");
  }

  insertBefore(): void {
    throw new Error("TextEntry does not support children.");
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

  notifyWillUnmount() {}

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
