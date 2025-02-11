import { useEffect, useState } from "react";
// import "./Task.css";

export const Task = () => {
  const [progressBarList, setProgressBarList] = useState([]);

  const addButton = () => {
    const newprogressBar = {
      id: new Date(),
      width: 0,
      isRunning: false,
    };
    setProgressBarList([...progressBarList, newprogressBar]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressBarList((prevData) =>
        prevData.map((progressBar) =>
          progressBar.isRunning
            ? { ...progressBar, width: progressBar.width + 1 }
            : progressBar
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleClick = (id) => {
    setProgressBarList((prevData) =>
      prevData.map((progress) =>
        progress.id === id
          ? { ...progress, isRunning: !progress.isRunning }
          : progress
      )
    );
  };

  return (
    <div>
      <section>
        <button className="addButton" onClick={addButton}>
          Add
        </button>
      </section>
      <section>
        {progressBarList.map((progressBar) => (
          <div
            key={progressBar.id}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="progressBar">
              <div
                className="animatedBar"
                style={{ width: `${progressBar.width}rem` }}
              ></div>
            </div>
            <button
              className="addButton"
              onClick={() => handleClick(progressBar.id)}
            >
              {progressBar.isRunning ? "Stop" : "Start"}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};
