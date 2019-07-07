import * as React from "react";
import { Provider, RoverProps, Rover, useRoverState } from "reakit";
import * as system from "reakit-system-bootstrap";

type ColumnProps = RoverProps & {
  title: string;
};

const issues = ["Issue #1", "Issue #2", "Issue #3"];

function Column({ title, ...props }: ColumnProps) {
  const rover = useRoverState({ orientation: "vertical" });
  return (
    <Rover
      {...props}
      as="div"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 20,
        margin: 20
      }}
    >
      <h1>{title}</h1>
      {issues.map(issue => (
        <Rover {...rover} key={issue}>
          {issue}
        </Rover>
      ))}
    </Rover>
  );
}

function App() {
  const rover = useRoverState({ orientation: "horizontal" });
  return (
    <Provider unstable_system={system}>
      <div style={{ display: "flex" }}>
        <Column {...rover} title="TODO" />
        <Column {...rover} title="DOING" />
        <Column {...rover} title="DONE" />
      </div>
    </Provider>
  );
}

export default App;
