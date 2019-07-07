import * as React from "react";
import { useDialogState, Dialog, DialogDisclosure, Provider } from "reakit";
import * as system from "reakit-system-bootstrap";

function ConditionallyRenderedDialog() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <Dialog {...dialog} aria-label="Welcome">
        {dialogProps =>
          dialog.visible && <div {...dialogProps}>Welcome to Reakit!</div>
        }
      </Dialog>
    </>
  );
}

function App() {
  return (
    <Provider unstable_system={system}>
      <ConditionallyRenderedDialog />
    </Provider>
  );
}

export default App;
