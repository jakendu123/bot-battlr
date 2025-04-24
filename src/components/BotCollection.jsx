import BotCard from "./BotCard";

export default function BotCollection({ bots, enlistBot }) {
  return (
    <div className="mt-4">
      <h2 className="mb-3 fw-bold">Bot Collection</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {bots.map((bot) => (
          <div className="col" key={bot.id}>
            <BotCard bot={bot} onClick={() => enlistBot(bot)} />
          </div>
        ))}
      </div>
    </div>
  );
}
