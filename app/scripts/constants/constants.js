'use strict';

angular.module('firstAndFiveDraft').constant('draftConstants', {
  pickDuration: 120,
  rounds: 16,
  selectionPause: 3000,
  reviewPause: 20000,
  showVideos: true,
  roster: ['QB', 'RB', 'RB', 'WR', 'WR', 'RB/WR', 'TE', 'DST', 'K', 'Bench', 'Bench', 'Bench', 'Bench', 'Bench', 'Bench', 'Bench', 'Bench', 'Bench'],
  videos: [
    {
      playerId: 241, // Crabtree
      code: 'mwZ2ueYrrP4',
      start: 15,
      end: 17
    },
    {
      playerId: 125, //Hopkins
      code: 'bGH2d1jBJu8',
      start:18,
      end: 24
    },
    {
      playerId: 82, //Rodgers
      code: 'eMjqi8XPyls',
      start:24,
      end: 26
    },
    {
      playerId: 43, //CJ1K
      code: 'gODZzSOelss',
      start: 161,
      end: 165
    },
    {
      playerId: 128, //T Richardson
      code: 'rT1nGjGM2p8',
      start: 92,
      end: 95
    },
    {
      playerId: 3, //Brees
      code: 'S6NTVz8AEhA',
      start:9,
      end: 16
    },
    {
      playerId: 287, //AZ
      code: '4r7wHMg5Yjg',
      start:155,
      end: 158
    },
    {
      playerId: 282, //SEA
      code: 'WwMONEPz4yA',
      start:32,
      end: 43
    },
    {
      playerId: 286, //SF
      code: 'Zce-QT7MGSE',
      start:28,
      end: 34
    },
    {
      playerId: 290, //Buf
      code: 'XRN7WozCsYA',
      start:28,
      end: 34
    },
    {
      playerId: 91, //Gostkowski
      code: 'Pn-ElWh2NJ0',
      start:4,
      end: 6
    },
    {
      playerId: 105, //Tucker
      code: 'g4WHoXQTh7w',
      start:25,
      end: 28
    },
    {
      playerId: 116, //Bailey
      code: 'g4WHoXQTh7w',
      start:84,
      end: 89
    },
    {
      playerId: 106, //Hauschka
      code: 'Pn-ElWh2NJ0',
      start:113,
      end: 119
    },
    {
      playerId: 112, //Crosby
      code: 'aXVtb3U5TX8',
      start:80,
      end: 85
    }
  ],
  teams: [
    {
      name: 'Ivan',
      keepers: [
        {
          playerId: 73,
          round: 14
        },
        {
          playerId: 143,
          round: 15
        }
      ],
      trade: [
        4, 24
      ]
    },
    {
      name: 'Danny',
      keepers: [
        {
          playerId: 177,
          round: 3
        },
        {
          playerId: 8,
          round: 5
        }
      ]
    },
    {
      name: 'James',
      keepers: [
        {
          playerId: 42,
          round: 1
        },
        {
          playerId: 12,
          round: 12
        }
      ]
    },
    {
      name: 'Josh',
      keepers: [
        {
          playerId: 57,
          round: 11
        },
        {
          playerId: 33,
          round: 4
        }
      ],
      trade: [
        1, 40
      ]
    },
    {
      name: 'Robert',
      keepers: [
        {
          playerId: 2,
          round: 1
        },
        {
          playerId: 7,
          round: 3
        }
      ]
    },
    {
      name: 'David',
      keepers: [
        {
          playerId: 231,
          round: 4
        },
        {
          playerId: 51,
          round: 5
        }
      ]
    },
    {
      name: 'Seth',
      keepers: [
        {
          playerId: 120,
          round: 8
        },
        {
          playerId: 134,
          round: 6
        }
      ]
    },
    {
      name: 'Jordan',
      keepers: [
        {
          playerId: 36,
          round: 4
        },
        {
          playerId: 80,
          round: 16
        }
      ]
    },
    {
      name: 'JC',
      keepers: [
        {
          playerId: 1,
          round: 10
        },
        {
          playerId: 24,
          round: 7
        }
      ]
    },
    {
      name: 'Jay',
      keepers: [
        {
          playerId: 5,
          round: 1
        },
        {
          playerId: 52,
          round: 16
        }
      ]
    }
  ]
});
