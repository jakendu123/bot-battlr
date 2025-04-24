import { useEffect, useState } from "react"
import BotCollection from "./components/BotCollection"
import YourBotArmy from "./components/YourBotArmy"
import SortBar from "./components/SortBar";
import FilterBar from "./components/FilterBar";
import BotSpecs from "./components/BotSpecs";
import "./App.css"

export default function App() {
  const [bots, setBots] = useState([])
  const [army, setArmy] = useState([])
const [selectedBot, setSelectedBot] = useState(null);
const [sortCriteria, setSortCriteria] = useState("");
const [activeFilters, setActiveFilters] = useState([]);
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
const showBotSpecs = (bot) => {
  setSelectedBot(bot);
};

const backToCollection = () => {
  setSelectedBot(null);
};

const sortBots = (criteria) => {
  setSortCriteria(criteria);
};

const filterBots = (botClass) => {
  if (activeFilters.includes(botClass)) {
    setActiveFilters(activeFilters.filter((filter) => filter !== botClass));
  } else {
    setActiveFilters([...activeFilters, botClass]);
  }
};

const sortedBots = [...bots].sort((a, b) => {
  if (sortCriteria === "health") return b.health - a.health;
  if (sortCriteria === "damage") return b.damage - a.damage;
  if (sortCriteria === "armor") return b.armor - a.armor;
  return 0;
});

const filteredBots =
  activeFilters.length > 0
    ? sortedBots.filter((bot) => activeFilters.includes(bot.bot_class))
    : sortedBots;
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="py-5 text-center header-bg">
        <div className="container">
          <h1 className="fw-bold">🤖 Bot Battlr</h1>
        </div>
      </header>
      <main className="container py-4 flex-grow-1">
        <YourBotArmy bots={army} onRelease={releaseBot} />
        <div className=" d-flex mb-3 p-3">
          <div className="col-md-6">
            <SortBar sortBots={sortBots} />
          </div>
          <div className="col-md-6">
            <FilterBar filterBots={filterBots} activeFilters={activeFilters} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            {selectedBot ? (
              <BotSpecs
                bot={selectedBot}
                enlistBot={enlistBot}
                backToCollection={backToCollection}
              />
            ) : (
              <BotCollection
                bots={filteredBots}
                showBotSpecs={showBotSpecs}
                enlistBot={enlistBot}
                dischargeBot={dischargeBot}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

