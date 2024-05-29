export async function fetchRaceData(query) {
    const season = query || new Date().getFullYear();
    const url = `https://ergast.com/api/f1/${season}/last/results.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const race = data.MRData.RaceTable.Races[0];
        const raceName = race.raceName;
        const familyName = race.Results[0].Driver.familyName;
        const givenName = race.Results[0].Driver.givenName;
        const winner = `${givenName} ${familyName}`;

        return `La dernière course de la saison ${season} était ${raceName} et le gagnant était ${winner}`;
    } catch (error) {
        return 'Error fetching race data';
    }
}

export async function fetchDriverStandings() {
    const response = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
    const data = await response.json();
    const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    let table = '<table><tr><th>Position</th><th>Pilote</th><th>Points</th></tr>';
    standings.forEach(driver => {
        table += `<tr><td>${driver.position}</td><td>${driver.Driver.givenName} ${driver.Driver.familyName}</td><td>${driver.points}</td></tr>`;
    });
    table += '</table>';
    return table;
}

export async function fetchConstructorStandings() {
    const response = await fetch('https://ergast.com/api/f1/current/constructorStandings.json');
    const data = await response.json();
    const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    let table = '<table><tr><th>Position</th><th>Constructeur</th><th>Points</th></tr>';
    standings.forEach(constructor => {
        table += `<tr><td>${constructor.position}</td><td>${constructor.Constructor.name}</td><td>${constructor.points}</td></tr>`;
    });
    table += '</table>';
    return table;
}

export async function fetchLastRaceResults() {
    const response = await fetch('https://ergast.com/api/f1/current/last/results.json');
    const data = await response.json();
    const results = data.MRData.RaceTable.Races[0].Results;
    let table = '<table><tr><th>Position</th><th>Pilote</th><th>Constructeur</th></tr>';
    results.forEach(result => {
        table += `<tr><td>${result.position}</td><td>${result.Driver.givenName} ${result.Driver.familyName}</td><td>${result.Constructor.name}</td></tr>`;
    });
    table += '</table>';
    return table;
}

export async function fetchNextRaceSchedule() {
    const response = await fetch('https://ergast.com/api/f1/current/next.json');
    const data = await response.json();
    const race = data.MRData.RaceTable.Races[0];
    return `Prochaine course : ${race.raceName} le ${race.date} au ${race.Circuit.circuitName}`;
}