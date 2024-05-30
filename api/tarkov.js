const fetchGraphQL = async (query, headers = {}) => {
    const response = await fetch('https://api.tarkov.dev/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify({ query }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();
    return result.data;
};

export const fetchTarkovItemByName = async (name) => {
    const query = `
        query {
            items(name: "${name}") {
                id
                name
                shortName
                wikiLink
                iconLink
                updated
            }
        }
    `;
    try {
        const data = await fetchGraphQL(query);
        if (data.items.length === 0) {
            return `No item found with the name "${name}"`;
        }
        const item = data.items[0];
        const formattedDate = new Date(item.updated).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return `
            <div class="item-card">
                <img src="${item.iconLink}" alt="${item.name}" class="item-icon"/>
                <div class="item-details">
                    <h3><a href="${item.wikiLink}" target="_blank">${item.name}</a></h3>
                    <p><strong>Short Name:</strong> ${item.shortName}</p>
                    <p><strong>Updated:</strong> ${formattedDate}</p>
                </div>
            </div>
        `;
    } catch (error) {
        return `Error fetching item with name "${name}"`;
    }
};

export const fetchTarkovBosses = async () => {
    const query = `
        query TarkovDevBosses {
            bosses {
                name
                imagePortraitLink
                imagePosterLink
                health {
                    id
                    max
                }
            }
        }
    `;
    try {
        const data = await fetchGraphQL(query);
        return data.bosses.map(boss => {
            const healthDetails = boss.health.map(h => `<p><strong>${h.id}:</strong> ${h.max}</p>`).join('');
            return `
                <div class="boss-card" style="background-image: url('${boss.imagePosterLink}');">
                    <div class="boss-details">
                        <h3>${boss.name}</h3>
                        ${healthDetails}
                    </div>
                    <img src="${boss.imagePortraitLink}" alt="${boss.name}" class="boss-icon"/>
                </div>
            `;
        }).join('');
    } catch (error) {
        return 'Error fetching Tarkov bosses';
    }
};

export const fetchTarkovMaps = async () => {
    const query = `
        query TarkovDevMaps {
            maps {
                id
                name
                description
                raidDuration
                players
                bosses {
                    name
                    spawnChance
                }
                extracts {
                    name
                    faction
                }
            }
        }
    `;
    try {
        const data = await fetchGraphQL(query);
        return data.maps.map(map => {
            const extractsDetails = map.extracts.map(extract => `<p><strong>${extract.name}:</strong> ${extract.faction}</p>`).join('');
            return `
                <div class="map-card">
                    <div class="map-details">
                        <h3>${map.name}</h3>
                        <p><strong>Description:</strong> ${map.description}</p>
                        <p><strong>Raid Duration:</strong> ${map.raidDuration} minutes</p>
                        <p><strong>Players:</strong> ${map.players}</p>
                        <div><strong>Extracts:</strong> ${extractsDetails}</div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        return 'Error fetching Tarkov maps';
    }
};

export const fetchTarkovTraders = async () => {
    const query = `
        query TarkovDevTraders {
            traders {
                id
                name
                description
                normalizedName
                imageLink
                currency {
                    id
                    name
                }
                levels {
                    id
                    level
                    requiredPlayerLevel
                    requiredReputation
                    requiredCommerce
                }
                barters {
                    id
                }
            }
        }
    `;
    try {
        const data = await fetchGraphQL(query);
        return data.traders.map(trader => {
            const levelsDetails = trader.levels.map(level => `
                <p><strong>Niveau ${level.level}:</strong></p>
                <p> - Niveau joueur requis: ${level.requiredPlayerLevel}</p>
                <p> - Réputation requise: ${level.requiredReputation}</p>
                <p> - Commerce requis: ${level.requiredCommerce}</p>
            `).join('');
            return `
                <div class="trader-card">
                    <img src="${trader.imageLink}" alt="${trader.name}" class="trader-icon"/>
                    <div class="trader-details">
                        <h3>${trader.name}</h3>
                        <p><strong>Description:</strong> ${trader.description}</p>
                        <p><strong>Devise:</strong> ${trader.currency.name}</p>
                        <div><strong>Niveaux:</strong> ${levelsDetails}</div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        return 'Error fetching Tarkov traders';
    }
};
