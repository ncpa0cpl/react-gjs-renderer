import Gtk from "gi://Gtk";
import React from "react";
import type {
  ComponentWithChildren,
  IntrinsicComponent,
} from "../../../reconciler/jsx-types";
import type { StackElement, StackProps } from "./stack";
import type { StackScreenElement, StackScreenProps } from "./stack-screen";
import type { StackSwitcherProps } from "./stack-switcher";

const StackComponent = "STACK";
const StackSwitcherComponent = "STACK_SWITCHER";

export const createStack = <R extends string = string>() => {
  const stackWidget = new Gtk.Stack();

  type NewType = IntrinsicComponent<StackProps, StackElement>;

  const Stack = (props: NewType) => {
    return React.createElement(StackComponent, {
      ...props,
      _widget: stackWidget,
    });
  };

  const Switcher = (
    props: IntrinsicComponent<StackSwitcherProps, StackScreenElement>
  ) => {
    return React.createElement(StackSwitcherComponent, {
      ...props,
      _widget: stackWidget,
    });
  };

  const Screen = (
    props: IntrinsicComponent<
      ComponentWithChildren<StackScreenProps<R>>,
      StackScreenElement
    >
  ) => {
    return React.createElement(StackComponent, {
      ...props,
      _widget: stackWidget,
    });
  };

  const navigate = (to: R) => {
    stackWidget.set_visible_child_name(to);
  };

  return {
    /** The Stack component that should contain StackScreen components. */
    Stack,
    /**
     * A component that can be used to navigate between StackItem
     * components.
     */
    Switcher,
    /**
     * A StackScreen component that can be used to define different
     * views that the Stack can display and switch between.
     */
    Screen,
    /**
     * Navigates the stack to the specified Stack Item.
     *
     * @param to The UID of the Stack Item to navigate to.
     */
    navigate,
  };
};

export const useStack = <R extends string = string>() => {
  return React.useState(createStack as typeof createStack<R>)[0];
};
