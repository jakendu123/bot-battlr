export default function BotCard({ bot, onClick, onRelease, inArmy = false }) {
  const formatBinary = (str) => {
    if (!str) return "";
    return str.match(/.{1,16}/g)?.join(" ") || str;
  };

  const getBadgeColor = (botClass) => {
    switch (botClass) {
      case "Support":
        return "bg-info";
      case "Medic":
        return "bg-success";
      case "Assault":
        return "bg-danger";
      case "Defender":
        return "bg-primary";
      case "Captain":
        return "bg-warning";
      default:
        return "bg-secondary";
    }
  };

  const handleRelease = (event) => {
    event.stopPropagation();
    if (onRelease) {
      onRelease(bot);
    }
  };

  return (
    <div className="card h-100 shadow-sm bot-card" onClick={onClick}>
      <div className="card-body">
        <img
          src={bot.avatar_url || "https://via.placeholder.com/150"}
          alt={bot.name}
          className="card-img-top mb-2 bot-avatar"
        />
        <div className="card-title d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">{bot.name}</h5>
          {bot.bot_class && (
            <span className={`badge ${getBadgeColor(bot.bot_class)}`}>
              {bot.bot_class}
            </span>
          )}
        </div>
        <div className="d-flex justify-content-between mt-2 small">
          <span>❤️ {bot.health}</span>
          <span>⚔️ {bot.damage}</span>
          <span>🛡️ {bot.armor}</span>
        </div>
        <p className="card-text mt-2 small text-muted font-monospace binary-text">
          {formatBinary(bot.catchphrase)}
        </p>
        {inArmy && (
          <div className="text-end mt-2">
            <button
              onClick={handleRelease}
              className="btn btn-danger btn-sm"
              aria-label="Discharge bot"
            >
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
