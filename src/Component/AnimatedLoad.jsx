import { useState, useEffect } from "react";
import "./AnimatedLoad.css";

export const AnimatedLoad = () => {
  const [progressList, setProgressList] = useState([]);

  const addButtonClick = () => {
    const newProgressList = {
      id: new Date(),
      width: 0,
      isRunning: false,
    };
    setProgressList([...progressList, newProgressList]);
  };
  useEffect(() => {
    const Interval = setInterval(() => {
      setProgressList((prevData) =>
        prevData.map((progressBar) =>
          progressBar.isRunning
            ? { ...progressBar, width: progressBar.width + 1 }
            : progressBar
        )
      );
    }, 1000);

    return () => clearInterval(Interval);
  }, []);
  const handleButton = (id) => {
    setProgressList((prevData) =>
      prevData.map((progress) =>
        progress.id === id
          ? { ...progress, isRunning: !progress.isRunning }
          : progress
      )
    );
  };

  return (
    <div className="buttonPart">
      <section>
        <button className="buttonAdd" onClick={addButtonClick}>
          Add
        </button>
      </section>
      <h3>ProgressBar List</h3>

      {progressList.map((progressBar) => (
        <div
          key={progressBar.id}
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="progressBarList" style={{ marginLeft: "1rem" }}>
            <div
              className="AnimatedList"
              style={{ width: `${progressBar.width}rem` }}
            ></div>
          </div>
          <button
            className="buttonAdd"
            onClick={() => handleButton(progressBar.id)}
            style={{ marginLeft: "1rem" }}
          >
            {progressBar.isRunning ? "Start" : "Stop"}
          </button>
        </div>
      ))}
    </div>
  );
};
