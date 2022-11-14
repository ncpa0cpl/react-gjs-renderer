import { DataType } from "dilswer";
import Gtk from "gi://Gtk?version=3.0";
import type { PositionType } from "../../g-enums";
import type { GjsElement } from "../gjs-element";
import type { ElementMargin } from "../utils/apply-margin";
import { EventHandlers } from "../utils/event-handlers";
import type { DiffedProps } from "../utils/map-properties";
import { createPropMap } from "../utils/map-properties";
import type { AlignmentProps } from "../utils/property-maps-factories/create-alignment-prop-mapper";
import { createAlignmentPropMapper } from "../utils/property-maps-factories/create-alignment-prop-mapper";
import type { MarginProps } from "../utils/property-maps-factories/create-margin-prop-mapper";
import { createMarginPropMapper } from "../utils/property-maps-factories/create-margin-prop-mapper";

type ButtonPropsMixin = AlignmentProps & MarginProps;

export interface ButtonProps extends ButtonPropsMixin {
  label?: string;
  image?: Gtk.Widget;
  imagePosition?: PositionType;
  useUnderline?: boolean;
  margin?: ElementMargin;
  onClick?: () => void;
  onActivate?: () => void;
  onEnter?: () => void;
  onLeave?: () => void;
  onPressed?: () => void;
  onReleased?: () => void;
}

const WidgetDataType = DataType.Custom(
  (v: any): v is Gtk.Widget => typeof v === "object"
);

export class ButtonElement implements GjsElement<"BUTTON"> {
  readonly kind = "BUTTON";

  private widget = new Gtk.Button();
  private parent: Gtk.Container | null = null;

  private readonly handlers = new EventHandlers<Gtk.Button, ButtonProps>(
    this.widget
  );

  private readonly mapProps = createPropMap<ButtonProps>(
    createAlignmentPropMapper(this.widget),
    createMarginPropMapper(this.widget),
    (props) =>
      props
        .label(DataType.String, (v = "") => {
          this.widget.label = v;
        })
        .image(WidgetDataType, (v) => {
          this.widget.set_image(v ?? null);
        })
        .imagePosition(
          DataType.Enum(Gtk.PositionType),
          (v = Gtk.PositionType.LEFT) => {
            this.widget.image_position = v;
          }
        )
        .useUnderline(DataType.Boolean, (v = false) => {
          this.widget.use_underline = v;
        })
  );

  constructor(props: any) {
    this.handlers.bind("clicked", "onClick");
    this.handlers.bind("activate", "onActivate");
    this.handlers.bind("enter", "onEnter");
    this.handlers.bind("leave", "onLeave");
    this.handlers.bind("pressed", "onPressed");
    this.handlers.bind("released", "onReleased");

    this.updateProps(props);
  }

  appendTo(parent: Gtk.Container): void {
    parent.add(this.widget);
    this.parent = parent;
  }

  appendChild(child: string | GjsElement<any>): void {
    if (typeof child === "string") {
      this.widget.label = child;
    } else {
      child.appendTo(this.widget);
    }
    this.widget.show_all();
  }

  updateProps(props: DiffedProps): void {
    this.mapProps(props);
    this.handlers.update(props);
  }

  remove(parent: GjsElement<any>): void {
    this.handlers.unbindAll();
    this.widget.destroy();
  }

  render() {
    this.parent?.show_all();
  }
}
