import type { Server } from '~/components/frontpage/Server.vue'

export type SortOption = 'online' | 'name' | 'newest'

const validSortOptions: SortOption[] = ['online', 'name', 'newest']

const availableVersions = [
  '1.8 - 1.20.4',
  '1.9 - 1.20.4',
  '1.12.2',
  '1.16 - 1.20.4',
  '1.17 - 1.20.4',
]

const availableTags = [
  'Minigames',
  'Skyblock',
  'Bedwars',
  'Prison',
  'Survival',
  'Creative',
  'Factions',
  'PvP',
  'Economy',
  'Parkour',
  'Towny',
  'Modded',
  'Pixelmon',
  'Cracked',
  'KitPvP',
  'SkyWars',
  'EggWars',
  'Practice',
]

function updateQueryParams(params: Record<string, string | string[] | undefined>, basePath?: string) {
  const router = useRouter()
  const route = useRoute()

  const query: Record<string, string | string[]> = {}

  for (const [key, value] of Object.entries(route.query)) {
    if (!(key in params) && value !== undefined) {
      query[key] = value as string | string[]
    }
  }

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && !(Array.isArray(value) && value.length === 0)) {
      query[key] = value
    }
  }

  const path = basePath ?? '/'
  router.push({ path, query })
}

export function useServerSort() {
  const route = useRoute()

  const currentSort = computed<SortOption>({
    get: () => {
      const sort = route.query.sort as string
      return validSortOptions.includes(sort as SortOption) ? sort as SortOption : 'online'
    },
    set: (value: SortOption) => {
      updateQueryParams({
        sort: value === 'online' ? undefined : value,
      })
    },
  })

  function setSort(sort: SortOption) {
    currentSort.value = sort
  }

  return {
    currentSort,
    setSort,
  }
}

export function useServerFilter() {
  const route = useRoute()

  const selectedVersions = computed<string[]>({
    get: () => {
      const versions = route.query.version
      if (!versions) return []
      const arr = Array.isArray(versions) ? versions : [versions]
      return arr.filter(v => availableVersions.includes(v as string)) as string[]
    },
    set: (value: string[]) => {
      updateQueryParams({ version: value.length > 0 ? value : undefined })
    },
  })

  const selectedTags = computed<string[]>({
    get: () => {
      const tags = route.query.tag
      if (!tags) return []
      const arr = Array.isArray(tags) ? tags : [tags]
      return arr.filter(t => availableTags.includes(t as string)) as string[]
    },
    set: (value: string[]) => {
      updateQueryParams({ tag: value.length > 0 ? value : undefined })
    },
  })

  function toggleVersion(version: string) {
    const current = [...selectedVersions.value]
    const index = current.indexOf(version)
    if (index === -1) {
      current.push(version)
    }
    else {
      current.splice(index, 1)
    }
    selectedVersions.value = current
  }

  function toggleTag(tag: string) {
    const current = [...selectedTags.value]
    const index = current.indexOf(tag)
    if (index === -1) {
      current.push(tag)
    }
    else {
      current.splice(index, 1)
    }
    selectedTags.value = current
  }

  function clearFilters() {
    updateQueryParams({ version: undefined, tag: undefined })
  }

  return {
    availableVersions,
    availableTags,
    selectedVersions,
    selectedTags,
    toggleVersion,
    toggleTag,
    clearFilters,
  }
}

export function useServerSearch() {
  const route = useRoute()
  const router = useRouter()

  const searchQuery = ref((route.query.q as string) || '')

  watch(searchQuery, (value) => {
    const query = { ...route.query }
    if (value) {
      query.q = value
    }
    else {
      delete query.q
    }
    router.replace({ path: route.path, query })
  })

  watch(() => route.query.q, (value) => {
    searchQuery.value = (value as string) || ''
  })

  return {
    searchQuery,
  }
}

