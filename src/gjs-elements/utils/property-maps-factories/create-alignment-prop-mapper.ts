import { DataType } from "dilswer";
import { Align } from "../../../g-enums";
import type { PropCaseCollector } from "../element-extenders/map-properties";

export type AlignmentProps = {
  verticalAlign?: Align;
  horizontalAlign?: Align;
};

export const createAlignmentPropMapper = (
  widget: {
    halign: Align;
    valign: Align;
  },
  defaults?: { h?: Align; v?: Align }
) => {
  const defaultV = defaults?.v ?? Align.START;
  const defaultH = defaults?.h ?? Align.CENTER;

  return (mapper: PropCaseCollector<keyof AlignmentProps, any>) =>
    mapper
      .horizontalAlign(DataType.Enum(Align), (v = defaultH) => {
        widget.halign = v;
      })
      .verticalAlign(DataType.Enum(Align), (v = defaultV) => {
        widget.valign = v;
      });
};
