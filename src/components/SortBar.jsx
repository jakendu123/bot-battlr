export default function SortBar({ sortBots }) {
  return (
    <div className="mb-3">
      <h5>Sort Bots By:</h5>
      <div className="btn-group">
        <button
          className="btn btn-outline-primary"
          onClick={() => sortBots("health")}
        >
          Health
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => sortBots("damage")}
        >
          Damage
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => sortBots("armor")}
        >
          Armor
        </button>
      </div>
    </div>
  );
}
