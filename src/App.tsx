import React from 'react';
import './App.css';

function App() {
    const [turn, setTurn] = React.useState(0);
    const [players, setPlayers] = React.useState(["Esat", "Ceren", "Eren"]);
    const [scores, setScores] = React.useState<number[][]>([]);

    function addScores() {
        const newScores = players.map((_, i) => {
            const el = document.getElementById("input" + i) as HTMLInputElement;
            const val = parseInt(el.value) || 0;
            el.value = "";

            return val;
        });

        setScores([newScores, ...scores]);
        setTurn((turn + 1) % players.length);
    }

    const totalScores: number[] = [];
    players.forEach((p, idx) => {
        totalScores[idx] = totalScores[idx] || 0;

        scores.forEach(subScores => {
            totalScores[idx] += subScores[idx];
        })
    });

    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        {players.map((player, idx) => {
                            return <th key={player}>
                                <input
                                    id={"input" + idx}
                                    className={idx === turn ? "active" : ""}
                                    placeholder={player}
                                />
                            </th>
                        })}

                        <th className={"action"}>
                            <div className={"btn"} onClick={addScores}>
                                <span>+</span>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        {totalScores.map((s, i) => {
                            return <td key={i} className={"total-score"}>{s}</td>
                        })}
                    </tr>

                    {scores.map((subscores, idx) => {
                        return <tr key={idx}>
                            {subscores.map((score, idx) => (
                                <td key={idx}>{score}</td>
                            ))}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
