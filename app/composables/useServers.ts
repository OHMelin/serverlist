import type { Server } from '~/components/frontpage/Server.vue'

export type SortOption = 'players_online' | 'name' | 'newest'

const validSortOptions: SortOption[] = ['players_online', 'name', 'newest']

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

function updateQueryParams(params: Record<string, string | string[] | undefined>) {
  const router = useRouter()
  const route = useRoute()

  const query: Record<string, string | string[]> = {}

  // Copy existing query params except ones we're updating
  for (const [key, value] of Object.entries(route.query)) {
    if (!(key in params) && value !== undefined) {
      query[key] = value as string | string[]
    }
  }

  // Add new params
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && !(Array.isArray(value) && value.length === 0)) {
      query[key] = value
    }
  }

  router.replace({ query })
}

export function useServerSort() {
  const route = useRoute()

  const currentSort = computed<SortOption>({
    get: () => {
      const sort = route.query.sort as string
      return validSortOptions.includes(sort as SortOption) ? sort as SortOption : 'players_online'
    },
    set: (value: SortOption) => {
      updateQueryParams({
        sort: value === 'players_online' ? undefined : value,
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

export function useServers() {
  const rawServers = ref<Server[]>([
    {
      position: 1,
      icon: 'https://api.mcsrvstat.us/icon/hypixel.net',
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200',
      name: 'Hypixel',
      description: 'The largest Minecraft server in the world with tons of unique minigames!',
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
      banner: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1200',
      name: 'CubeCraft Games',
      description: 'Home of EggWars, SkyWars, and many more exciting games!',
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
      banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200',
      name: 'Mineplex',
      description: 'A massive Minecraft server with a variety of fun games and modes.',
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
      description: 'The ultimate prison experience with custom enchants and mines.',
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
      banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
      name: 'ManaCube',
      description: 'Featuring Skyblock, Parkour, Survival, and much more!',
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
      description: 'Pixelmon, modded survival, and vanilla experiences await.',
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
      banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200',
      name: 'Purple Prison',
      description: 'Top-rated prison server with amazing custom features.',
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
      description: 'Build your own nation on a 1:500 scale map of Earth!',
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
      banner: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0c?w=1200',
      name: 'MineSuperior',
      description: 'Factions, Prison, Skyblock and more competitive gamemodes.',
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
      description: 'Cracked server with Survival, Skyblock, and Creative modes.',
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
      banner: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200',
      name: 'MCCentral',
      description: 'Prison, KitPvP, Skyblock, and tons of minigames!',
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
      description: 'Bedwars, Skywars, and practice PvP server.',
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

  const servers = computed(() => {
    let filtered = [...rawServers.value]

    // Apply version filter
    if (selectedVersions.value.length > 0) {
      filtered = filtered.filter(server => selectedVersions.value.includes(server.version))
    }

    // Apply tag filter
    if (selectedTags.value.length > 0) {
      filtered = filtered.filter(server =>
        server.tags.some(tag => selectedTags.value.includes(tag)),
      )
    }

    // Apply sorting
    switch (currentSort.value) {
      case 'players_online':
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

  return { servers }
}
