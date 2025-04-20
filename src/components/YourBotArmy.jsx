import BotCard from "./BotCard";

export default function YourBotArmy({ bots, onRelease, onDischarge }) {
  return (
    <div className="mt-3">
      <h2 className="mb-5 fw-bold">Your Bot Army</h2>
      {bots.length === 0 ? (
        <div className="bg-light p-3 rounded text-center">
          <p className="mb-0">No bots in your army yet</p>
        </div>
      ) : (
        <div className="bg-info p-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {bots.map((bot) => (
            <div className="col" key={bot.id}>
              <BotCard
                bot={bot}
                onRelease={onRelease}
                onDischarge={onDischarge}
                inArmy={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