export function useServers() {
  const rawServers = ref<Server[]>([
    {
      position: 1,
      icon: 'https://api.mcsrvstat.us/icon/hypixel.net',
      banner: 'https://minecraftservers.org/banners/4001981758762480.gif',
      name: 'Hypixel',
      description: 'The largest Minecraft server in the world featuring iconic games like Bedwars, Skyblock, SkyWars, Murder Mystery, and Build Battle. Join millions of players in competitive and casual minigames with regular updates and seasonal events.',
      ip: 'mc.hypixel.net',
      tags: ['Minigames', 'Skyblock', 'Bedwars'],
      onlinePlayers: 45232,
      maxPlayers: 200000,
      version: '1.8 - 1.20.4',
      dateAdded: '2013-04-15',
    },
    {
      position: 2,
      icon: 'https://api.mcsrvstat.us/icon/cubecraft.net',
      name: 'CubeCraft Games',
      description: 'A premier minigames network featuring the original EggWars, intense SkyWars battles, Lucky Islands, and Tower Defense. Known for smooth gameplay, active moderation, and a welcoming community for players of all skill levels.',
      ip: 'play.cubecraft.net',
      tags: ['Minigames', 'EggWars', 'SkyWars'],
      onlinePlayers: 8921,
      maxPlayers: 50000,
      version: '1.9 - 1.20.4',
      dateAdded: '2014-07-22',
    },
    {
      position: 3,
      icon: 'https://api.mcsrvstat.us/icon/mineplex.com',
      name: 'Mineplex',
      description: 'One of the oldest and most iconic Minecraft servers offering diverse gameplay including Cake Wars, Survival Games, Block Hunt, and Draw My Thing. Features seasonal events, achievement hunting, and classic minigames that have entertained players for years.',
      ip: 'us.mineplex.com',
      tags: ['Minigames', 'Survival', 'Creative'],
      onlinePlayers: 3456,
      maxPlayers: 30000,
      version: '1.8 - 1.20.4',
      dateAdded: '2013-01-24',
    },
    {
      position: 4,
      icon: 'https://api.mcsrvstat.us/icon/mc.prison.org',
      name: 'PrisonMC',
      description: 'The ultimate prison experience featuring custom enchantments, prestige ranks, automated mines, and a thriving player economy. Work your way up from inmate to the richest player through mining, trading, and strategic PvP combat in designated arenas.',
      ip: 'play.prisonmc.org',
      tags: ['Prison', 'Economy', 'PvP'],
      onlinePlayers: 1234,
      maxPlayers: 5000,
      version: '1.16 - 1.20.4',
      dateAdded: '2020-03-10',
    },
    {
      position: 5,
      icon: 'https://api.mcsrvstat.us/icon/manacube.com',
      name: 'ManaCube',
      description: 'A feature-rich network offering expansive Skyblock islands, challenging Parkour courses with over 1000 levels, immersive Survival realms, and unique Islands gamemode. Earn exclusive rewards through achievements and climb the seasonal leaderboards.',
      ip: 'play.manacube.com',
      tags: ['Skyblock', 'Parkour', 'Survival'],
      onlinePlayers: 2891,
      maxPlayers: 15000,
      version: '1.8 - 1.20.4',
      dateAdded: '2016-08-05',
    },
    {
      position: 6,
      icon: 'https://api.mcsrvstat.us/icon/mc.complex-gaming.com',
      name: 'Complex Gaming',
      description: 'Home to one of the largest Pixelmon communities with regularly updated mod packs, custom Pokemon features, gyms, and tournaments. Also offers modded survival experiences and vanilla gameplay for those seeking different adventures.',
      ip: 'mc.complex-gaming.com',
      tags: ['Pixelmon', 'Modded', 'Survival'],
      onlinePlayers: 567,
      maxPlayers: 3000,
      version: '1.12.2',
      dateAdded: '2018-11-20',
    },
    {
      position: 7,
      icon: 'https://api.mcsrvstat.us/icon/purpleprison.org',
      name: 'Purple Prison',
      description: 'A top-rated prison server featuring an innovative gang system, custom enchantments, unique mines with rare ores, and intense PvP zones. Progress through ranks, build your fortune, and dominate the economy in this competitive environment.',
      ip: 'purpleprison.org',
      tags: ['Prison', 'Economy', 'Gangs'],
      onlinePlayers: 1823,
      maxPlayers: 10000,
      version: '1.8 - 1.20.4',
      dateAdded: '2017-05-12',
    },
    {
      position: 8,
      icon: 'https://api.mcsrvstat.us/icon/earthmc.net',
      name: 'EarthMC',
      description: 'Build and expand your nation on a meticulously crafted 1:500 scale map of Earth. Form alliances, wage wars, establish trade routes, and write your own history in this geopolitical Towny experience with thousands of active nations and towns.',
      ip: 'play.earthmc.net',
      tags: ['Towny', 'Earth', 'Nations'],
      onlinePlayers: 892,
      maxPlayers: 5000,
      version: '1.17 - 1.20.4',
      dateAdded: '2018-02-28',
    },
    {
      position: 9,
      icon: 'https://api.mcsrvstat.us/icon/play.minesuperior.com',
      name: 'MineSuperior',
      description: 'A competitive network specializing in hardcore Factions warfare, challenging Prison gameplay, and expansive Skyblock islands. Features custom plugins, weekly events, and seasonal resets that keep the competition fresh and exciting.',
      ip: 'play.minesuperior.com',
      tags: ['Factions', 'Prison', 'Skyblock'],
      onlinePlayers: 445,
      maxPlayers: 8000,
      version: '1.8 - 1.20.4',
      dateAdded: '2015-09-14',
    },
    {
      position: 10,
      icon: 'https://api.mcsrvstat.us/icon/play.extremecraft.net',
      name: 'ExtremeCraft',
      description: 'A welcoming cracked server offering Survival worlds with land claiming, competitive Skyblock islands, and Creative plots for builders. Perfect for players without premium accounts who want a full-featured Minecraft multiplayer experience.',
      ip: 'play.extremecraft.net',
      tags: ['Cracked', 'Survival', 'Skyblock'],
      onlinePlayers: 2134,
      maxPlayers: 20000,
      version: '1.8 - 1.20.4',
      dateAdded: '2019-06-30',
    },
    {
      position: 11,
      icon: 'https://api.mcsrvstat.us/icon/mccentral.org',
      name: 'MCCentral',
      description: 'A comprehensive network featuring challenging Prison mines, intense KitPvP arenas, competitive Skyblock islands, and a variety of minigames. Regular updates, active staff, and a friendly community make it perfect for players of all types.',
      ip: 'mccentral.org',
      tags: ['Prison', 'KitPvP', 'Skyblock'],
      onlinePlayers: 1567,
      maxPlayers: 12000,
      version: '1.8 - 1.20.4',
      dateAdded: '2016-01-18',
    },
    {
      position: 12,
      icon: 'https://api.mcsrvstat.us/icon/jartex.fun',
      name: 'JartexNetwork',
      description: 'A fast-growing PvP-focused network featuring competitive Bedwars matches, intense SkyWars battles, and dedicated practice arenas for honing your combat skills. Offers ranked matchmaking, leaderboards, and tournaments for serious competitors.',
      ip: 'jartex.fun',
      tags: ['Bedwars', 'Skywars', 'Practice'],
      onlinePlayers: 3210,
      maxPlayers: 25000,
      version: '1.8 - 1.20.4',
      dateAdded: '2021-12-01',
    },
  ])

  const { currentSort } = useServerSort()
  const { selectedVersions, selectedTags } = useServerFilter()
  const { searchQuery } = useServerSearch()

  const servers = computed(() => {
    let filtered = [...rawServers.value]

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(server =>
        server.name.toLowerCase().includes(query)
        || server.description.toLowerCase().includes(query)
        || server.ip.toLowerCase().includes(query)
        || server.tags.some(tag => tag.toLowerCase().includes(query)),
      )
    }

    if (selectedVersions.value.length > 0) {
      filtered = filtered.filter(server => selectedVersions.value.includes(server.version))
    }

    if (selectedTags.value.length > 0) {
      filtered = filtered.filter(server =>
        server.tags.some(tag => selectedTags.value.includes(tag)),
      )
    }

    switch (currentSort.value) {
      case 'online':
        filtered.sort((a, b) => b.onlinePlayers - a.onlinePlayers)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
    }
    return filtered
  })

  return { servers, searchQuery }
}
