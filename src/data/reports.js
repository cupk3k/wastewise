// ─────────────────────────────────────────────────────────────
// REPORTS — categories, statuses and simulated seed reports.
// Seed timestamps are relative to when the demo data is created
// (or reset), so they always look recent during testing.
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'overflow', name: 'Overflowing bin', hint: 'Bins full, rubbish spilling out' },
  { id: 'missed', name: 'Missed collection', hint: 'Rubbish not collected on schedule' },
  { id: 'dumping', name: 'Illegal dumping', hint: 'Rubbish or debris dumped in a public area' },
  { id: 'bulky', name: 'Bulky waste left out', hint: 'Furniture, mattresses or appliances' },
  { id: 'drain', name: 'Clogged drain', hint: 'Rubbish blocking a drain' },
  { id: 'stagnant', name: 'Standing water', hint: 'Dengue risk, mosquito breeding' },
  { id: 'other', name: 'Other', hint: 'Anything else about waste' },
]

export const STATUSES = ['Submitted', 'Under review', 'Resolved']

export const ASSIGNEES = ['Not assigned', 'JMB maintenance team', 'Waste collection contractor', 'MBPJ (referred)']

export function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id)
}

const H = 3600 * 1000

function seed(now) {
  const t = (hoursAgo) => now - hoursAgo * H
  return [
    {
      id: 'WW-0107',
      mine: true,
      category: 'overflow',
      block: 'b6',
      spot: 'Bin centre / refuse chamber',
      description: 'All four bins are full and bags are piled on the floor. Smell is reaching the ground floor units.',
      photo: 'sample:overflow',
      assignee: 'Not assigned',
      history: [{ status: 'Submitted', at: t(5), note: 'Report received.' }],
    },
    {
      id: 'WW-0104',
      mine: true,
      category: 'stagnant',
      block: 'b6',
      spot: 'Playground',
      description: 'Old tyres and containers behind the slide are full of rainwater. Lots of mosquitoes in the evening.',
      photo: null,
      assignee: 'JMB maintenance team',
      history: [
        { status: 'Submitted', at: t(52), note: 'Report received.' },
        { status: 'Under review', at: t(30), note: 'Maintenance team will clear the items on Thursday.' },
        { status: 'Resolved', at: t(8), note: 'Tyres and containers removed. Area sprayed.' },
      ],
    },
    {
      id: 'WW-0106',
      mine: false,
      category: 'dumping',
      block: 'b9',
      spot: 'Roadside',
      description: 'Renovation debris (tiles, cement bags) dumped beside the road overnight.',
      photo: 'sample:dumping',
      assignee: 'MBPJ (referred)',
      history: [
        { status: 'Submitted', at: t(20), note: 'Report received.' },
        { status: 'Under review', at: t(14), note: 'Referred to MBPJ for removal and enforcement.' },
      ],
    },
    {
      id: 'WW-0105',
      mine: false,
      category: 'bulky',
      block: 'b2',
      spot: 'Lift lobby',
      description: 'A mattress and broken chair have been left in the lift lobby for three days.',
      photo: null,
      assignee: 'Not assigned',
      history: [{ status: 'Submitted', at: t(28), note: 'Report received.' }],
    },
    {
      id: 'WW-0103',
      mine: false,
      category: 'drain',
      block: 'b5',
      spot: 'Monsoon drain',
      description: 'Plastic bottles and bags blocking the drain. Water overflowed during yesterday\'s rain.',
      photo: 'sample:drain',
      assignee: 'JMB maintenance team',
      history: [
        { status: 'Submitted', at: t(70), note: 'Report received.' },
        { status: 'Under review', at: t(60), note: 'Cleaning scheduled.' },
      ],
    },
    {
      id: 'WW-0102',
      mine: false,
      category: 'missed',
      block: 'b10',
      spot: 'Bin centre / refuse chamber',
      description: 'Rubbish was not collected on Wednesday morning.',
      photo: null,
      assignee: 'Waste collection contractor',
      history: [
        { status: 'Submitted', at: t(100), note: 'Report received.' },
        { status: 'Under review', at: t(96), note: 'Contractor informed.' },
        { status: 'Resolved', at: t(80), note: 'Collected on Thursday morning.' },
      ],
    },
    {
      id: 'WW-0101',
      mine: false,
      category: 'overflow',
      block: 'b3',
      spot: 'Bin centre / refuse chamber',
      description: 'Bins overflowing after the long weekend.',
      photo: null,
      assignee: 'Waste collection contractor',
      history: [
        { status: 'Submitted', at: t(150), note: 'Report received.' },
        { status: 'Resolved', at: t(130), note: 'Extra collection done.' },
      ],
    },
  ]
}

export function createSeedState(now = Date.now()) {
  return {
    version: 1,
    myBlock: 'b6',
    nextSeq: 108,
    reports: seed(now),
  }
}

export function statusOf(report) {
  return report.history[report.history.length - 1].status
}

export function createdAt(report) {
  return report.history[0].at
}

export function updatedAt(report) {
  return report.history[report.history.length - 1].at
}
