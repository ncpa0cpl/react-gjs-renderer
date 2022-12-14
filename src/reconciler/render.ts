import { ApplicationElement } from "../gjs-elements/gtk3/application/application";
import { GjsRenderer } from "./gjs-renderer";

export const render = (appContent: JSX.Element) => {
  const application = new ApplicationElement();

  const container = GjsRenderer.createContainer(
    application,
    1,
    null,
    false,
    null,
    "",
    () => console.error,
    null
  );

  GjsRenderer.updateContainer(appContent, container, null, () => {});

  return application.start();
};
