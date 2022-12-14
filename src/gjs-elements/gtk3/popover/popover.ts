import { DataType } from "dilswer";
import Gtk from "gi://Gtk";
import { PopoverConstraint, PositionType } from "../../../g-enums";
import type { GjsContext } from "../../../reconciler/gjs-renderer";
import type { HostContext } from "../../../reconciler/host-context";
import type { GjsElement } from "../../gjs-element";
import { GjsElementManager } from "../../gjs-element-manager";
import { diffProps } from "../../utils/diff-props";
import { ElementLifecycleController } from "../../utils/element-extenders/element-lifecycle-controller";
import { EventHandlers } from "../../utils/element-extenders/event-handlers";
import type { DiffedProps } from "../../utils/element-extenders/map-properties";
import { PropertyMapper } from "../../utils/element-extenders/map-properties";
import type { AlignmentProps } from "../../utils/property-maps-factories/create-alignment-prop-mapper";
import { createAlignmentPropMapper } from "../../utils/property-maps-factories/create-alignment-prop-mapper";
import type { MarginProps } from "../../utils/property-maps-factories/create-margin-prop-mapper";
import { createMarginPropMapper } from "../../utils/property-maps-factories/create-margin-prop-mapper";
import type { StyleProps } from "../../utils/property-maps-factories/create-style-prop-mapper";
import { createStylePropMapper } from "../../utils/property-maps-factories/create-style-prop-mapper";
import type { TextNode } from "../markup/text-node";
import { PopoverContentElement } from "./popover-content";
import { PopoverTargetElement } from "./popover-target";

type PopoverPropsMixin = AlignmentProps & MarginProps & StyleProps;

export interface PopoverProps extends PopoverPropsMixin {
  isModal?: boolean;
  constraint?: PopoverConstraint;
  position?: PositionType;
}

export type PopoverInternalProps = {
  popoverWidget: Gtk.Popover;
};

export class PopoverElement implements GjsElement<"POPOVER", Gtk.Box> {
  static getContext(
    currentContext: HostContext<GjsContext>
  ): HostContext<GjsContext> {
    return currentContext;
  }

  readonly kind = "POPOVER";
  widget = new Gtk.Box();
  popover!: Gtk.Popover;

  private parent: GjsElement | null = null;

  private readonly lifecycle = new ElementLifecycleController();
  private readonly handlers: EventHandlers<Gtk.Popover, PopoverProps>;
  private readonly propsMapper = new PropertyMapper<
    PopoverProps & PopoverInternalProps
  >(
    this.lifecycle,
    createAlignmentPropMapper(this.widget),
    createMarginPropMapper(this.widget),
    createStylePropMapper(this.widget),
    (props) =>
      props
        .popoverWidget(DataType.Unknown, (popoverWidget) => {
          this.popover = popoverWidget as Gtk.Popover;
          this.popover.set_relative_to(this.widget);
        })
        .isModal(DataType.Boolean, (v = false) => {
          this.popover.set_modal(v);
        })
        .constraint(
          DataType.Enum(PopoverConstraint),
          (v = PopoverConstraint.NONE) => {
            this.popover.set_constrain_to(v);
          }
        )
        .position(DataType.Enum(PositionType), (v = PositionType.BOTTOM) => {
          this.popover.set_position(v);
        })
  );

  private hasContentChild = false;
  private contentElement?: PopoverContentElement;
  private hasTarget = false;
  private targetElement?: PopoverTargetElement;

  constructor(props: DiffedProps) {
    this.propsMapper.skipDefaults();
    this.updateProps(props);

    this.handlers = new EventHandlers(this.lifecycle, this.popover);

    this.lifecycle.emitLifecycleEventAfterCreate();
  }

  onContentChange() {
    if (this.targetElement) this.popover.add(this.targetElement.widget);
  }

  onTargetChange() {
    if (this.contentElement) this.widget.add(this.contentElement.widget);
  }

  updateProps(props: DiffedProps): void {
    this.lifecycle.emitLifecycleEventUpdate(props);
  }

  // #region This widget direct mutations

  appendChild(child: GjsElement | TextNode): void {
    if (GjsElementManager.isGjsElementOfKind(child, PopoverContentElement)) {
      if (this.hasContentChild) {
        throw new Error("Popover can only have one child");
      }
      child.notifyWillAppendTo(this);
      this.popover.add(child.widget);
      this.hasContentChild = true;
      this.contentElement = child;
    } else if (
      GjsElementManager.isGjsElementOfKind(child, PopoverTargetElement)
    ) {
      if (this.hasTarget) {
        throw new Error("Popover can only have one target");
      }
      child.notifyWillAppendTo(this);
      this.widget.add(child.widget);
      this.hasTarget = true;
      this.targetElement = child;
    } else {
      throw new Error(
        "Popover can only have one PopoverTarget and one PopoverContent as it's children."
      );
    }
  }

  insertBefore(newChild: GjsElement | TextNode): void {
    this.appendChild(newChild);
  }

  remove(parent: GjsElement): void {
    parent.notifyWillUnmount(this);

    this.lifecycle.emitLifecycleEventBeforeDestroy();

    this.widget.destroy();
    this.popover.destroy();
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
    if (GjsElementManager.isGjsElementOfKind(child, PopoverContentElement)) {
      this.hasContentChild = false;
      this.contentElement = undefined;
    } else if (
      GjsElementManager.isGjsElementOfKind(child, PopoverTargetElement)
    ) {
      this.hasTarget = false;
      this.targetElement = undefined;
    }
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
