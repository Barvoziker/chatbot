const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const getRaceData = (data) => {
    const race = data.MRData.RaceTable.Races[0];
    const { raceName } = race;
    const { familyName, givenName } = race.Results[0].Driver;
    const winner = `${givenName} ${familyName}`;
    return { raceName, winner };
};

export const fetchRaceData = async (query) => {
    const season = query || new Date().getFullYear();
    const url = `https://ergast.com/api/f1/${season}/last/results.json`;
    try {
        const data = await fetchJSON(url);
        const { raceName, winner } = getRaceData(data);
        return `La dernière course de la saison ${season} était ${raceName} et le gagnant était ${winner}`;
    } catch (error) {
        return 'Error fetching race data';
    }
};

const createTable = (headers, rows) => {
    const tableHeaders = headers.map(header => `<th>${header}</th>`).join('');
    const tableRows = rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
    return `<table><tr>${tableHeaders}</tr>${tableRows}</tr></table>`;
};

const getDriverStandingsRows = (standings) => standings.map(driver => [
    driver.position,
    `${driver.Driver.givenName} ${driver.Driver.familyName}`,
    driver.points
]);

export const fetchDriverStandings = async () => {
    const url = 'https://ergast.com/api/f1/current/driverStandings.json';
    const data = await fetchJSON(url);
    const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    return createTable(['Position', 'Pilote', 'Points'], getDriverStandingsRows(standings));
};

const getConstructorStandingsRows = (standings) => standings.map(constructor => [
    constructor.position,
    constructor.Constructor.name,
    constructor.points
]);

export const fetchConstructorStandings = async () => {
    const url = 'https://ergast.com/api/f1/current/constructorStandings.json';
    const data = await fetchJSON(url);
    const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    return createTable(['Position', 'Constructeur', 'Points'], getConstructorStandingsRows(standings));
};

const getLastRaceResultsRows = (results) => results.map(result => [
    result.position,
    `${result.Driver.givenName} ${result.Driver.familyName}`,
    result.Constructor.name
]);

export const fetchLastRaceResults = async () => {
    const url = 'https://ergast.com/api/f1/current/last/results.json';
    const data = await fetchJSON(url);
    const results = data.MRData.RaceTable.Races[0].Results;
    return createTable(['Position', 'Pilote', 'Constructeur'], getLastRaceResultsRows(results));
};

export const fetchNextRaceSchedule = async () => {
    const url = 'https://ergast.com/api/f1/current/next.json';
    const data = await fetchJSON(url);
    const race = data.MRData.RaceTable.Races[0];
    return `Prochaine course : ${race.raceName} le ${race.date} au ${race.Circuit.circuitName}`;
};
