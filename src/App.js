import { useEffect, useState } from "react"
import BotCollection from "./components/BotCollection"
import YourBotArmy from "./components/YourBotArmy"

import "./App.css"

export default function App() {
  const [bots, setBots] = useState([])
  const [army, setArmy] = useState([])

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch("http://localhost:8001/bots")
        const data = await response.json()
        setBots(data)
      } catch (error) {
        throw new Error("Failed to fetch bots:", error)
      }
    }

    fetchBots()
  }, [])

  const enlistBot = (bot) => {
    if (!army.find((b) => b.id === bot.id)) {
      setArmy((prevArmy) => [...prevArmy, bot])
    }
  }

  const releaseBot = (bot) => {
    setArmy((prevArmy) => prevArmy.filter((b) => b.id !== bot.id))
  }

  const dischargeBot = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/bots/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        
        setArmy((prevArmy) => prevArmy.filter((b) => b.id !== id));
        setBots((prevBots) => prevBots.filter((b) => b.id !== id));
      } else {
        console.error("Failed to delete bot:", response.status);
      }
    } catch (error) {
      console.error("Error during discharge:", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="py-5 text-center header-bg">
        <div className="container">
          <h1 className="fw-bold">🤖 Bot Battlr</h1>
        </div>
      </header>
      <main className="container py-4 flex-grow-1">
        <YourBotArmy bots={army} onRelease={releaseBot} />
        <BotCollection bots={bots} onEnlist={enlistBot} onDischarge={dischargeBot}/>
      </main>
    </div>
  )
}

