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
        const winner = race.Results[0].Driver.familyName;

        return `The last race of ${season} was the ${raceName}. The winner was ${winner}.`;
    } catch (error) {
        return 'Error fetching race data';
    }
}
