import { useState, useEffect } from "react";
import "./App.css";
import chickenImg from "./assets/chicken.png";
import chicken2Img from "./assets/chicken2.jpg";

const MAX_CHICKENS = 1000;
const CHICKEN_SIZE = 100;
const PASSWORD = "xxx";

function App() {
  const [chickens, setChickens] = useState(() => {
    try {
      const savedChickens = localStorage.getItem("chickens");
      return savedChickens ? JSON.parse(savedChickens) : [];
    } catch (error) {
      console.error("Error loading chickens from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("chickens", JSON.stringify(chickens));
  }, [chickens]);

  const addChicken = () => {
    if (chickens.length >= MAX_CHICKENS) return;

    const newChicken = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - CHICKEN_SIZE),
      y: Math.random() * (window.innerHeight - CHICKEN_SIZE),
      image: Math.random() > 0.5 ? chickenImg : chicken2Img,
    };

    setChickens((prev) => [...prev, newChicken]);
  };

  const removeChicken = (id) => {
    setChickens((prev) => prev.filter((chicken) => chicken.id !== id));
  };

  const clearAllChickens = () => {
    const userPassword = prompt("กรุณาใส่รหัสผ่านเพื่อล้างข้อมูลทั้งหมด:");
    if (userPassword === PASSWORD) {
      setChickens([]);
    } else {
      alert("รหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="app">
      <div className="button-container">
        <button
          onClick={addChicken}
          className="spawn-button"
          disabled={chickens.length >= MAX_CHICKENS}
        >
          กดเพื่อให้ไก่ออกมา
        </button>
        <button onClick={clearAllChickens} className="clear-button">
          ล้างทั้งหมด
        </button>
      </div>

      <div className="chicken-count">
        ไก่ทั้งหมด: {chickens.length}/{MAX_CHICKENS}
      </div>

      {chickens.map((chicken) => (
        <div
          key={chicken.id}
          className="chicken-container"
          style={{
            position: "absolute",
            left: `${chicken.x}px`,
            top: `${chicken.y}px`,
            width: `${CHICKEN_SIZE}px`,
            height: `${CHICKEN_SIZE}px`,
          }}
        >
          <button
            onClick={() => removeChicken(chicken.id)}
            className="close-button"
            aria-label="Remove chicken"
            type="button"
          >
            ✕
          </button>
          <img
            src={chicken.image}
            alt={`Chicken ${chicken.id}`}
            className="chicken-image"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            draggable={false}
            onError={(e) => {
              e.target.src = "fallback-chicken.png";
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
