import { useState } from "react";

interface Action {
  label: string;
  onClick: () => Promise<void>;
  canDisable?: boolean;
  load: string;
}

const ButtonColumn = ({
  actions,
  loading,
}: {
  actions: Action[];
  loading: boolean;
}) => {
  const [currentLoading, setCurrentLoading] = useState("");

  async function handleOnClick(action: Action) {
    try {
      setCurrentLoading(action.load);
      await action.onClick();
    } catch (e) {
      console.log(e);
    } finally {
      setCurrentLoading("");
    }
  }

  return (
    <div className="column">
      {actions.map((action) => (
        <div className="py-4" key={action.label}>
          <button
            onClick={async () => {
              handleOnClick(action);
            }}
            disabled={loading && action.canDisable}
          >
            {currentLoading === action.load ? (
              <div className="spinner"></div>
            ) : (
              action.label
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ButtonColumn;
